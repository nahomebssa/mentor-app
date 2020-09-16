import firebase from 'firebase'
import { ALERT, ERR, DBG } from '../utils'


export class FirebaseManager {
	static _initialize()
	{
		FirebaseManager.AuthResult = class {
			constructor({ result, error, }) {
				this.result = result;
				this.error = error;
			}
		}
	}
	static signInWithEmailAndPassword(email, password)
	{	
		const FNID = "[FirebaseManager#signInWithEmailAndPassword]\n";
		const TAB = "    "
		let res;
		
		const result = firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(result) {
			DBG("signInWithEmailAndPassword, HERE")
			res = new FirebaseManager.AuthResult({ result: result, error: null });
			ALERT(`${FNID}Signed in user:\n${result}`)
			DBG(result)
		}).catch(function(error) {
			res = new FirebaseManager.AuthResult({ result: null, error });
			ALERT(`${FNID}Error: couldn't sign in user\n${TAB}fberr: "${error}"`)
			ERR(FNID, error)
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});
		
		const isAuthResult = res instanceof FirebaseManager.AuthResult
		ALERT(`${FNID}res: ${res}\n${ isAuthResult ? "" : "not"} instanceof FirebaseManager.AuthResult`)
		return res;
	}
	
	// signInWithPopup(provider)
	static signInWithGoogle()
	{
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
	}
	
	static onAuthStateChanged()
	{
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				var displayName = user.displayName;
				var email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
				// ...
			} else {
				// User is signed out.
				// ...
			}
		});
	}
}
FirebaseManager._initialize();