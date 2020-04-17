const { Component } = React

const PageTitle = (props) => (<h2>Edit Profile</h2>)

const ProfilePicture = (props) => (<img src="#" alt="Profile picture" style={{ flex: "1" }} />)

const ProfileAttribute = (props) => (
	<div style={{ flex: "4", display: "flex", flexDirection: "column" }}>
		<p>{props.title || "<untitled attribute>"}</p>
		<input type={props.inputType || "text"}/>
	</div>
)


/* const ProfileForm = (props) => (
	<div className="profile-form">
		<input type="text" placeholder="Name" />
		<textarea placeholder="Insert bio here..." />
		<input className="btn" type="submit" value="Save changes" />
	</div>
) */

class ProfileForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.profile.name || "",
			bio: props.profile.bio || ""
		}
		this.saveChanges = this.saveChanges.bind(this)
	}

	saveChanges() {
		const { name, bio } = this.state;
		alert(`saving changes...\nname: ${name}\nbio: ${bio}`)
	}

	render() {
		return (
			<div className="profile-form">
				<input
					type="text"
					placeholder="Name"
					value={this.state.name}
					onChange={(event) => this.setState({ name: event.target.value })} />
				<textarea
					placeholder="Insert bio here..."
					value={this.state.bio}
					onChange={(event) => this.setState({ bio: event.target.value })} />
				<button
					className="btn"
					onClick={(event) => { this.saveChanges() }}>
					Save changes
				</button>
			</div>
		)
	}

}

/**
 * <PageTitle />
 * <ProfilePicture />
 * <ProfileAttribute />
 */

class ProfileView extends Component {

	constructor(props)
	{

		const DEFAULT_PROFILE =
		{
			isDefaultProfile: true,
			name: "",
			bio: ""
		}

		super(props)
		this.state = {
			profile: props.profile || DEFAULT_PROFILE || { isEmptyProfile: true, }
		}
	}

	render () {
		return (
			<div className="ProfileView">
				{/* <h1>Profile</h1> */}
				{/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
				<div>
					
					<PageTitle />

					<ProfileForm
						profile={{
							name: "Nahom Ebssa",
							bio: "I like to think, I think..."
						}} />

				</div>
			</div>
		)
	}
}
