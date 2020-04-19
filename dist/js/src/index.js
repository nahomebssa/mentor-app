const { Component } = React;
const { render } = ReactDOM;

const {
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect,
	browserHistory,
} = ReactRouterDOM

const Icon = (props) => <i className="material-icons">{props.name}</i>

const AppTabs = (props) => (
	<nav className="App-Tabs">
		<ul>
			<li><Link to="/">
				<Icon name="home" />
			</Link></li>
			<li><Link to="/explore">
				<Icon name="whatshot" />
			</Link></li>
			<li><Link to="/inbox">
				<Icon name="inbox" />
			</Link></li>
			<li><Link to="/profile">
				<Icon name="person" />
			</Link></li>
		</ul>
	</nav>
)

class SignInForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "user1@gmail.com",
			password: "user001",
			errorMessage: "",
			gotSignedIn: false,
		}
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

		// this.onSignInSuccess({ toString() { return "pretend sign in" } })
		
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onSignInSuccess)
			.catch(this.onSignInFail)
		
		// const fnSuccess = this.onSignInSuccess
		// const fnFail = this.onSignInFail
		// DBG(fnSuccess, fnFail)
		// AuthenticationManager.signIn({
		// 	provider: AuthenticationManager.AuthProvider.EMAIL,
		// 	email,
		// 	password,
		// 	onSuccess: this.onSignInSuccess,
		// 	onFail: this.onSignInFail,
		// })

	}	

	render() {

		const {
			errorMessage,
			gotSignedIn,
		} = this.state

		if (gotSignedIn === true)
		{
			return <Redirect to="/profile" />
		}

		const FNID = `[SignInForm#render]`
		const hasError = (errorMessage !== "")
		return (
			<div className="auth-form --sign-in">
				<div className={`msg-banner ${ hasError ? "--error" : "--hidden" }`}>
					{errorMessage}
				</div>
				<form>
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
					<input
						type="button"
						value="Sign In"
						onClick={() => this.handleSignIn()} />
				</form>
				<Link to="/sign-up" className="btn">Sign up</Link>
			</div>
		)
	}
}
class SignUpForm extends Component {
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
					<input
						type="submit"
						value="Sign Up"
						onClick={() => this.handleSignUp()} />
				</div>
			</div>
		)
	}
}

const SignOutForm = (props) => (null)

// TODO: use flexbox
class AuthenticationView extends Component {

	constructor(props)
	{
		super(props)
	}

	render() {

		let authForm = null;
		switch (this.props.authMode) {
			case "AuthMode.SIGNIN":
				authForm = (
					<SignInForm
						history={this.props.history} />
				)
				break;
			case "AuthMode.SIGNUP":
				authForm = <SignUpForm />
				break;
			case "AuthMode.SIGNOUT":
				authForm = <SignOutForm />
				break;
			default:
				break;
		}

		return (
			<div className="AuthenticationView">
				<h1 className="title">Mentor Finder</h1>
				{authForm}
			</div>
		)
	}
}

class App extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isSignedOut: true
		}
	}

	render() {
		let basename;
		// basename = ""
		// basename = "/mentor-app/app.html"
		basename = "/dist/app.html"

		/* 
			let component = null;
			switch (authstate) {
				case AuthState.SIGNEDOUT:
					component = <AuthenticationView />
					break;
				case AuthState.SIGNEDIN:
				case AuthState.GUESTMODE:
				default:
					component = <HomeView />
					break;
			}
		*/
		// const {
		// 	isSignedOut
		// } = this.state
		const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
		ALERT(AuthenticationManager._authState)
		this.router = (
			<BrowserRouter basename={basename}>
				<div className="App">
					<header>
						<h1>Mentor Finder</h1>
					</header>
					<main>
						<Switch>
							<Route path="/explore">
								<ExploreView />
							</Route>
							<Route path="/inbox">
								<InboxView />
							</Route>
							<Route path="/profile">
								<ProfileView />
							</Route>
							<Route path="/sign-in">
								<AuthenticationView
									authMode="AuthMode.SIGNIN"
									successPath={"/profile"} />
							</Route>
							<Route path="/sign-up">
								<AuthenticationView
									authMode="AuthMode.SIGNUP" />
							</Route>
							<Route path="/sign-out">
								<AuthenticationView
									authMode="AuthMode.SIGNOUT" />
							</Route>
							<Route path="/">
								<HomeView />
								{/* {isSignedOut ? <Redirect to="/sign-in" /> : <HomeView />} */}
							</Route>
						</Switch>
					</main>
					<AppTabs />
				</div>
			</BrowserRouter>
		)
		return this.router
	}
}

render(<App />, document.getElementById('root'))