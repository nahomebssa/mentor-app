// For debugging purposes...
const MPrivateRoute = ({ location, ...rest}) => {
	const { authState } = useAuth()
	const isAuthenticated = authState === 'signed-in'
	return isAuthenticated ? <Route {...rest} /> : <Redirect to="/sign-in" />
}
const MAppRouter = ({ children }) => (
	<BrowserRouter>
		{children}
		<Switch>
			<MPrivateRoute exact path="/profile" component={ProfileView} />
			<MPrivateRoute exact path="/inbox" component={InboxView} />
			<MPrivateRoute exact path="/explore" component={ExploreView} />
			<MPrivateRoute exact path="/" component={HomeView} />
			<Route exact path="/sign-in" component={AuthView} />
			<Route path="*">
				<code>404 NOT FOUND</code>
			</Route>
		</Switch>
	</BrowserRouter>
)
return (
	<AppProvider>
		<AuthProvider>
			<MAppRouter>

			</MAppRouter>
		</AuthProvider>
	</AppProvider>
)


// -------------------------------------------------------------------------------------------------
