const { Component } = React;
const { render } = ReactDOM;

const {
	BrowserRouter,
	Switch,
	Route,
	Link
} = ReactRouterDOM

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<header>
						{/* <h1>Mentor Finder</h1> */}
					</header>
					<main>
						<Switch>
							<Route path="/Explore">
								<ExploreView />
							</Route>
							<Route path="/inbox">
								<InboxView />
							</Route>
							<Route path="/profile">
								<ProfileView />
							</Route>
							<Route path="/">
								<HomeView />
							</Route>
						</Switch>
					</main>
					<nav>
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/explore">Explore</Link></li>
							<li><Link to="/inbox">Inbox</Link></li>
							<li><Link to="/profile">Profile</Link></li>
						</ul>
					</nav>
				</div>
			</BrowserRouter>
		)
	}
}

render(
	<App />,
	document.getElementById('root')
)