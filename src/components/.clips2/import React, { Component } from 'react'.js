import React, { Component } from 'react'
import { DBG, ALERT } from '../utils'

import * as firebase from 'firebase'

const PageTitle = (props) => (<h2 className="title">Edit Profile</h2>)

// const ProfilePicture = (props) => (<img src="#" alt="Profile" style={{ flex: "1" }} />)

/* const ProfileAttribute = (props) => (
	<div style={{ flex: "4", display: "flex", flexDirection: "column" }}>
	<p>{props.title || "<untitled attribute>"}</p>
	<input type={props.inputType || "text"}/>
	</div>
	) */
	
	/* const ProfileForm = (props) => (
		<div className="profile-form">
		<input type="text" placeholder="Name" />
		<textarea placeholder="Insert bio here..." />
		<input className="btn" type="submit" value="Save changes" />
		</div>
		) */
		
		/* class ProfileForm1 extends Component {
			constructor(props) {
				super(props)
				const FNID = `[ProfileForm#constructor]`
				DBG(FNID, `props.profile: `, props.profile)
				this.state = {
					name: props.profile.name || "",
					bio: props.profile.bio || ""
				}
				this.saveChanges = this.saveChanges.bind(this)
			}
			
			saveChanges() {
				const FNID = `[ProfileForm#saveChanges]`
				// ALERT(`${FNID} SUCCESS \n${result}`)
				// DBG(FNID, result)
				
				const { name, bio } = this.state;
				ALERT(`saving changes...\nname: ${name}\nbio: ${bio}`)
				
				const user = firebase.auth().currentUser;
				user.updateProfile({
					displayName: this.state.name,
					// photoURL: "https://example.com/jane-q-user/profile.jpg"
				}).then(function () {
					// Update successful.
					ALERT(`${FNID} updated profile`)
				}).catch(function (error) {
					// An error happened.
					ALERT(`${FNID} failed to update profile`)
					DBG(FNID, error)
				});
				
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
					<input
					type="button"
					className="btn"
					onClick={(event) => { this.saveChanges() }}
					value="Save changes" />
					</div>
					)
				}
				
			} */
			
			/* class ProfileForm extends Component {
				constructor(props) {
					super(props); const {profile} = props;
					this.state = {
						iName: profile.name || "",
						iUsername: profile.username || "",
						iBio: profile.bio || "",
						iEmail: profile.email || "",
					}
					this.saveChanges = this.saveChanges.bind(this)
				}
				render()
				{
					return (
						<div className="ProfileForm">
						
						</div>
						)
					}
				} */
				
				/**
				* <PageTitle />
				* <ProfilePicture />
				* <ProfileAttribute />
				*/
				
				class ProfileView extends Component {
					
					constructor(props) {
						super(props)
						const FNID = `[ProfileView#constructor]`
						DBG(FNID, `props.profile: `, this.props.profile)
						
						// props passed in as attributes
						const {
							profile = {}
						} = this.props
						
						// maintain the state of the profile view
						this.state = {
							
							// profile: props.profile || DEFAULT_PROFILE || { isEmptyProfile: true, }
							profile: profile || { isEmptyProfile: true },
							
							// ProfileForm
							iName: profile.name || "",
							iUsername: profile.username || "",
							iBio: profile.bio || "",
							iEmail: profile.email || "",
						}
						
						// ProfileForm
						this.saveChanges = this.saveChanges.bind(this)
						
						this.onProfileRefGet = this.onProfileRefGet.bind(this);
						this.onProfileRefGetError = this.onProfileRefGetError.bind(this);
						this.getProfile = this.loadProfile.bind(this);
						
						// get profile from firebase
						this.loadProfile()
						
					}
					
					onProfileUpdated() {
						alert("Your changes have been saved.")
					}
					
					// ProfileForm
					saveChanges() {
						const FNID = `[ProfileForm#saveChanges]`
						// ALERT(`${FNID} SUCCESS \n${result}`)
						// DBG(FNID, result)
						
						const { name, bio } = this.state;
						ALERT(`saving changes...\nname: ${name}\nbio: ${bio}`)
						
						const user = firebase.auth().currentUser;
						const { uid } = user; // const { displayName, email, photoURL, emailVerified, uid } = user;
						user.updateProfile({
							displayName: this.state.name,
							// photoURL: "https://example.com/jane-q-user/profile.jpg"
						}).then(function () {
							// Update successful.
							ALERT(`${FNID} updated profile`)
						}).catch(function (error) {
							// An error happened.
							ALERT(`${FNID} failed to update profile`)
							DBG(FNID, error)
						});
						
						const db = firebase.firestore()
						const usersRef = db.collection("/users")
						const profileRef = usersRef.doc(uid)
						const newProfile = {
							// ...this.state.profile,
							name: this.state.iName,
							username: this.state.iUsername,
							bio: this.state.iBio,
							email: this.state.iEmail,
						}
						DBG(newProfile)
						profileRef.set(newProfile)
						
						this.onProfileUpdated()
						
					}
					// end ProfileForm
					
					onProfileRefGet(doc) {
						const thispv = this
						const FNID = `[ProfileView#onProfileRefGet]`
						if (doc.exists) {
							const profile = doc.data()
							thispv.setState({
								// name: firebase.auth().currentUser.displayName,
								profile,
								iName: profile.name,
								iUsername: profile.username,
								iBio: profile.bio,
								iEmail: profile.email,
							})
							this.forceUpdate()
							DBG(`${FNID} this.state.profile`, this.state.profile)
							// ALERT(`${FNID} doc exists`)
						} else {
							console.log("No such document 'doc.data()' defined!")
						}
					}
					
					onProfileRefGetError(error) {
						const FNID = `[ProfileView#onProfileRefGetError]`
						console.log("Error getting document:", error);
						ALERT(`${FNID} Error getting document: ${error}`)
					}
					
					loadProfile() {
						const FNID = `[ProfileView#getProfile]`
						
						// const DEFAULT_PROFILE = { isDefaultProfile: true, name: "", bio: "" }
						const user = firebase.auth().currentUser
						const { uid } = user || { uid: '<no-uid>' };  // const { displayName, email, photoURL, emailVerified, uid } = user;
						
						// const profileRef = firebase.firestore().collection("/users").doc(firebase.auth().currentUser)
						const db = firebase.firestore()
						const usersRef = db.collection("/users")
						const profileRef = usersRef.doc(uid)
						profileRef.get()
						.then(this.onProfileRefGet)
						.catch(this.onProfileRefGetError)
						
						DBG(`${FNID} user: `, user)
					}
					
					
					render() {
						// const FNID = `[ProfileView#render]`
						// DBG(`${FNID} rendering...`, this.state.profile )
						
						// const { profile } = this.state
						
						return (
							<div className="ProfileView">
							<div>
							<PageTitle />
							{/* <ProfileForm
							profile={profile} /> */}
							
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
							<Form.Row>
							<Form.Group as={Col} md="4" controlId="validationCustom01">
							<Form.Label>First name</Form.Label>
							<Form.Control
							required
							type="text"
							placeholder="First name"
							defaultValue="Mark"
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationCustom02">
							<Form.Label>Last name</Form.Label>
							<Form.Control
							required
							type="text"
							placeholder="Last name"
							defaultValue="Otto"
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="4" controlId="validationCustomUsername">
							<Form.Label>Username</Form.Label>
							<InputGroup>
							<InputGroup.Prepend>
							<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
							type="text"
							placeholder="Username"
							aria-describedby="inputGroupPrepend"
							required
							/>
							<Form.Control.Feedback type="invalid">
							Please choose a username.
							</Form.Control.Feedback>
							</InputGroup>
							</Form.Group>
							</Form.Row>
							<Form.Row>
							<Form.Group as={Col} md="6" controlId="validationCustom03">
							<Form.Label>City</Form.Label>
							<Form.Control type="text" placeholder="City" required />
							<Form.Control.Feedback type="invalid">
							Please provide a valid city.
							</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="3" controlId="validationCustom04">
							<Form.Label>State</Form.Label>
							<Form.Control type="text" placeholder="State" required />
							<Form.Control.Feedback type="invalid">
							Please provide a valid state.
							</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="3" controlId="validationCustom05">
							<Form.Label>Zip</Form.Label>
							<Form.Control type="text" placeholder="Zip" required />
							<Form.Control.Feedback type="invalid">
							Please provide a valid zip.
							</Form.Control.Feedback>
							</Form.Group>
							</Form.Row>
							<Form.Group>
							<Form.Check
							required
							label="Agree to terms and conditions"
							feedback="You must agree before submitting."
							/>
							</Form.Group>
							<Button type="submit">Submit form</Button>
							</Form>
							
							<div className="profile-form" style={{ display: 'none' }}>
							
							<label>
							<span>Name</span>
							<input
							type="text"
							placeholder="Name"
							value={this.state.iName}
							onChange={(event) => this.setState({ iName: event.target.value })} />
							</label>
							
							
							<label>
							<span>Username</span>
							<input
							type="text"
							placeholder="Username"
							value={this.state.iUsername}
							onChange={(event) => this.setState({ iUsername: event.target.value })} />
							</label>
							
							<label>
							<span>Bio</span>
							<textarea
							placeholder="Insert bio here..."
							value={this.state.iBio}
							onChange={(event) => this.setState({ iBio: event.target.value })} />
							</label>
							
							{/* <label>
								<span>Email</span>
								<input
								type="email"
								placeholder="Email address"
								value={this.state.iEmail}
								onChange={(event) => this.setState({ iEmail: event.target.value })} />
							</label> */}
							<div id="btns">
							<input className="btn btn-primary" id="btn-update-profile"
							type="button"
							onClick={(event) => { this.saveChanges() }}
							value="Save changes" />
							</div>
							</div>
							</div>
							</div>
							)
						}
					}
					
					export {
						ProfileView
					}
					