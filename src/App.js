import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
    HomeView,
    ExploreView,
    InboxView,
    ProfileView,
    AuthenticationView,
} from "./views";
import * as Octicons from "@styled-icons/octicons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

const AppContext = createContext();
const AppProvider = ({ ...rest }) => {
    const [currentTab, setCurrentTab] = useState("Profile");
    const providerValue = {
        currentTab,
        setCurrentTab,
    };
    return <AppContext.Provider {...rest} value={providerValue} />;
};
export const useApp = () => useContext(AppContext);

const AppTabs = ({ tabs }) => (
    <nav className="AppTabs">
        <ul>
            {tabs.map(({ href, icon: Icon }, i) => {
                return (
                    <li key={i}>
                        <Link to={href}>
                            <Icon size={24} />
                        </Link>
                    </li>
                );
            })}
        </ul>
    </nav>
);

const AppSwitch = () => (
    <Switch>
        <Route path="/explore" component={ExploreView} />
        <Route path="/inbox" component={InboxView} />
        <Route path="/profile" component={ProfileView} />
        <Route path="/sign-in">
            <AuthenticationView
                authMode="AuthMode.SIGNIN"
                successPath={"/profile"}
            />
        </Route>
        <Route path="/sign-up">
            <AuthenticationView authMode="AuthMode.SIGNUP" />
        </Route>
        <Route path="/sign-out">
            <AuthenticationView authMode="AuthMode.SIGNOUT" />
        </Route>
        <Route path="/" component={HomeView} />
    </Switch>
);
const AppLayout = ({ children, ...rest }) => {
    const tabs = [
        { href: "/", icon: Octicons.Home },
        { href: "/explore", icon: Octicons.Flame },
        { href: "/inbox", icon: Octicons.Inbox },
        { href: "/profile", icon: Octicons.Person },
    ];
    const AppHeader = ({ children }) => (
        <header className="AppHeader">{children}</header>
    );
    const AppMain = ({ children }) => (
        <main className="AppMain">{children}</main>
    );
    return (
        <div className="App">
            <AppHeader>
                <b>Mentor Finder</b>
            </AppHeader>
            <AppMain>
                {children}
                <AppSwitch />
            </AppMain>
            <AppTabs tabs={tabs} />
        </div>
    );
};

export default function App() {
    let basename;
    // basename = ""
    // basename = "/dist/app.html";
    // basename = "/mentor-app/app.html";
    return (
        <>
            <AppProvider>
                <BrowserRouter basename={basename}>
                    <AppLayout />
                </BrowserRouter>
            </AppProvider>
        </>
    );
}
