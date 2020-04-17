const { Component } = React;

class SearchBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ""
		}
	}
	render() {
		return (
			<input value={this.state.text} onchanges />
		)
	}
}

class SearchResults extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}
	render()
	{
		return (
			<div className="SearchResults">

			</div>
		)
	}
}

class ExploreView extends Component {
	render () {
		return (
			<div className="ExploreView">
				<h1>Explore</h1>
				<SearchBox />
				<SearchResults />
			</div>
		)
	}
}