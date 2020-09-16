export { AuthenticationManager } from './AuthenticationManager'
export { FirebaseManager } from './FirebaseManager'
export { InboxManager } from './InboxManager'
export { ProfileManager } from './ProfileManager'
export { SearchManager } from './SearchManager'

class IAppController {
	
	/**
	 * 
	 */
	constructor() { /*  */ }

	/**
	 * 
	 * @param {AuthProvider} provider 
	 */
	createAccount({ provider }) {}
	
	/**
	 * 
	 * @param {AuthProvider} provider 
	 */
	signIn({ provider, username, password }) {}
	
	/**
	 * 
	 */
	signOut() {}

	/**
	 * 
	 * @param {*} user
	 * @param {*} profilePic
	 * @param {*} name
	 * @param {*} bio
	 */
	editProfile({ user, profilePic, name, bio }) {}

	/**
	 * 
	 * @param {*} type
	 * @param {*} category
	 * @param {*} rating
	 */
	searchFor({ type, category, rating  }) {}


}

class AppController {
	constructor() {
		this._searchManager = null
		this._authManager = null
	}

	AuthManager() {
		return this._authManager
	}
}