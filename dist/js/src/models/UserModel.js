class UserModel extends Model {
	
	constructor({
		uid = Model.UNKOWNN,
		username = null,
		displayName = null,
		profilePicture = null,
		isMentee = false,
		fields = [],
		email = null,
		linkedIn = null,
		skype = null,
	}) {
		super()
		this.data = {
			uid, username, displayName, profilePicture, isMentee, fields, email, linkedIn, skype
		}
	}
	get uid() { return this.data.uid }
	get username() { return this.data.username }
	get displayName() { return this.data.displayName }
	get profilePicture() { return this.data.profilePicture }
	get isMentee() { return this.data.isMentee }
	get fields() { return this.data.fields }
	get email() { return this.data.email }
	get linkedIn() { return this.data.linkedIn }
	get skype() { return this.data.skype }

	setData(newData) {
		DBG("setting new data", newData)
		this.data = { ...this.data, ...newData }
	}
	


	toJSON(){
		return {
			...this.data
		}
	}
}

// displayName
// email
// emailVerified
// isAnonymous
// metadata
// multiFactor
// phoneNumber
// photoURL
// providerData
// providerId
// refreshToken
// tenantId
// uid