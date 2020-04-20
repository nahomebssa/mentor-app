const DB = {
	users: []
}

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
console.log("DB", DB)

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

	render() {
		return (
			<div className="SearchBox">
				<input
					autoFocus
					type="text"
					value={this.state.text}
					onChange={this.onChange.bind(this)} />
				<span className="test-output">{this.state.text}</span>
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
	render()
	{

		const {
			user
		} = this.state

		const {
			name: displayName,
			bio,
			areaOfExpertise: tags = ['tag1', 'tag2'],
			rating,
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
							tags.map((t, i) => {
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
	render()
	{
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
		}
	}

	render () {
		return (
			<div className="ExploreView">
				{/* <h1 className="title">Explore</h1> */}
				<SearchBox
					onTextChange={(text) => this.setState({ searchText: text })} />
				<SearchResults
					results={this.state.searchResults} />

			</div>
		)
	}
}