class DatabaseManager {

	constructor() {
		this.userModel = new UserModel({})
	}

	static addUser1(/* UserModel */ user) {
		_typeCheck(user, UserModel, `[_typeCheck]: Could not add user "${user}"`)
		// const db = firebase.firestore()
		// const usersRef = db.collection("users")
		// usersRef.doc(user.uid).set({
		// 	isSetup: "no?false:true",
		// 	...user.data
		// });
	}

	static setUserModel(userModel) {
		DBG("Setting g_userModel", userModel);
		g_databaseManager.userModel = userModel
	}
	static getUserModel() { return g_databaseManager.userModel }
	static getUserModelData() { return g_databaseManager.userModel.data }
	static setUserModelData(newData) {
		DBG("Setting g_userModel.data", newData);
		g_databaseManager.userModel.setData(newData)
	}
	static getUsersRef() { return firebase.firestore().collection('users') }
	static getUserRef(uid) { return firebase.firestore().collection('users').doc(uid) }
	static getCurrentProfile() { return g_databaseManager.userModel.data }

	static createUser(uid, userData) {
		ALERT("Creating new user")
		g_databaseManager.userModel = new UserModel({})
		DatabaseManager.createUserRecord(uid, userData)
	}

	static getUserRecord(
		uid,
		{
			onSuccess = () => {},
			onError = () => {},
		}
	) {
		DatabaseManager.getUserRef(uid).get()
			.catch( (prev) => { onError(prev) } )
			.then( (prev) => { onSuccess(prev) } )
	}

	static updateUser(userData) {
		
		AuthenticationManager.currentUser.updateProfile({
			displayName: userData.displayName,
			//photoURL: "https://example.com/jane-q-user/profile.jpg"
		})
			.then(() => { 
				DBG("Tried to update current user profile: success")
			 })
			.catch(() => { 
				DBG("Tried to update current user profile: failed")
			 });

		DatabaseManager.updateUserRecord()

			//  DatabaseManager._onUpdateUserSuccess
			//  DatabaseManager._onUpdateUserError
	}

	static createUserRecord(uid, newRecord) {
		ALERT(`newRecord: ${JSON.stringify(newRecord)}`)
		if (newRecord.username == "" || newRecord.username == undefined) {
			newRecord.username = newRecord.email.substring(0, newRecord.email.indexOf('@'))
		}
		DatabaseManager.setUserModelData(newRecord)
		DatabaseManager.getUserRef(uid).set(DatabaseManager.getUserModelData())
			.then(user => {
				DBG("[createUserRecord] userModel: ", g_databaseManager.userModel)
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
				DBG("[updateUserRecord] userModel: ", g_databaseManager.userModel)
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


	static loadUserProfile() {
		ALERT("LOADING USER PROFILE...")
		const uid = AuthenticationManager.currentUser.uid
		DBG(uid)
		DatabaseManager.getUserRecord(
			uid,
			{
				onSuccess: (user) => {
					if (user.exists) {
						INFO("[onSuccess] user: ", user)
						const userData = user.data()
						g_databaseManager.userModel.setData({
							uid: userData.uid || null,
							username: userData.username || null,
							displayName: userData.displayName || null,
							profilePicture: userData.profilePicture || null,
							isMentee: userData.isMentee || null,
							fields: userData.fields || null,
							bio: userData.bio || null,
							email: userData.email || null,
							linkedIn: userData.linkedIn || null,
							skype: userData.skype || null,
						})
					}
				},
				onError: (err) => ERR("[loadProfile -> DatabaseManager.getUserRecord] err: ", err)
			}
		)
	}

	static loadUsers({
		onSuccess = () => {},
		onError = () => {},
	}) {

		firebase.firestore().collection("users").where("uid", "==", -5005)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					// console.log("entry: ", doc.id, " => ", doc.data());
					onSuccess(doc.data())
				});
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});

	}

	/**
	 * Search functions....
	 */
	
	static search({
		lhs,
		op,
		rhs,
		onSuccess,
		onError,
	}) {
		db.collection("users").where(lhs, op, rhs)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data());
				});
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
	}


	static _initialize() { /* ... */ }

}
	// ...
DatabaseManager._initialize()

const g_databaseManager = new DatabaseManager();