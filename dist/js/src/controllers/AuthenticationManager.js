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
			// constructor({ status, message }) {
			constructor({ result, error }) {
				this.result = result;
				this.error = error;
			}
		}
		AuthenticationManager._authState = AuthenticationManager.AuthState.SIGNEDOUT;
	}
	
	static signIn({
		provider = "",
		email = "",
		password = "",
		onSuccess = () => {},
		onFail = () => {},
	})
	{
		DBG("HERE", onSuccess)
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(onSuccess)
			.catch(onFail)

		return;
		let authRes;
		switch (provider) {
			case AuthenticationManager.AuthProvider.EMAIL:
				// if (!AuthenticationManager._checkEmailAndPassword(email, password))
				// {
				// 	throw new Error("[AuthenticationManager#signIn] Invalid email or password, from _checkEmailAndPassword")
				// }
				// const signInAuthResult = FirebaseManager.signInWithEmailAndPassword(email, password)
				const { result, error } = FirebaseManager.signInWithEmailAndPassword(email, password)
				authRes = new AuthenticationManager.AuthResult({ result, error });
				break;
			case AuthenticationManager.AuthProvider.GOOGLE:
				FirebaseManager.signInWithGoogle();
				break;
			default:
				authRes = new AuthenticationManager.AuthResult({ result: null, error: null });
				ALERT("[AuthenticationManager#signIn] Error: No provider was specified.")
				ERR("[AuthenticationManager#signIn] Error: No provider was specified.")
				ALERT(`[AuthenticationManager#signIn] Provider: ${provider.constructor.name} ${provider}`)
				ERR(`[AuthenticationManager#signIn] Provider: ${provider.constructor.name} ${provider}`)
				break;
		}
		return authRes;
	}
}

AuthenticationManager._initialize();

// class AuthenticationManager {

// 	/**
// 	 * Assumes existence of:
// 	 * 	- User class
// 	 */

// 	_init()
// 	{
// 		AuthenticationManager.AuthProvider = ENUM({
// 			EMAIL: `AuthProvider.EMAIL`,
// 			GOOGLE: `AuthProvider.GOOGLE`,
// 			LINKEDIN: `AuthProvider.LINKEDIN`,
// 		})
// 		AuthenticationManager.AuthResult = class {
// 			constructor({ status, message }) {

// 			}
// 		}
// 		AuthenticationManager.AuthError = class extends Error {
// 			constructor({ message }) {}
// 		}
// 	}

// 	/**
// 	 * Class Variables
// 	 * currentUser: null
// 	 */
// 	constructor({ /* ... */ }) {}

// 	createAccount() {}
	
// 	signIn({
// 		provider = AuthenticationManager.AuthProvider.GOOGLE,
// 		username = "",
// 		password = ""
// 	}) {
// 		// const { EMAIL, GOOGLE } = AuthenticationManager.AuthProvider
// 		// switch (provider) {
// 		// 	case EMAIL:

// 		// 		break;
// 		// 	case GOOGLE:
// 		// 		break;
// 		// 	default:
// 		// 		break;
// 		// }
// 		return new AuthenticationManager.AuthResult({ status: OK })
// 	}
// 	signOut() {}
// 	signOut() {}
// }