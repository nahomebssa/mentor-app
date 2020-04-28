const {
	BrowserRouter,
	Switch,
	Route,
	Link,
	Redirect,
	browserHistory,
} = ReactRouterDOM

const AppHeader = (props) => (
	<header className="app-header">
		<h1 className="app-branding">{props.content}</h1>
	</header>
)
const Icon = (props) => <i className="material-icons app-nav-icon">{props.name}</i>
const NavLabel = (props) => (
	<p className="app-nav-label">{props.label}</p>
)
const AppTabs = (props) => (
	<nav className="app-nav">
		<ul className="app-nav-list">
			<li className="app-nav-list-item">
				<Link to="/">
					<Icon name="home" />
					<NavLabel
						label="Home" />
				</Link>
			</li>
			<li className="app-nav-list-item">
				<Link to="/explore">
					<Icon name="search" />
					<NavLabel
						label="Explore" />
				</Link>
			</li>
			{/* <li className="app-nav-list-item">
				<Link to="/inbox">
					<Icon name="inbox" />
				</Link>
			</li> */}
			<li className="app-nav-list-item">
				<Link to="/profile">
					<Icon name="person" />
					<NavLabel
						label="Profile" />
				</Link>
			</li>
		</ul>
	</nav>
)

class App extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isSignedOut: true
		}
	}

	render() {

		let basename = this.props.basename || ""
		
		const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
		
		// ALERT(`AuthenticationManager._authState: ${AuthenticationManager._authState}`)
		
		this.router = (
			<BrowserRouter basename={basename}>

				<div className="App">
					<AppHeader
						content="Mentor Finder" />
					<main className="app-main">
						<Switch>
							<Route path="/explore">
								<ExploreView />
							</Route>
							<Route path="/inbox">
								<InboxView />
							</Route>
							<Route path="/profile">
								<ProfileView
									profile={g_databaseManager.userModel} />
							</Route>
							<Route path="/sign-in">
								<AuthenticationView
									authMode="AuthMode.SIGNIN"
									successPath={"/home"} />
							</Route>
							<Route path="/sign-up">
								<AuthenticationView
									authMode="AuthMode.SIGNUP" />
							</Route>
							<Route path="/sign-out">
								<AuthenticationView
									authMode="AuthMode.SIGNOUT" />
							</Route>
							<Route path="/home">
								<HomeView />
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