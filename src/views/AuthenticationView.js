import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthenticationManager } from "../controllers/AuthenticationManager";
import firebase from "firebase";
import { ALERT, ERR, DBG, unused } from "../utils";
import { Alert, Button, Form } from "react-bootstrap";

class SignInFormOld extends React.Component {
    state = {
        email: "", // "user1@gmail.com",
        password: "", // "user001",
        errorMessage: "",
        gotSignedIn: false,
    };
    static REDIRECT_URL = "/profile";

    handleSignIn = () => {
        const { email, password } = this.state;
        const onSuccess = (result) => {
            AuthenticationManager.setAuthState(
                AuthenticationManager.AuthState.SIGNEDIN
            );
            this.setState({ gotSignedIn: true });
        };
        const onFail = (error) => {
            ALERT(`Failed to sign in :( ...`);
            ERR("error", error);
            this.setState({ errorMessage: `${error}` });
        };
        ALERT(`Signing in...\nemail: ${email}\npassword: ${password}`);
        const { EMAIL } = AuthenticationManager.AuthProvider;
        AuthenticationManager.signIn({
            provider: EMAIL,
            email,
            password,
            onSuccess,
            onFail,
        });
    };

    render() {
        const { errorMessage, gotSignedIn } = this.state;

        if (gotSignedIn === true) {
            return <Redirect to={this.REDIRECT_URL} />;
        }

        const hasError = errorMessage !== "";
        const errClassName = `msg-banner ${hasError ? "--error" : "--hidden"}`;
        return (
            <div className="AuthForm --sign-in">
                <div className={errClassName}>{errorMessage}</div>
                <form className="flex fdc">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={this.state.email}
                        onChange={(event) => {
                            // alert("AH HA!");
                            this.setState({ email: event.target.value });
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(event) => {
                            // alert("AH HA!");
                            this.setState({ password: event.target.value });
                        }}
                    />
                    <div className="flex asfe pad-10">
                        <Link to="/sign-up" className="btn btn-link">
                            Sign up
                        </Link>
                        <input
                            className="btn btn-primary"
                            type="button"
                            value="Sign In"
                            onClick={() => this.handleSignIn()}
                        />
                    </div>
                </form>
            </div>
        );
    }
}
class SignUpFormOld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "", // "User One",
            email: "", // "user1@gmail.com",
            password: "", // "user001",
            errorMessage: "",
            gotSignedUp: false,
        };
        this.onSignUpSuccess = this.onSignUpSuccess.bind(this);
        this.onSignUpFail = this.onSignUpFail.bind(this);
    }

    onSignUpSuccess(result) {
        const FNID = `[SignUpForm#onSignUpSuccess]`;
        ALERT(`${FNID} SUCCESS \n${result}`);
        DBG(FNID, result);

        DBG(FNID, firebase.auth().currentUser);

        // set user's name and other details (firebase.updateProfile)
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: this.state.fullName,
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
            .then(function () {
                // Update successful.
                ALERT(`${FNID} updated profile`);
            })
            .catch(function (error) {
                // An error happened.
                ALERT(`${FNID} failed to update profile`);
                DBG(FNID, error);
            });

        // add user to db
        const db = firebase.firestore();
        const usersRef = db.collection("users");
        usersRef.doc(result.user.uid).set({
            isSetup: "no?false:true",
            name: "<no name>",
            bio: "<no bio>",
        });

        // this needs to happen last, it will re-render, and redirect the page
        this.setState({ gotSignedUp: true });
    }
    onSignUpFail(error) {
        // {code, message} = error
        const FNID = `[SignUpForm#onSignUpFail]`;
        ALERT(`${FNID} FAILED \n${error}`);
        ERR(FNID, error);
        this.setState({ errorMessage: `${error}` });
    }

    handleSignUp() {
        const { email, password } = this.state;
        ALERT(`Signing up...\nemail: ${email}\npassword: ${password}`);

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(this.onSignUpSuccess)
            .catch(this.onSignUpFail);
    }

    render() {
        const { errorMessage, gotSignedUp } = this.state;

        if (gotSignedUp === true) {
            return <Redirect to="/sign-in" />;
        }

        const hasError = errorMessage !== "";
        const message = errorMessage;
        return (
            <div className="auth-form --sign-up">
                <div
                    className={`msg-banner ${
                        hasError ? "--error" : "--hidden"
                    }`}
                >
                    {message}
                </div>
                <Form>
                    <Form.Group className="mb-0">
                        {/* <Form.Label>Full name</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            value={this.state.fullName}
                            onChange={(event) =>
                                this.setState({ fullName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-0">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={this.state.email}
                            onChange={(event) =>
                                this.setState({ email: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-0">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) =>
                                this.setState({ password: event.target.value })
                            }
                        />
                    </Form.Group>
                    <div style={{ display: "flex" }}>
                        <Link
                            to="/sign-in"
                            className="btn btn-link"
                            style={{ flex: 1 }}
                        >
                            Sign in
                        </Link>
                        <Form.Control
                            className="btn-primary"
                            type="submit"
                            value="Sign Up"
                            onClick={() => this.handleSignUp()}
                        />
                    </div>
                </Form>
            </div>
        );
    }
}
const SignOutForm = (props) => null;

function SignInForm() {
    const REDIRECT_URL = "/profile";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [gotSignedIn, setGotSignedIn] = useState("");
    const btnSignInClickHandler = () => {
        const onSuccess = (result) => {
            AuthenticationManager.setAuthState(
                AuthenticationManager.AuthState.SIGNEDIN
            );
            setGotSignedIn(true);
        };
        const onFail = (error) => {
            ALERT(`Failed to sign in :( ...`);
            ERR("error", error);
            setErrorMessage(`${error}`);
        };
        ALERT(`Signing in...\nemail: ${email}\npassword: ${password}`);
        const { EMAIL } = AuthenticationManager.AuthProvider;
        AuthenticationManager.signIn({
            provider: EMAIL,
            email,
            password,
            onSuccess,
            onFail,
        });
    };
    if (gotSignedIn === true) {
        return <Redirect to={REDIRECT_URL} />;
    }
    const hasError = errorMessage !== "";
    return (
        <Form>
            {hasError && <Alert variant="danger">{errorMessage}</Alert>}
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />
            </Form.Group>
            <Form.Group>
                <Button variant="link" href="/sign-up">
                    Sign Up
                </Button>
                <Button onClick={btnSignInClickHandler}>Sign In</Button>
            </Form.Group>
        </Form>
    );
}
function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Form>
            <Form.Group>
                <Form.Control
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />
            </Form.Group>
            <Form.Group>
                <Button variant="link">Sign In</Button>
                <Button>Sign Up</Button>
            </Form.Group>
        </Form>
    );
}

// TODO: use flexbox
export function AuthenticationView({ authMode }) {
    const AV_CLASSNAME =
        "flex fdc aic jcc --full-screen-absolute --bg-accent --fg-white";
    const AM_SIGNIN = "AuthMode.SIGNIN";
    const AM_SIGNUP = "AuthMode.SIGNUP";
    const AM_SIGNOUT = "AuthMode.SIGNOUT";

    let authForm = null;
    let signedOut = false;
    switch (authMode) {
        case AM_SIGNIN:
            authForm = <SignInForm />;
            break;
        case AM_SIGNUP:
            authForm = <SignUpForm />;
            break;
        case AM_SIGNOUT:
            authForm = <SignOutForm />;
            signedOut = true;
            break;
        default:
            authForm = <SignInForm />;
            break;
    }
    console.log(firebase.auth().currentUser);
    return (
        <div className={AV_CLASSNAME}>
            {!signedOut ? <h1 className="title">Mentor Finder</h1> : null}
            {authForm}
        </div>
    );
}

unused(SignInFormOld);
unused(SignUpFormOld);
