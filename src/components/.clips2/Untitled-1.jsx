<MPrivateRoute path="/explore">
					<ExploreView />
				</MPrivateRoute>
				<MPrivateRoute path="/inbox">
					<InboxView />
				</MPrivateRoute>
				<MPrivateRoute path="/profile">
					<ProfileView />
				</MPrivateRoute>
				<Route path="/sign-in">
					<AuthView
						authMode="AuthMode.SIGNIN"
						successPath={"/profile"} />
				</Route>
				<Route path="/sign-up">
					<AuthView
						authMode="AuthMode.SIGNUP" />
				</Route>
				<Route path="/sign-out">
					<AuthView
						authMode="AuthMode.SIGNOUT" />
				</Route>
				{/* <MPrivateRoute path="/">
					<HomeView />
				</MPrivateRoute> */}