class IAppController {
	
	/**
	 * 
	 */
	constructor() { /*  */ }

	/**
	 * 
	 * @param {AuthProvider} provider 
	 */
	createAccount({ provider })
	
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
	searchFor({ type, category, rating  })


}

class AppController {
	constructor() { /*  */ }
}