import React, { Component, useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { AuthenticationManager } from './controllers'
import { HomeView, ExploreView, InboxView, ProfileView, AuthenticationView } from './views'
import { ALERT } from './utils'
import * as Octicons from '@styled-icons/octicons'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'

const Icon = (props) => <i className="material-icons">{props.name}</i>

const AppTabs = ({ tabs }) => (
	<nav className="AppTabs">
		<ul>
			<li>
				<Link to="/">
					<Octicons.Home size={24} />
				</Link>
			</li>
			<li>
				<Link to="/explore">
					<Octicons.Flame size={24} />
				</Link>
			</li>
			<li>
				<Link to="/inbox">
					<Octicons.Inbox size={24} />
				</Link>
			</li>
			<li>
				<Link to="/profile">
					<Octicons.Person size={24} />
				</Link>
			</li>
		</ul>
	</nav>
)

export /* default */ class Appy extends Component {
	
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

export default function App() {

    const [isSignedOut, setSignedOut] = useState(true)

    let basename;
    // basename = ""
    // basename = "/mentor-app/app.html"
    basename = "/dist/app.html"
    return (
        <>
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
        </>
    )
}