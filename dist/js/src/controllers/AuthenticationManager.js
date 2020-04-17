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
			constructor({ value, error }) {
				this.value = value;
				this.error = error;
			}
		}
		AuthenticationManager._authState = AuthenticationManager.AuthState.SIGNEDOUT;
	}
	
	static signIn({ provider = "", email = "", password = "" })
	{
		let authRes;
		switch (provider) {
			case AuthenticationManager.AuthProvider.EMAIL:
				// if (!AuthenticationManager._checkEmailAndPassword(email, password))
				// {
				// 	throw new Error("[AuthenticationManager#signIn] Invalid email or password, from _checkEmailAndPassword")
				// }
				// const signInAuthResult = FirebaseManager.signInWithEmailAndPassword(email, password)
				const { value, error } = FirebaseManager.signInWithEmailAndPassword(email, password)
				authRes = new AuthenticationManager.AuthResult({ value, error });
				break;
			case AuthenticationManager.AuthProvider.GOOGLE:
				FirebaseManager.signInWithGoogle();
				break;
			default:
				authRes = new AuthenticationManager.AuthResult({ value: null, error: null });
				alert("[AuthenticationManager#signIn] Error: No provider was specified.")
				console.error("[AuthenticationManager#signIn] Error: No provider was specified.")
				alert(`[AuthenticationManager#signIn] Provider: ${provider.constructor.name} ${provider}`)
				console.error(`[AuthenticationManager#signIn] Provider: ${provider.constructor.name} ${provider}`)
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