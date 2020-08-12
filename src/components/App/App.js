import React, { Component } from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
	Link,
} from 'react-router-dom'
import {
	AuthenticationManager
} from '../../controllers'
import {
	ExploreView,
	InboxView,
	ProfileView,
	AuthenticationView,
	HomeView,
} from "../../views";
import { ALERT } from "../../utils";

const AuthContext = React.createContext({})
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSignedOut: true,
			authState: null,
		}
	}
	render() {
		// const isSignedOut = (AuthenticationManager._authState === AuthenticationManager.AuthState.SIGNEDOUT)
		ALERT(AuthenticationManager._authState)	
		return (
			<AuthContext.Provider>
				<BrowserRouter>
					<Header />
					<Nav />
					<Main />
				</BrowserRouter>
			</AuthContext.Provider>
		)
	}
}

function Header(props) {
	return (
		<header>
			<h1>Mentor Finder</h1>
		</header>
	)
}

function Main(props) {
	return (
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
	)
}

function Nav(props) {
	return (
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
}

function Icon(props) {
	return (
		<i className="material-icons">{props.name}</i>
	)
}

export default App;