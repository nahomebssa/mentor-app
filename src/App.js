import React, { useState, createContext, useContext } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
// import { AuthenticationManager } from './controllers'
import { HomeView, ExploreView, InboxView, ProfileView, AuthenticationView } from './views'
// import { ALERT } from './utils'
import * as Octicons from '@styled-icons/octicons'
import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'

const AppContext = createContext()
const AppProvider = () => {
    const state = {
        appName: 'MentorFinder'
    }
    return (
        <AppContext.Provider value={state} />
    )
}
const useApp = () => useContext(AppContext)

const AppTabs = ({ tabs }) => (
	<nav className="AppTabs">
		<ul>
            {tabs.map(({href,icon:Icon},i) => {
                return (
                    <li key={i}>
                        <Link to={href}>
                            <Icon size={24} />
                        </Link>
                    </li>
                )
            })}
		</ul>
	</nav>
)

const AppSwitch = () => (
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
)
const AppLayout = ({ children, ...rest }) => {
    const tabs = [
        { href:"/", icon: Octicons.Home },
        { href:"/explore", icon: Octicons.Flame },
        { href:"/inbox", icon: Octicons.Inbox },
        { href:"/profile", icon: Octicons.Person },
    ]
    const AppHeader = ({ children }) => (
        <header className="AppHeader">
            {children}
        </header>
    )
    const AppMain = ({ children }) => (
        <main className="AppMain">
            {children}
        </main>
    )
    return (
        <div className="App">
            <AppHeader>
                <h1>Mentor Finder</h1>
            </AppHeader>
            <AppMain>
                {children}
                <AppSwitch />
            </AppMain>
            <AppTabs tabs={tabs} />
        </div>
    )
}

export default function App() {
    let basename;
    // basename = ""
    basename = "/mentor-app/app.html"
    // basename = "/dist/app.html"
    return (
        <>
            <BrowserRouter basename={basename}>
                <AppLayout>
                    {/* Current tab (main view) */}
                </AppLayout>
            </BrowserRouter>
        </>
    )
}
