import React, { useContext, createContext } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { AuthenticationManager } from '../controllers/AuthenticationManager.js'
import { ExploreView, InboxView, ProfileView, AuthenticationView, HomeView } from "../views";
import { AuthProvider, useAuth } from './AuthContext.js'

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

function PrivateRoute({ children, ...rest }) {
	const { authState } = useAuth()
	const isAuthenticated = authState === 'signed-in' // ...
	const REDIRECT_PATHNAME = '/sign-in'
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated ? (
					children
				) : (
						<Redirect
							to={{
								pathname: REDIRECT_PATHNAME,
								state: { from: location }
							}}
						/>
					)
			}
		/>
	);
}
const Icon = ({ name }) => <i className="material-icons">{name}</i>

const Nav = () => {
	const navItems = [
		{ href: '/', icon: <Icon name="home" /> },
		{ href: '/explore', icon: <Icon name="whatshot" /> },
		{ href: '/inbox', icon: <Icon name="inbox" /> },
		{ href: '/person', icon: <Icon name="profile" /> },
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
const AppLayout = (props) => {
	return (
		<>
			<header>
				<h1>Mentor Finder</h1>
			</header>
			<Nav />
			<main>
				Main
			</main>
		</>
	)
}
const AppRouter = ({ children }) => {
	return (
		<BrowserRouter>
			{children}
			<Switch>
				<PrivateRoute path="/explore">
					<ExploreView />
				</PrivateRoute>
				<PrivateRoute path="/inbox">
					<InboxView />
				</PrivateRoute>
				<PrivateRoute path="/profile">
					<ProfileView />
				</PrivateRoute>
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
				<PrivateRoute path="/">
					<HomeView />
				</PrivateRoute>
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