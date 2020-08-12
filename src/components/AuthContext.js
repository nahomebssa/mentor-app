import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()
export const AuthProvider = ({ ...rest }) => {
	const [authState, setAuthState] = useState()
	const signIn = ({ provider, credentials }) => {
		const { email, password } = credentials
		switch (provider) {
			case 'EmailAndPassword':
				setAuthState('signed-in')
				break;
			default:
				break;
		}
	}
	const signOut = () => {
		setAuthState('signed-out')
	}
	const providerValue = { authState, signIn, signOut }
	return <AuthContext.Provider value={providerValue} {...rest} />
}
export const useAuth = () => useContext(AuthContext)