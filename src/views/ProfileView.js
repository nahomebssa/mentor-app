import React, { Component, useState } from 'react'
import { DBG, ALERT } from '../utils'

import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'

export class ProfileView extends Component {
	constructor(props) {
		super(props)
		// const FNID = `[ProfileView#constructor]`
		// DBG(FNID, `props.profile: `, this.props.profile)
		DBG(`{chk} props.profile: `, this.props.profile)

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
	saveChanges() {
		// const FNID = `[ProfileForm#saveChanges]`
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
			// ALERT(`${FNID} updated profile`)
			ALERT(`{chk}updated profile`)
		}).catch(function (error) {
			// An error happened.
			// ALERT(`${FNID} failed to update profile`)
			// DBG(FNID, error)
			ALERT(`{chk}failed to update profile`)
			DBG('chk', error)
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
		return (
			<>
				<h2 className="title">Edit Profile</h2>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							required
							type="text"
							placeholder="Name"
							value={this.state.iName}
							onChange={(event) => this.setState({ iName: event.target.value })} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Username"
							value={this.state.iUsername}
							onChange={(event) => this.setState({ iUsername: event.target.value })} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Bio</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Insert bio here..."
							value={this.state.iBio}
							onChange={(event) => this.setState({ iBio: event.target.value })} />
					</Form.Group>
					<Button onClick={(event) => { this.saveChanges() }}>
						Save changes
					</Button>
				</Form>
			</>
		)
	}
}
