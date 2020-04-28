class AuthenticationManager {

	static _checkEmailAndPassword(email, password)
	{
		if (email && password)
		{
			if (email.includes("@") && email.includes("."))
				return true;
		}
		return false;
	}

	static setAuthState(state)
	{
		AuthenticationManager._authState = AuthenticationManager.AuthState.SIGNEDIN
	}

	static get currentUser() {
		return firebase.auth().currentUser
	}

	static _initialize() {
		AuthenticationManager.AuthState = ENUM({
			SIGNEDIN: "AuthState.SIGNEDIN",
			SIGNEDOUT: "AuthState.SIGNEDOUT",
			GUESTMODE: "AuthState.GUESTMODE",
		})
		AuthenticationManager.AuthProvider = ENUM({
			EMAIL: "AuthProvider.EMAIL",
			GOOGLE: "AuthProvider.GOOGLE",
		})
		AuthenticationManager.AuthResult = class {
			constructor({ result, error }) {
				this.result = result;
				this.error = error;
			}
		}
		AuthenticationManager._authState = AuthenticationManager.AuthState.SIGNEDOUT;
	}
	
	static signUp({
		provider = "",
		email = "",
		password = "",
		userData = null,
		onSuccess = () => {},
		onFail = () => {},
	}) {
		if (provider === AuthenticationManager.AuthProvider.EMAIL) {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.catch((error) => { AuthenticationManager._signUpFail(error, onFail) })
				.then((result) => { AuthenticationManager._signUpSuccess(result, userData, onSuccess) })
		}
	}

	static _signUpSuccess(prev, userData, next) {
		DBG("Signup success prev: ", prev || "prev")
		console.log("prev.user.uid: ", prev.user.uid)
		DatabaseManager.createUser(prev.user.uid, userData)
		next(prev)
	}
	static _signUpFail(prev, next) {
		DBG("Signup failed...")
		next(prev)
	}


	static signIn({
		provider = "",
		email = "",
		password = "",
		onSuccess = () => {},
		onFail = () => {},
	})
	{
		if (provider === AuthenticationManager.AuthProvider.EMAIL) {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => { AuthenticationManager._signInSuccess(onSuccess) })
			.catch(() => { AuthenticationManager._signInFail(onFail) })
		}

	}

	static _signInSuccess(next) {
		AuthenticationManager._makeUserModel()
		next()
	}
	static _signInFail(next) {
		// ...
		next()
	}

	static _makeUserModel(user = null) {
		firebase.auth().onAuthStateChanged( _ => {
			const db = firebase.firestore();
			const { uid } = user || AuthenticationManager.currentUser
			db.collection('users').doc(uid).get()
				.then(user => {
					if (user.exists) {
						const userData = user.data()
						console.log('Document data:', userData);
						g_databaseManager.userModel.setData({
							uid: user.data().uid || null,
							username: user.data().username || null,
							displayName: user.data().displayName || "",
							profilePicture: user.data().profilePicture || null,
							isMentee: user.data().isMentee || false,
							fields: user.data().fields || [],
							email: user.data().email || null,
							linkedIn: user.data().linkedIn || null,
							skype: user.data().skype || null,
						})
						console.log("userModel: ", g_databaseManager.userModel)
					}
				})
				.catch(err => {
					DBG('Error getting document', err);
					ALERT('Error getting document');
				});
		});
	}

	static authStateChanged(fn) {
		firebase.auth().onAuthStateChanged(fn);
	}

}

	AuthenticationManager.AuthState = {
		SIGNEDIN: "AuthState.SIGNEDIN",
		SIGNEDOUT: "AuthState.SIGNEDOUT",
		GUESTMODE: "AuthState.GUESTMODE",
	}
	AuthenticationManager.AuthProvider = {
		EMAIL: "AuthProvider.EMAIL",
		GOOGLE: "AuthProvider.GOOGLE",
	}
	AuthenticationManager.AuthResult = class {
		constructor({ result, error }) {
			this.result = result;
			this.error = error;
		}
	}
	AuthenticationManager._authState = AuthenticationManager.AuthState.SIGNEDOUT;
AuthenticationManager._initialize();
