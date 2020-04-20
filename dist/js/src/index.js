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
	<nav className="AppTabs">
		<ul>
			<li>
				<Link to="/">
					<Icon name="home" />
				</Link>
			</li>
			<li>
				<Link to="/explore">
					<Icon name="whatshot" />
				</Link>
			</li>
			<li>
				<Link to="/inbox">
					<Icon name="inbox" />
				</Link>
			</li>
			<li>
				<Link to="/profile">
					<Icon name="person" />
				</Link>
			</li>
		</ul>
	</nav>
)

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