import React, { useState } from 'react'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import { AuthenticationManager } from "../controllers";
import * as firebase from 'firebase'

import { Container, Alert, Row, Col, Form, Button } from 'react-bootstrap'
import { useAuth, FirebaseProvider } from '../components/AuthContext.js'
import { FlexBox } from '../components/FlexBox.js'
import { DBG, ALERT, ERR } from "../utils";


function SignInForm() {

	const REDIRECT_URL = "/profile"
	const [email, setEmail] = useState("user1@gmail.com")
	const [password, setPassword] = useState("user001")
	const [errorMessage, setErrorMessage] = useState("")
	const [gotSignedIn, setGotSignedIn] = useState(false)
	const Auth = useAuth()
	const history = useHistory()

	function onSignInSuccess(result) {
		const FNID = `[SignInForm#onSignInSuccess]`
		// ALERT(`${FNID} Sign in successful!\n"${result}"`)
		ALERT(`${FNID} Sign in successful!`)

		// const {
		// 	history,
		// 	successPath,
		// } = this.props

		AuthenticationManager.setAuthState(AuthenticationManager.AuthState.SIGNEDIN)

		history.push('/')
		// this.setState({ gotSignedIn: true })
	}

	function onSignInFail(error) {
		const FNID = `[SignInForm#onSignInFail]`
		ALERT(`${FNID} Failed to sign in :( ...`)
		ERR(FNID, error)

		setErrorMessage(`${error}`)
	}

	const handleSignIn = () => {

		// alert(`Signing in...\nemail: ${email}\npassword: ${password}`)

		// AuthenticationManager.signIn({
		// 	provider: AuthenticationManager.AuthProvider.EMAIL,
		// 	email, password,
		// 	onSuccess: onSignInSuccess,
		// 	onFail: onSignInFail,
		// })

		Auth.signIn({
			provider: FirebaseProvider.EMAIL,
			credentials: { email, password },
			onFail: () => console.error,
			onPass: () => {
				alert('yay!')
			}
		})

	}

	// if (gotSignedIn === true) {
	// 	return <Redirect to={this.REDIRECT_URL} />
	// }

	// const FNID = `[SignInForm#render]`
	const hasError = (errorMessage !== "")
	return (
		<Form>
			{errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
			<Form.Group>
				<Form.Control type="email" placeholder="Email address" value={email} autoFocus
					onChange={(event) => setEmail(event.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Control type="password" placeholder="Password" value={password}
					onChange={(event) => setPassword(event.target.value)} />
			</Form.Group>
			<Button variant="primary" onClick={handleSignIn} style={{ width: '100%' }}>
				Sign In
			</Button>
			{/* <Button variant="light" onClick={handleSignIn} style={{ width: '100%', color: 'blue' }}>
				Sign In with Google
			</Button> */}
			<Form.Text muted>Don't have an account? <Link to="/sign-up">Sign Up</Link></Form.Text>
		</Form>
	)
}
class SignUpForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			fullName: "User One",
			email: "user1@gmail.com",
			password: "user001",
			errorMessage: "",
			gotSignedUp: false,
		}
		this.onSignUpSuccess = this.onSignUpSuccess.bind(this)
		this.onSignUpFail = this.onSignUpFail.bind(this)
	}

	onSignUpSuccess(result) {
		const FNID = `[SignUpForm#onSignUpSuccess]`
		ALERT(`${FNID} SUCCESS \n${result}`)
		DBG(FNID, result)

		DBG(FNID, firebase.auth().currentUser)

		// set user's name and other details (firebase.updateProfile)
		const user = firebase.auth().currentUser;
		user.updateProfile({
			displayName: this.state.fullName,
			//photoURL: "https://example.com/jane-q-user/profile.jpg"
		}).then(function () {
			// Update successful.
			ALERT(`${FNID} updated profile`)
		}).catch(function (error) {
			// An error happened.
			ALERT(`${FNID} failed to update profile`)
			DBG(FNID, error)
		});

		// add user to db
		const db = firebase.firestore()
		const usersRef = db.collection("users")
		usersRef.doc(result.user.uid).set({
			isSetup: "no?false:true",
			name: "<no name>",
			bio: "<no bio>",
		});


		// this needs to happen last, it will re-render, and redirect the page
		this.setState({ gotSignedUp: true })
	}
	onSignUpFail(error) {  // {code, message} = error
		const FNID = `[SignUpForm#onSignUpFail]`
		ALERT(`${FNID} FAILED \n${error}`)
		ERR(FNID, error)
		this.setState({ errorMessage: `${error}` })
	}

	handleSignUp() {
		const {
			email,
			password
		} = this.state
		ALERT(`Signing up...\nemail: ${email}\npassword: ${password}`)

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(this.onSignUpSuccess)
			.catch(this.onSignUpFail);

	}

	render() {
		const {
			errorMessage,
			gotSignedUp,
		} = this.state

		if (gotSignedUp === true) {
			return <Redirect to="/sign-in" />
		}

		const hasError = errorMessage !== ""
		return (
			<Form>
				{hasError && <Alert variant="danger">{errorMessage}</Alert>}
				<Form.Group>
					<Form.Control type="text" placeholder="Full name" value={this.state.fullName} autoFocus
					onChange={(event) => this.setState({ fullName: event.target.value })} />
				</Form.Group>
				<Form.Group>
					<Form.Control type="email" placeholder="Email address" value={this.state.email}
						onChange={(event) => this.setState({ email: event.target.value })} />
				</Form.Group>
				<Form.Group>
					<Form.Control type="password" placeholder="Password" value={this.state.password}
						onChange={(event) => this.setState({ password: event.target.value })} />
				</Form.Group>
				<Button onClick={() => this.handleSignUp()}>
					Sign Up
				</Button>
				<Form.Text muted>Already have an account? <Link to="/sign-in">Sign In</Link></Form.Text>
			</Form>
		)
	}
}
const SignOutForm = (props) => (null)

// TODO: use flexbox
export function AuthView() {
	const { authState } = useAuth()
	const { pathname } = useLocation()
	let AuthForm = null;
	let signedOut = false;
	switch (pathname) {
		case "/sign-in":
			AuthForm = SignInForm
			break;
		case "/sign-up":
			AuthForm = SignUpForm
			break;
		case "sign-out":		/// Why is this here?
			AuthForm = SignOutForm
			signedOut = true;
			break;
		default:
			break;
	}

	const AuthUI = (
		// <Container style={{height: '100%'}}>
		<Row style={{ height: '100%' }}>
			<Col style={{ height: '100%', background: '#6610f2' }} />
			<Col style={{ height: '100%' }}>
				<FlexBox flexDirection="column" justifyContent="center" style={{ height: '100%', paddingRight: '10vw' }}>
					<h1>Mentor Finder</h1>
					<AuthForm />
				</FlexBox>
			</Col>
		</Row>
		// </Container>
	)
	return authState === 'signed-in' ? <Redirect to="/" /> : AuthUI
}