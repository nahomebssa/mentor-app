class SearchManager {
	
	// Query({ /* ... */ })
	// Result({ /* ... */ })

	_init() {
		SearchManager.SearchQuery = class {}
		SearchManager.SearchResult = class {}
	}

	/**
	 * Class variables
	 * _results: []
	 */
	constructor({ /* ... */ }) {}

	/**
	 * 
	 * @param {SearchManager.Query} query
	 * @param {SearchManager.SortType} sortBy
	 * @returns {SearchManager.Result} ...
	 */
	static searchFor({ query, sortBy }) {}

	static userExist({ name }) {
		var db = firebase.firestore();
		let update = db.collection('users').doc('Dunton James').get()
		  .then(doc => {
		if (!doc.exists) {
		  alert('No such document!');
		  response.send('No such document!');
		} else {
		  console.log(name, 'Document data:', doc.data());
		  response.send(doc.data());
		}
		return;
	  })
	  .catch(err => {
		console.log('Error getting document', err);
	  });
	}

	static searchByField({
		field = undefined,
		onSuccess = () => {},
		onError = () => {},
	 }) {
		if (field == undefined) throw new Error("[searchByField] Field is undefined")
		firebase.firestore().collection("users").where("fields", "array-contains", field)
			.get()
			.catch(onError)
			.then(onSuccess)
	}

}