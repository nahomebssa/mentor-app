class ProfileManager {
	
	/**
	 * 
	 */
	constructor({ /* ... */ }) {}

	editProfile() {}


	static saveChanges({

	}) {

		const user = AuthenticationManager.currentUser;
		const {
			displayName,
			email,
			photoURL,
			emailVerified,
			uid
		} = user;
		
		AuthenticationManager.currentUser.updateProfile({
			displayName: user.displayName,
			// photoURL: "https://example.com/jane-q-user/profile.jpg"
		}).then(function () {
			// Update successful.
			ALERT(`updated profile`)
		}).catch(function (error) {
			// An error happened.
			ALERT(`failed to update profile`)
			DBG(`${FNID()}, ${error}`)
		});

		const db = firebase.firestore()
		const usersRef = db.collection("/users")
		const profileRef = usersRef.doc(AuthenticationManager.currentUser)
		const newProfile = user.toJSON() || {};
		DBG(`${newProfile}`)
		profileRef.set(newProfile)

	}


	static loadProfile({
		onLoaded = () => {},
		onFailed = () => {},
	}) {
		const DEFAULT_PROFILE = { isDefaultProfile: true, name: "", bio: "" }
		const user = firebase.auth().currentUser
		const { displayName, email, photoURL, emailVerified, uid } = user;
		
		// const profileRef = firebase.firestore().collection("/users").doc(firebase.auth().currentUser)
		const db = firebase.firestore()
		const usersRef = db.collection("/users")
		const profileRef = usersRef.doc(uid)
		profileRef.get()
			.then(this.onProfileRefGet)
			.catch(this.onProfileRefGetError)

		DBG(`user: `, user)
	}

}