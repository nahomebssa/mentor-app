import React, { createContext, useState, useContext } from 'react'
import firebase from 'firebase'

const AuthContext = createContext()
export const AuthProvider = ({ ...rest }) => {

	const [authState, setAuthState] = useState('signed-out')
	const isSignedIn = () => authState !== 'signed-out' && firebase.auth().currentUser !== null

	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			// User is signed in.
			setAuthState('signed-in')
		} else {
			// No user is signed in.
			// setAuthState('signed-out')
		}
	})

	const Firebase = {
		signIn({ provider, credentials, onFail, onPass, }) {
			const { email, password } = credentials
			switch (provider) {
				case 'EMAIL':
					firebase.auth().signInWithEmailAndPassword(email, password)
						.catch((...rest) => {
							onFail(...rest)
						})
						.then((...rest) => {
							setAuthState('signed-in')
							// console.log('[AuthView#handleSignIn] signed in!')
							onPass(...rest)
						})
					break;
				default:
					break;
			}
		},
		signOut() {
			setAuthState('signed-out')
		},
	}
	const { signIn, signOut } = Firebase

	const providerValue = { authState, signIn, signOut, /* isSignedIn */ }  // FIXME: Remove 'setAuthState' dependencies
	return <AuthContext.Provider value={providerValue} {...rest} />
}
export const useAuth = () => useContext(AuthContext)


export class FirebaseProvider {
	static get EMAIL() { return 'EMAIL' }
}