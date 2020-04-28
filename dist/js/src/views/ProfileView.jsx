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
		console.log("props.profile: ", this.props.profile)
		
		// props passed in as attributes ... nvm
		// const {
		// 	profile = {}
		// } = this.props

		// The
		
		// maintain the state of the profile view
		this.state = {		
			// profile: props.profile || DEFAULT_PROFILE || { isEmptyProfile: true, }
			profile: profile || { isEmptyProfile: true },
		}
		
		// ProfileForm
		this.saveChanges = this.saveChanges.bind(this)
		
		this.onProfileRefGet = this.onProfileRefGet.bind(this);
		this.onProfileRefGetError = this.onProfileRefGetError.bind(this);
		this.loadProfile = this.loadProfile.bind(this);

		// get profile from firebase
		this.loadProfile()
	}

	loadProfile() {
		// ProfileManager.saveChanges({})
		const { profile } = this.state
		this.state = ({
			...this.state,
			// ProfileForm
			iName: profile.displayName || "",
			iUsername: profile.username || "",
			iIsMentee: profile.isMentee || false,
			iBio: profile.bio || "",
			iEmail: profile.email || "",
			iLinkedIn: profile.linkedIn || "",
			iSkype: profile.skype || "",
		})
	}

	onProfileUpdated() {
		alert("Your changes have been saved.")
	}

	saveChanges() {
		
		const {
			iName: displayName,
			iUsername: username,
			iIsMentee: isMentee,
			iBio: bio,
			iEmail: email,
			iLinkedIn: linkedIn,
			iSkype: skype,
		} = this.state

		const _userInput = {
			name: displayName,
			username,
			isMentee,
			bio,
			email,
			linkedIn,
			skype,
		}
		console.log(`ProfileForm.state (formInput)`, _userInput)
		ALERT(`Check console for ProfileForm.state`)
		
		// return
		
		// DBG("result: ", result)
		DBG(`Saving changes...`)
		console.log("_userInput: ", _userInput)
		ALERT("Trying to successfully save changes... (see console)")
		
		// DatabaseManager.userModel.setData({
		// 	..._userInput
		// })

		DatabaseManager.updateUserRecord(_userInput)

		this.onProfileUpdated()

	}

	onProfileRefGet(doc) {
		const ptrThis = this
		
		if (doc.exists) {
			const profile = doc.data()
			ptrThis.setState({
				// name: firebase.auth().currentUser.displayName,
				profile,
				iName: profile.name,
				iUsername: profile.username,
				iBio: profile.bio,
				iEmail: profile.email,
				iLinkedIn: profile.linkedIn,
				iSkype: profile.skype,
			})
			// this.forceUpdate()
			DBG(`this.state.profile`, this.state.profile)
			// ALERT(`doc exists`)
		} else {
			console.log("No such document 'doc.data()' defined!")
		}
	}

	onProfileRefGetError(error) {
		console.log("Error getting document:", error);
		ALERT(`Error getting document: ${error}`)
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
								checked={this.state.iIsMentee}
								onChange={ event => this.setState({ iIsMentee: event.target.checked }) } />

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
