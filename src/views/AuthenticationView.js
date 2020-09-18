import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {AuthenticationManager} from '../controllers/AuthenticationManager'
import firebase from 'firebase'
import {ALERT, ERR, DBG} from '../utils'
import {
    Button,
    Form
} from 'react-bootstrap'

class SignInForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",  // "user1@gmail.com",
            password: "",  // "user001",
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
        
        const {
            history,
            successPath,
        } = this.props

        AuthenticationManager.setAuthState(AuthenticationManager.AuthState.SIGNEDIN)
        
        this.setState({ gotSignedIn: true })
    }

    onSignInFail(error) {
        ALERT(`Failed to sign in :( ...`)
        ERR('error', error)

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
        
        const hasError = (errorMessage !== "")
        return (
            <div className="AuthForm --sign-in">
                <div className={`msg-banner ${ hasError ? "--error" : "--hidden" }`}>
                    {errorMessage}
                </div>
                <form className="flex fdc">
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
                    <div className="flex asfe pad-10">
                        <Link to="/sign-up" className="btn btn-link">Sign up</Link>
                        <input className="btn btn-primary"
                            type="button"
                            value="Sign In"
                            onClick={() => this.handleSignIn()} />
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
            fullName: "",  // "User One",
            email: "",  // "user1@gmail.com",
            password: "",  // "user001",
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
                <Form>
                    <Form.Group className='mb-0'>
                        {/* <Form.Label>Full name</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            value={this.state.fullName}
                            onChange={(event) => this.setState({ fullName: event.target.value })} />
                    </Form.Group>
                    <Form.Group className='mb-0'>
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={this.state.email}
                            onChange={(event) => this.setState({ email: event.target.value })} />
                    </Form.Group>
                    <Form.Group className='mb-0'>
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) => this.setState({ password: event.target.value })} />
                    </Form.Group>
                    <div style={{ display: 'flex' }}>
                        <Link to="/sign-in" className="btn btn-link" style={{flex:1}}>Sign in</Link>
                        <Form.Control className="btn-primary"
                            type="submit"
                            value="Sign Up"
                            onClick={() => this.handleSignUp()} />
                    </div>
                </Form>
            </div>
        )
    }
}
const SignOutForm = (props) => (null)

// TODO: use flexbox
export class AuthenticationView extends Component {

    constructor(props)
    {
        super(props)
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
            // --tac --fwb --fg-white
            <div className="flex fdc aic jcc --full-screen-absolute --bg-accent --fg-white">
                {!signedOut ? <h1 className="title">Mentor Finder</h1> : null}
                {authForm}
            </div>
        )
    }
}

export function AuthenticationViewComponent({  }) {
    return (
        <div className="AuthenticationView">
            {/* {!signedOut ? <h1 className="title">Mentor Finder</h1> : null}
            {authForm} */}
        </div>
    )
}