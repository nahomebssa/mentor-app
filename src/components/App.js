import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { AuthenticationManager } from '../controllers'
import { ExploreView, InboxView, ProfileView, AuthenticationView, HomeView } from "../views";
import { ALERT } from "../utils";


function PrivateRoute({ children, ...rest }) {
	const isAuthenticated = false // ...
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated ? (
					children
				) : (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: location }
							}}
						/>
					)
			}
		/>
	);
}
function Icon(props) {
	return (
		<i className="material-icons">{props.name}</i>
	)
}

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
	const navItems = [
		{ href: '/',		 	icon: <Icon name="home" /> },
		{ href: '/explore', 	icon: <Icon name="whatshot" /> },
		{ href: '/inbox', 		icon: <Icon name="inbox" /> },
		{ href: '/person', 		icon: <Icon name="profile" /> },
	]
	return (
		<nav className="AppTabs">
			<ul>
				{navItems.map((n, i) => {
					return (
						<li key={i}>
							<Link to={n.href}>
								{n.icon}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default App;