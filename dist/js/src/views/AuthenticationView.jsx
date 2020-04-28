const LIST_OF_MAJORS = [
	"Computer Science",
	"Engineering",
	"Biological and biomedical sciences",
	"Psychology",
	"Social sciences and history",
	"Health professions and related programs",
	"Business",
]

class SignInForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "user1@gmail.com",
			password: "user001",
			email: "",
			password: "",
			errorMessage: "",
			gotSignedIn: false,
			redirectUrl: this.props.successPath || "/profile",
		}
		this.onSignInFail = this.onSignInFail.bind(this)
		this.onSignInSuccess = this.onSignInSuccess.bind(this)
		this.handleSignIn = this.handleSignIn.bind(this)
	}

	onSignInSuccess(result) {
		
		// DBG(`Sign in successful!`)
		ALERT(`Sign in successful!`)
		
		const {
			history,
			successPath,
		} = this.props

		AuthenticationManager.setAuthState(AuthenticationManager.AuthState.SIGNEDIN)

		this.setState({ gotSignedIn: true })
	}

	onSignInFail(error) {
		const FNID = `[SignInForm#onSignInFail]`
		ALERT(`Failed to sign in :( ...`)
		ERR(`error: ${error}`)

		this.setState({ errorMessage: `${error}` })
	}

	handleSignIn() {
		
		const {
			email,
			password
		} = this.state
		
		ALERT(`Signing in...\nemail: ${email}\npassword: ${password}`)
		
		AuthenticationManager.signIn({
			provider: AuthenticationManager.AuthProvider.EMAIL,
			email, password,
			onSuccess: this.onSignInSuccess,
			onFail: this.onSignInFail,
		})
	}	

	render() {

		const {
			errorMessage,
			gotSignedIn,
			redirectUrl,
		} = this.state

		if (gotSignedIn === true)
		{
			return <Redirect to={redirectUrl} />
		}
		
		const FNID = `[SignInForm#render]`
		const hasError = (errorMessage !== "")
		return (
			<div className="auth-form --sign-in">
				<div className={`msg-banner ${ hasError ? "--error" : "--hidden" }`}>
					{errorMessage}
				</div>
				<form>
					<input
						className="form-control form-input mb-3"
						type="email"
						placeholder="Email address"
						value={this.state.email}
						onChange={(event) => this.setState({ email: event.target.value })} />
					<input
						className="form-control form-input mb-3"
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={(event) => this.setState({ password: event.target.value })} />
					<div id="btns">
						<Link to="/sign-up">
							<button className="btn btn-link">
								Sign up
							</button>
						</Link>
						<input className="btn btn-primary"
							type="button"
							value="Sign In"
							onClick={() => this.handleSignIn()} />
					</div>
				</form>
			</div>
		)
	}
}
class SignUpForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// fullName: "User One",
			// email: "user1@gmail.com",
			// password: "user001",
			iFullName: "",
			iEmail: "",
			iPassword: "",
			iAreaOfExpertise: "",
			errorMessage: "",
			gotSignedUp: false,
		}
		this.onSignUpSuccess = this.onSignUpSuccess.bind(this)
		this.onSignUpFail = this.onSignUpFail.bind(this)
	}
	onSignUpSuccess(result) {
		
		LOG("result: ", result)
		DBG(
			"AuthenticationManager.currentUser: ",
			AuthenticationManager.currentUser
		)
		ALERT(`Sign up succeeded. Check the console for details`)
		
		// set user's name and other details
		// actually handled by back-end
		// const user = new UserModel({
		// 	uid: result.user.uid,
		// 	displayName: this.state.fullName,
		// })
		// DatabaseManager.updateUser(user)
		// DatabaseManager.addUser(user)
		
		// this needs to happen last, as it will re-render, and redirect the page
		this.setState({ gotSignedUp: true })
	}
	onSignUpFail(error) {
		ERR("error: ", error)
		ALERT(`Sign up failed. Check the console for details.`)
		this.setState({ errorMessage: `${error}` })
	}
	handleSignUp() {
		
		const {
			iEmail: email,
			iPassword: password,
			iFullName: displayName,
			iAreaOfExpertise,
		} = this.state
		DBG("state", { email, password })
		ALERT(`Signing up... (see console)`)

		const _fields = [ iAreaOfExpertise ]
		const userData = { displayName, fields: _fields }

		/* const authResult =  */
		AuthenticationManager.signUp({
			provider: AuthenticationManager.AuthProvider.EMAIL,
			email, password, userData,
			onSuccess: this.onSignUpSuccess,
			onFail: this.onSignUpFail,
		})

	}
	render() {
		const {
			errorMessage,
			gotSignedUp,
		} = this.state

		if (gotSignedUp === true)
		{
			return <Redirect to="/sign-in" />
		}

		const hasError = (errorMessage !== "")
		const message = errorMessage
		return (
			<div className="auth-form --sign-up">
				<div className={`msg-banner ${ hasError ? "--error" : "--hidden" }`}>
					{message}
				</div>
				<form>
					<input
						className="form-control mb-3 px-4 py-4"
						type="text"
						placeholder="Full Name"
						value={this.state.iFullName}
						onChange={(event) => this.setState({ iFullName: event.target.value })} />
					<input
						className="form-control mb-3 px-4 py-4"
						type="email"
						placeholder="Email address"
						value={this.state.iEmail}
						onChange={(event) => this.setState({ iEmail: event.target.value })} />
					<input
						className="form-control mb-3 px-4 py-4"
						type="password"
						placeholder="Password"
						value={this.state.iPassword}
						onChange={(event) => this.setState({ iPassword: event.target.value })} />
					<select
						className="form-control mb-3"
						defaultValue="Area of Expertise"
						onChange={ event => { this.setState({ iAreaOfExpertise: event.target.value}) } }>
						<option value="Area of Expertise">Area of Expertise</option>
						{LIST_OF_MAJORS.map((m, i) => (
							<option key={i} value={m}>
								{m}
							</option>
						))}
					</select>
					<input
						className="form-control btn btn-primary"
						type="button"
						value="Sign Up"
						onClick={() => this.handleSignUp()} />
				</form>
			</div>
		)
	}
}
const SignOutForm = (props) => (null)

// TODO: use flexbox
class AuthenticationView extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {

		let authForm = null;
		let signedOut = false;
		switch (this.props.authMode) {
			case "AuthMode.SIGNIN":
				authForm = <SignInForm
								successPath={this.props.successPath} />
				break;
			case "AuthMode.SIGNUP":
				authForm = <SignUpForm
								successPath={this.props.successPath} />
				break;
			case "AuthMode.SIGNOUT":
				authForm = <SignOutForm />
				signedOut = true;
				break;
			default:
				break;
		}

		return (
			<div className="AuthenticationView">
				{!signedOut ? <h1 className="auth-title">Mentor Finder</h1> : null}
				{authForm}
			</div>
		)
	}
}
