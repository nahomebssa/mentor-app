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
	searchFor({ query, sortBy }) {}

}