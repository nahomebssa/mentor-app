import React, { useContext, createContext, useState } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { AuthenticationManager } from '../controllers/AuthenticationManager.js'
import { ExploreView, InboxView, ProfileView, AuthView, HomeView } from "../views";
import { AuthProvider, useAuth } from './AuthContext.js'
import { Nav, Button } from 'react-bootstrap'
import { FlexBox } from './FlexBox.js'
import firebase from 'firebase'

const AppContext = createContext()
export const AppProvider = ({ ...rest }) => {
	const providerValue = {
		APP_NAME: "mentor-app",
		APP_DISPLAY_NAME: "Mentor App"
	}
	return (
		<AppContext.Provider value={providerValue} {...rest} />
	)
}
export const useApp = () => useContext(AppContext)

function GPrivateRoute({ children, ...rest }) {
	const REDIRECT_PATHNAME = '/sign-in'
	const { authState } = useAuth()
	const isAuthenticated = authState === 'signed-in' // ...
	const Children = () => (
		<>
			{children}
		</>
	)
	// return <Route {...rest} render={({ location }) => isAuthenticated ? <Children /> : <Redirect to={{ pathname: REDIRECT_PATHNAME, state: { from: location } }} />} />
	// return isAuthenticated ? <Route {...rest} render={({ location }) => <Redirect to={{ pathname: REDIRECT_PATHNAME, state: { from: location } }} />} />
	const route = ({ ...rest }) => <Route {...rest} />
	const redir = ({ location }) => <Redirect to={{ pathname: REDIRECT_PATHNAME, state: { from: location } }} />
	return isAuthenticated ? route : redir
}
const Icon = ({ name }) => <i className="material-icons">{name}</i>

const NavBar = () => {
	const match = { url: '/app' }
	// const hrefPrefix = `${match.url}`
	const hrefPrefix = ''
	const navItems = [
		{ eventKey: 'Home', href: hrefPrefix + '/', icon: <Icon name="home" /> },
		{ eventKey: 'Explore', href: hrefPrefix + '/explore', icon: <Icon name="whatshot" /> },
		{ eventKey: 'Inbox', href: hrefPrefix + '/inbox', icon: <Icon name="inbox" /> },
		{ eventKey: 'Profile', href: hrefPrefix + '/profile', icon: <Icon name="person" /> },
	]
	return (
		<nav className="AppTabs">
			<Nav defaultActiveKey="/" className="flex-column">
				{navItems.map((n, i) => {
					return (
						<Nav.Link key={i} eventKey={n.eventKey} href={n.href}>
							{n.icon}
						</Nav.Link>
					)
				})}
			</Nav>
		</nav>
	)
}
const AppLayout = (props) => {
	const { authState } = useAuth()
	const MAppLayout = (
		<>
			<header>
				<h1>Mentor Finder</h1>
			</header>
			<NavBar />
			<main>
				{/* Main */}
				{props.children}
			</main>
		</>
	)
	return authState === 'signed-in' ? MAppLayout : null
}
const AppRouter = ({ children }) => {
	const MPrivateRoute = ({ location, ...rest }) => {
		// console.log(`[AppRouter#MPrivateRoute] `, firebase.auth().currentUser)
		const { authState, isSignedIn } = useAuth()
		// console.log(`[AppRouter#MPrivateRoute] `, { location, authState })
		const isAuthenticated = firebase.auth().currentUser !== null
		alert(`[AppRouter#MPrivateRoute] ${isAuthenticated}`)
		return isAuthenticated ? <Route {...rest} /> : <Redirect to="/sign-in" />
	}
	function AppComponent({ args }) {
		const { authState } = useAuth()
		const signedIn = authState === 'signed-in'
		// if (args.location.pathname === '/app')
		// alert(`/app authState ${authState}`)
		return signedIn ? <AppRoute {...args} /> : <Redirect to='/sign-in' />
	}
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/app" render={(args) => <AppComponent args={args} />} />
				<Route path="/sign-in" render={AuthRoute} />
				<Route path="/" render={RootRoute} />
				<Route path="*">
					<code>404 ERROR NOT FOUND</code>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
export function App() {
	return (
		<AppProvider>
			<AuthProvider>
				<AppRouter>
					<AppLayout />
				</AppRouter>
			</AuthProvider>
		</AppProvider>
	)
}

function RootRoute() {
	return (
		<>
			<h3>Root Page</h3>
			<Link to="/app">Go to app</Link>
		</>
	)
}
function AuthComponent() {
	const { signIn } = useAuth()
}
function AuthRoute({ history, location, match }) {
	const trySignIn = () => {
		alert('signing in...')
		firebase.auth().signInWithEmailAndPassword('nahom@gmail.com', 'nahom1234')
			.catch(console.error)
			.then((...rest) => {
				console.log(...rest)
				let { from } = location.state || { from: { pathname: "/" } }
				history.replace(from)
			})
	}
	let fn, authMode
	switch (match.url) {
		case '/sign-in':
			fn = trySignIn
			authMode = 'AuthMode.SIGNIN'
		case '/sign-up':
			fn = null
			authMode = 'AuthMode.SIGNUP'
	}

	// return (
	// 	<>
	// 		<h3>Auth Page</h3>
	// 		<Button onClick={fn}>{match.url}</Button>
	// 		<br />
	// 		<Link to="/app">Go to app</Link>
	// 	</>
	// )

	return <AuthView
		authMode={authMode}
		successPath={"/profile"} />
}

function AppRoute({ history, location, match }) {
	// console.log('[approute!]', firebase.auth().currentUser)
	const MNavBar = () => {
		const [isPaneOpen, setPaneOpen] = useState(true)
		const paneWidth = () => isPaneOpen ? 300 : 50
		const toggleMenu = () => {
			setPaneOpen(!isPaneOpen)
		}
		return (
			<Nav variant="pills" defaultActiveKey="/home" style={{background:'#ccc', width: paneWidth() }} >
				<ul>
					<li><Button onClick={toggleMenu}>toggle menu</Button></li>
					<li>
						<Link to={`${match.url}`}>Home</Link>
					</li>
					<li>
						<Link to={`${match.url}/explore`}>Explore</Link>
					</li>
					<li>
						<Link to={`${match.url}/inbox`}>Inbox</Link>
					</li>
					<li>
						<Link to={`${match.url}/profile`}>Profile</Link>
					</li>
				</ul>
			</Nav>
		)
	}
	return (
		<FlexBox>
			{/* <NavBar /> */}
			{/* <FlexItem */}
			<MNavBar />
			{/* <div style={{border: '1px solid black'}}> */}
			<div style={{flex: 1}}>
				<Switch>
					<Route path={`${match.url}/explore`}>
						<ExploreView />
					</Route>
					<Route path={`${match.url}/inbox`}>
						<InboxView />
					</Route>
					<Route path={`${match.url}/profile`}>
						<ProfileView />
					</Route>
					{/* <Route path={`${match.url}/sign-in`}>
					<AuthView
						authMode="AuthMode.SIGNIN"
						successPath={"/profile"} />
				</Route> */}
					<Route path={`${match.url}/sign-up`}>
						<AuthView
							authMode="AuthMode.SIGNUP" />
					</Route>
					<Route path={`${match.url}/sign-out`}>
						<AuthView
							authMode="AuthMode.SIGNOUT" />
					</Route>
				</Switch>
			</div>
		</FlexBox>
	)
}
