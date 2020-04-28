const inputTextProps = (placeholder, valueBinding, onChangeFn ) =>
({
	type: "text",
	className: "form-control",
	value: valueBinding,
	onChange: onChangeFn,
	placeholder,
})
const inputProps = (placeholder, valueBinding, onChangeFn ) =>
({
	className: "form-control",
	value: valueBinding,
	onChange: onChangeFn,
	placeholder,
})
const FormInputText = (props) => {
	const inputControl = (
		props.multiline ?
			<textarea
				{
					...inputProps(
						props.placeholder,
						props.value,
						props.onChange
					)
				}
			 /> :
			<input
				{
					...inputTextProps(
						props.placeholder,
						props.value,
						props.onChange
					)
				}
			 />
	)
	
	return [
		<span
			key={0}
			className="label">
				{props.label}
		</span>,
		<div
			key={1}
			className="input-group">
			{inputControl}
		</div>
	]
}
const FormInputCheck = (props) => {
	const inputControl = (
		<input
			className="my-checkbox"
			type="checkbox"
			value={props.value}
			checked={props.checked}
			onChange={props.onChange} />
	)
	return [
		<span
			key={0}
			className="label">
				{props.label}
		</span>,
		<div
			key={1}
			className="input-group">
			{inputControl}
		</div>
	]
}
const FormInputComboBox = (props) => {
	const inputControl = (
		<select
			className="form-control mb-3"
			defaultValue={props.defaultValue}
			onChange={props.onChange}>
			<option value={props.defaultValue}>{props.defaultValue}</option>
			{props.options.map((m, i) => (
				<option key={i} value={m}>
					{m}
				</option>
			))}
		</select>		
	)
	return [
		<span
			key={0}
			className="label">
				{props.label}
		</span>,
		<div
			key={1}
			className="input-group">
			{inputControl}
		</div>
	]
}
const FormSectionTitle = (props) => (
	[
		<span key={0} className="form-section">
			{props.content}
		</span>,
		<span key={1} className="grid-dummy">b</span>
	]
)
const FormSubmission = (props) => (
	<div id="btns">
		<input className="btn btn-primary" id="btn-update-profile"
			type="button"
			onClick={props.onSubmit}
			value={props.value} />
	</div>
)

const PageTitle = (props) => (<h2 className="title">Edit Profile</h2>)
const ProfilePicture = (props) => (<img src="#" alt="Profile picture" style={{ flex: "1" }} />)
const ProfileAttribute = (props) => (
	<div style={{ flex: "4", display: "flex", flexDirection: "column" }}>
		<p>{props.title || "<untitled attribute>"}</p>
		<input type={props.inputType || "text"}/>
	</div>
)

class ProfileView extends React.Component {

	constructor(props) {
		
		super(props)
		DBG("props.profile: ", this.props.profile)
		
		// props passed in as attributes ... nvm
		// const {
		// 	profile = {}
		// } = this.props

		// The profile should be retrived from DatabaseManager
		const profile = DatabaseManager.getCurrentProfile()
		DBG("DatabaseManager.getCurrentProfile: ", profile)
		
		// maintain the state of the profile view
		this.state = {
			profile: this.props.profile || { isEmptyProfile: true },
			menteeCheckValue: "null",
		}
		this.initProfile()
		
		this.saveChanges = this.saveChanges.bind(this)
		this.loadProfile = this.loadProfile.bind(this);

		// get profile from firebase
		// this.loadProfile()
	}

	initProfile() {
		this.state = {
			...this.state,
			iName: "",
			iUsername: "",
			iIsMentee: false,
			iBio: "",
			iAreaOfExpertise: "",
			iEmail: "",
			iLinkedIn: "",
			iSkype: "",
		}
	}

	loadProfile() {
		const uid = AuthenticationManager.currentUser.uid
		DBG(uid)
		DatabaseManager.getUserRecord(
			uid,
			{
				onSuccess: (user) => {
					if (user.exists) {
						INFO("[onSuccess] user: ", user)
						const userData = user.data()
						this.setState({
							...this.state,
							// ProfileForm
							iName: userData.displayName || "",
							iUsername: userData.username || "",
							iIsMentee: userData.isMentee || false,
							iAreaOfExpertise: userData.fields[0] || "",
							iBio: userData.bio || "",
							iEmail: userData.email || "",
							iLinkedIn: userData.linkedIn || "",
							iSkype: userData.skype || "",
						})
					}
				},
				onError: (err) => ERR("[loadProfile -> DatabaseManager.getUserRecord] err: ", err)
			}
		)

		const userData = g_databaseManager.userModel.data
		this.setState({
			...this.state,
			// ProfileForm
			iName: userData.displayName || "",
			iUsername: userData.username || "",
			iIsMentee: userData.isMentee || false,
			iAreaOfExpertise: userData.fields[0] || "",
			iBio: userData.bio || "",
			iEmail: userData.email || "",
			iLinkedIn: userData.linkedIn || "",
			iSkype: userData.skype || "",
		})

	}

	componentDidMount() {
		this.loadProfile()
	}
	
	onProfileUpdated() {
		alert("Your changes have been saved.")
	}

	saveChanges() {
		
		const {
			iName: displayName,
			iUsername: username,
			iIsMentee: isMentee,
			iAreaOfExpertise: areaOfExpertise,
			iBio: bio,
			iEmail: email,
			iLinkedIn: linkedIn,
			iSkype: skype,
		} = this.state

		const _userInput = {
			displayName,
			username,
			isMentee,
			areaOfExpertise,
			bio,
			email,
			linkedIn,
			skype,
		}
		DBG(`ProfileForm.state (formInput)`, _userInput)
		ALERT(`Check console for ProfileForm.state`)
		
		// return
		
		// DBG("result: ", result)
		DBG(`Saving changes...`)
		DBG("_userInput: ", _userInput)
		ALERT("Trying to successfully save changes... (see console)")
		
		// DatabaseManager.userModel.setData({
		// 	..._userInput
		// })

		DatabaseManager.updateUserRecord(_userInput)

		this.onProfileUpdated()

	}

	render () {
		const {
			profile
		} = this.state

		return (
			<div className="ProfileView">
				<div>
					<PageTitle />
					
						<div className="profile-form form-group">
						
							<FormInputText
								label="Name"
								placeholder="Name"
								value={this.state.iName}
								onChange={ event => this.setState({ iName: event.target.value }) } />

							<FormInputText
								label="Username"
								placeholder="Username"
								value={this.state.iUsername}
								onChange={ event => this.setState({ iUsername: event.target.value }) } />

							<FormInputCheck
								label="Mentee"
								value={this.state.menteeCheckValue}
								checked={this.state.iIsMentee}
								onChange={ event => this.setState({ iIsMentee: event.target.checked }) } />

							<FormInputComboBox
								defaultValue={this.state.iAreaOfExpertise}
								onChange={ event => { this.setState({ iAreaOfExpertise: event.target.value}) } }
								options={LIST_OF_MAJORS} />

							<FormInputText
								label="Bio"
								placeholder="Bio"
								multiline={true}
								value={this.state.iBio}
								onChange={ event => this.setState({ iBio: event.target.value }) } />

							<FormSectionTitle content="Socials" />
							
							<FormInputText
								label="LinkedIn"
								placeholder="Username"
								value={this.state.iLinkedIn}
								onChange={ event => this.setState({ iLinkedIn: event.target.value }) } />
							
							<FormInputText
								label="Skype"
								placeholder="Username"
								value={this.state.iSkype}
								onChange={ event => this.setState({ iSkype: event.target.value }) } />

							<FormSubmission
								value="Save changes"
								onSubmit={(event) => { DBG("SAVING CHANGES"); this.saveChanges() }} />
							
						</div>
				</div>
			</div>
		)
	}
}
