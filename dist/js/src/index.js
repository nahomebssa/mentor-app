const { Component } = React;
const { render } = ReactDOM;

const {
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect,
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
			email: "",
			password: "",
		}
	}

	handleSignIn() {
		const {
			email,
			password
		} = this.state
		alert(`Signing in...\nemail: ${email}\npassword: ${password}`)
		const authRes = AuthenticationManager.signIn({ provider: AuthenticationManager.AuthProvider.EMAIL, email, password });
		if (authRes.value !== null)
		{
			// user
			console.log("[SignInForm#handleSignIn] We got the user from sign in operation")
		}
		else
		{
			console.error("[SignInForm#handleSignIn] Oops, didnt get the user")
			switch (authRes.error) {
				case '':
					break;
				case null:
					alert("[SignInForm#handleSignIn] probably no provider")
					console.error("[SignInForm#handleSignIn] probably no provider")
					break;
				default:
					break;
			}
		}

	}	

	render() {
		return (
			<div className="auth-form --sign-in">
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
			email: "",
			password: "",
		}
	}

	handleSignUp() {
		const {
			email,
			password
		} = this.state
		alert(`Signing up...\nemail: ${email}\npassword: ${password}`)

	}	

	render() {
		return (
			<div className="auth-form --sign-up">
				<div>
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
				authForm = <SignInForm />
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
		}
	}

	render() {
		let basename;
		basename = ""
		basename = "/mentor-app/app.html"
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
		const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
		return (
			<BrowserRouter basename={basename}>
				<div className="App">
					<header>
						{/* <h1>Mentor Finder</h1> */}
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
								<AuthenticationView authMode="AuthMode.SIGNIN"  />
							</Route>
							<Route path="/sign-up">
								<AuthenticationView authMode="AuthMode.SIGNUP"  />
							</Route>
							<Route path="/sign-out">
								<AuthenticationView authMode="AuthMode.SIGNOUT"  />
							</Route>
							<Route path="/">
								{/* <HomeView /> */}
								{isSignedOut ? <Redirect to="/sign-in" /> : <HomeView />}
							</Route>
						</Switch>
					</main>
					<AppTabs />
				</div>
			</BrowserRouter>
		)
	}
}

render(<App />, document.getElementById('root'))