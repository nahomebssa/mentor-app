class DatabaseManager {

	constructor() {
		this.userModel = new UserModel({})
	}

	static addUser1(/* UserModel */ user) {
		_typeCheck(user, UserModel, `_tC: Could not add user "${user}"`)
		// const db = firebase.firestore()
		// const usersRef = db.collection("users")
		// usersRef.doc(user.uid).set({
		// 	isSetup: "no?false:true",
		// 	...user.data
		// });
	}

	static getUserModelData() { return g_databaseManager.userModel.data }
	static setUserModelData(newData) { g_databaseManager.userModel.setData(newData) }
	static getUsersRef() { return firebase.firestore().collection('users') }
	static getUserRef(uid) { return firebase.firestore().collection('users').doc(uid) }

	static createUser(uid, userData) {
		ALERT("Creating new user")
		g_databaseManager.userModel = new UserModel({})
		DatabaseManager.createUserRecord(uid, userData)
	}

	static updateUser(userData) {
		
		AuthenticationManager.currentUser.updateProfile({
			displayName: userData.displayName,
			//photoURL: "https://example.com/jane-q-user/profile.jpg"
		})
			.then(() => { 
				console.log("Tried to update current user profile: success")
			 })
			.catch(() => { 
				console.log("Tried to update current user profile: failed")
			 });

		DatabaseManager.updateUserRecord()

			//  DatabaseManager._onUpdateUserSuccess
			//  DatabaseManager._onUpdateUserError
	}

	static createUserRecord(uid, newRecord) {
		DatabaseManager.setUserModelData(newRecord)
		DatabaseManager.getUserRef(uid).set(DatabaseManager.getUserModelData())
			.then(user => {
				console.log("userModel: ", g_databaseManager.userModel)
				ALERT("User records got updated... (see console)")
			})
			.catch(err => {
				ERR('Error getting document', err);
				ALERT('Error getting document');
			});
	}

	static updateUserRecord(newRecord) {
		g_databaseManager.userModel.setData(newRecord)
		const db = firebase.firestore();
		const { uid } = AuthenticationManager.currentUser  // should be signed in by now...
		db.collection('users').doc(uid).set({
			...g_databaseManager.userModel.data
		})
			.then(user => {
				console.log("userModel: ", g_databaseManager.userModel)
				ALERT("User records got updated... (see console)")
			})
			.catch(err => {
				DBG('Error getting document', err);
				ALERT('Error getting document');
			});
	}

	static _onUpdateUserSuccess(/* result */) {  // Update successful.
		ALERT(`Successfuly updated profile`)
	}
	static _onUpdateUserError(error) {  // An error happened.
		ERR(err)
		ALERT(`Failed to update profile. Check the console for details`)
	}

	static _initialize() { /* ... */ }

}
	// ...
DatabaseManager._initialize()

const g_databaseManager = new DatabaseManager();