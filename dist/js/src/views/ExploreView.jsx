const DB = {
	users: []
}

function DB_INIT() {
	const FIELDS = [
		"IT & Computer Science",
		"Biology",
		"Physics",
		"Accounting",
		"Health & Medicine",
		"Educator"
	]
	for (let i = 1; i < 20; i++)
	{
		DB.users.push({
			username: `@user${i}`,
			name: `User ${i}`,
			email: `user${i}`,
			bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corporis quam, unde voluptate labore repellendus nisi facilis veniam. Laboriosam nulla fuga officia quidem sint qui odio amet pariatur quod corporis.",
			areaOfExpertise: (() => {
				let maxLen = Math.floor(Math.random() * 3)
				const index = () => Math.floor(Math.random() * FIELDS.length)
				const arr = []
				while (maxLen-- > 0)
				{
					arr.push(FIELDS[index()])
				}
				return arr;
			})(),
			rating: Math.floor(Math.random() * 5),
		})
	}
	// LOG("DB", DB)
}


class SearchBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ""
		}
	}
	
	onChange = (event) => {
		this.setState({ text: event.target.value });
		this.props.onTextChange(event.target.value);
	}

	btnSearchClickHandler(event) {
		ALERT("clicked search")
		this.props.onSearch(this.state.text)
	}

	render() {
		return (
			<div className="SearchBox">
				<input
					autoFocus
					type="text"
					value={this.state.text}
					onChange={this.onChange.bind(this)} />
				<input className="btn btn-primary material-icons"
					type="submit"
					value="search"
					onClick={this.btnSearchClickHandler.bind(this)} />
			</div>
		)
	}
}

const Rating = (props) => {
	
	const MAX_RATING = 5

	const {
		rating = 0,
		iconName = 'star'
	} = props

	// (rating % MAX_RATING)

	return (
		<div className="Rating">
			{
				[0, 1, 2, 3, 4].map((x, i) => {
					return <i key={i} className={`material-icons ${(i < rating) ? "--filled" : "--empty" }`}>{iconName}</i>
				})
			}
		</div>
	)
}

class UserCard extends Component {
	constructor(props) {
		super(props)
		if (this.props.user == null) throw new Error("[UserCard#constructor] No required prop 'user' found.")
		this.state = {
			user: this.props.user || {}
		}
	}
	render() {

		const {
			user
		} = this.state

		// const {
		// 	name: displayName,
		// 	bio,
		// 	areaOfExpertise: tags = ['tag1', 'tag2'],
		// 	rating,
		// } = user
		const {
			displayName,
			bio,
			fields = ['tag1', 'tag2'],
			rating = 5,
		} = user

		return (
			<div className="UserCard">
				<div className="img">
					<img src="#" alt="Profile picture"/>
				</div>
				<div className="details">
					<h1>{displayName}</h1>
					<p>{bio}</p>
					<Rating rating={rating} />
					<div>
						{
							fields.map((t, i) => {
								return (
									<span className="badge badge-secondary" key={i}>
										{t}
									</span>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

class SearchResults extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			results: this.props.results || []
		}
	}
	render() {
		DBG("rendering search results: ", this.state)
		// ALERT("rendering search results")
		return (
			<div className="SearchResults">
				{
					this.state.results.map( (r, i) => {
						const result = {user: this.state.results[i]}
						return (
							<UserCard
								key={i}
								user={result.user} />
						)
					})
				}
			</div>
		)
	}
}

class ExploreView extends React.Component {
	
	constructor(props) {
		super(props)
		const _users = DB.users
		this.state = {
			searchText: "",
			searchResults: _users || [],
			searchResults: [],
			users: [],
		}
		
	}
	
	componentDidMount() {
		DatabaseManager.loadUsers({
			onSuccess: (user) => {
				DBG("got user: ", user)
				this.setState({ users: [ ...this.state.users, user ], searchResults: [ ...this.state.users, user ] })
			},
			onError: (err) => { ERR("[EVmount] cant load users, err: ", err) },
		})
	}

	onSearchHandler(res) {
		DBG("res: ", res)
		ALERT("EV: ok, searching...")
		// SearchManager.searchByField({
		// 	field: this.state.searchText,
		// 	onSuccess: (res) => {
		// 		DBG("filtered result: ", user)
		// 		ALERT("Found the filtered result (see console)")
		// 		if (!res.empty) {
		// 			this.setState({ searchResults: res.docs.map( doc => doc.exists ? null : null ) })
		// 		}
		// 	},
		// 	onError: (err) => { ERR("[onSearchHandler] err: ", err) },
		// });
		this.setState({
			searchResults: this.state.users.map( (user, i) => (user.fields[0].startsWith(this.state.searchText)) )
		})
	}

	render () {
		DBG("rendering search results: ", this.state)
		return (
			<div className="ExploreView">
				{/* <h1 className="title">Explore</h1> */}
				<SearchBox
					onTextChange={ text => this.setState({ searchText: text })}
					onSearch={ this.onSearchHandler.bind(this) } />
				{/* <SearchResults
					results={this.state.searchResults} /> */}
				<div className="SearchResults">
					{ this.state.searchResults.map( (user, i) => <UserCard key={i} user={user} />) }
				</div>
				
			</div>
		)
	}
}

// DB_INIT()