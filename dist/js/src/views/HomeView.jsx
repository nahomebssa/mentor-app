const { Link } = ReactRouterDOM;

class HomeView extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {}
		this.initProfile()
	}

	initProfile() {
		this.state = {
			displayUserName: "",
		}
	}

	loadProfile() {
		const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
		if (isSignedOut) {
			ERR("Could not load profile, not yet signed in.")
			return
		}
		const uid = AuthenticationManager.currentUser.uid
		DBG(firebase.auth().currentUser)
		DBG(uid)
		DatabaseManager.getUserRecord(
			uid,
			{
				onSuccess: (user) => {
					if (user.exists) {
						console.info("[onSuccess] user: ", user)
						const userData = user.data()
						this.setState({
							displayUserName: userData.username || "",
						})
					}
				},
				onError: (err) => ERR("[loadProfile -> DatabaseManager.getUserRecord] err: ", err)
			}
		)
	}

	componentDidMount() {
		this.loadProfile()
	}

	render () {
		const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
		if (isSignedOut) return <Redirect to="/sign-in" />
		const username = g_databaseManager.userModel.username || ""
		return (
			<div className="HomeView">
				<h1 className="title">Home</h1>
				<h3>Welcome to Mentor Finder{username ? `, ${username}` : "<no user>"}!</h3>
				<h4>Some things you can do:</h4>
				<ul>
					<li>
						<span className="material-icons">check_circle_outline</span>
						<Link to="/profile">
							Edit your profile
						</Link>
					</li>
					<li>
						<span className="material-icons">check_circle_outline</span>
						<Link to="/explore">
							Find a mentor by field
						</Link>
					</li>
				</ul>
			</div>

		)
	}
}