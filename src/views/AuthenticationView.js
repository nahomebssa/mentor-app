import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthenticationManager } from "../controllers";
import { DBG, ALERT, ERR } from "../utils";

import { Button } from 'react-bootstrap'

import * as firebase from 'firebase'

class SignInForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "user1@gmail.com",
			password: "user001",
			// email: "",
			// password: "",
			errorMessage: "",
			gotSignedIn: false,
		}
		this.REDIRECT_URL = "/profile"
		this.onSignInFail = this.onSignInFail.bind(this)
		this.onSignInSuccess = this.onSignInSuccess.bind(this)
		this.handleSignIn = this.handleSignIn.bind(this)
	}

	onSignInSuccess(result) {
		const FNID = `[SignInForm#onSignInSuccess]`
		// ALERT(`${FNID} Sign in successful!\n"${result}"`)
		ALERT(`${FNID} Sign in successful!`)
		
		// const {
		// 	history,
		// 	successPath,
		// } = this.props

		AuthenticationManager.setAuthState(AuthenticationManager.AuthState.SIGNEDIN)
		
		this.setState({ gotSignedIn: true })
	}

	onSignInFail(error) {
		const FNID = `[SignInForm#onSignInFail]`
		ALERT(`${FNID} Failed to sign in :( ...`)
		ERR(FNID, error)

		this.setState({ errorMessage: `${error}` })
	}

	handleSignIn() {
		
		const {
			email,
			password
		} = this.state
		
		ALERT(`Signing in...\nemail: ${email}\npassword: ${password}`)
		
		AuthenticationManager.signIn({
			provider: AuthenticationManager.AuthProvider.EMAIL,
			email, password,
			onSuccess: this.onSignInSuccess,
			onFail: this.onSignInFail,
		})
	}	

	render() {

		const {
			errorMessage,
			gotSignedIn,
		} = this.state

		if (gotSignedIn === true)
		{
			return <Redirect to={this.REDIRECT_URL} />
		}
		
		// const FNID = `[SignInForm#render]`
		const hasError = (errorMessage !== "")
		return (
			<div className="auth-form --sign-in">
				<div className={`msg-banner ${ hasError ? "--error" : "--hidden" }`}>
					{errorMessage}
				</div>
				<form>
					<input
						autoFocus={true}
						type="email"
						placeholder="Email address"
						value={this.state.email}
						onChange={(event) => this.setState({ email: event.target.value })} />
					<input
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={(event) => this.setState({ password: event.target.value })} />
					<div id="btns">
						<Button variant="link" href="/sign-up">
							Sign Up
						</Button>
						<Button variant="primary" onClick={() => { this.handleSignIn() }}>
							Sign In
						</Button>
					</div>
				</form>
			</div>
		)
	}
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

		if (gotSignedUp === true)
		{
			return <Redirect to="/sign-in" />
		}

		const hasError = (errorMessage !== "")
		const message = errorMessage
		return (
			<div className="auth-form --sign-up">
				<div className={`msg-banner ${ hasError ? "--error" : "--hidden" }`}>
					{message}
				</div>
				<div>
					<input
						type="text"
						placeholder="Full Name"
						value={this.state.fullName}
						onChange={(event) => this.setState({ fullName: event.target.value })} />
					<input
						type="email"
						placeholder="Email address"
						value={this.state.email}
						onChange={(event) => this.setState({ email: event.target.value })} />
					<input
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={(event) => this.setState({ password: event.target.value })} />
					<Button onClick={() => this.handleSignUp()}>
						Sign Up
					</Button>
				</div>
			</div>
		)
	}
}
const SignOutForm = (props) => (null)

// TODO: use flexbox
class AuthenticationView extends React.Component {

	constructor(props)
	{
		super(props)
		this.state = {}
	}

	render() {

		let authForm = null;
		let signedOut = false;
		switch (this.props.authMode) {
			case "AuthMode.SIGNIN":
				authForm = <SignInForm />
				break;
			case "AuthMode.SIGNUP":
				authForm = <SignUpForm />
				break;
			case "AuthMode.SIGNOUT":
				authForm = <SignOutForm />
				signedOut = true;
				break;
			default:
				break;
		}

		return (
			<div className="AuthenticationView">
				{!signedOut ? <h1 className="title">Mentor Finder</h1> : null}
				{authForm}
			</div>
		)
	}
}

export {
	AuthenticationView
}