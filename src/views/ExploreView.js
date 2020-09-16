import React, { useState } from 'react'
import { SearchManager } from '../controllers/SearchManager'
import { Badge, Card } from 'react-bootstrap'

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


for (let i = 1; i < 20; i++) {
    DB.users.push({
        username: `@user${i}`,
        name: `User ${i}`,
        email: `user${i}`,
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corporis quam, unde voluptate labore repellendus nisi facilis veniam. Laboriosam nulla fuga officia quidem sint qui odio amet pariatur quod corporis.",
        areaOfExpertise: (() => {
            let maxLen = Math.floor(Math.random() * 3)
            const index = () => Math.floor(Math.random() * FIELDS.length)
            const arr = []
            while (maxLen-- > 0) {
                arr.push(FIELDS[index()])
            }
            return arr;
        })(),
        rating: Math.floor(Math.random() * 5),
    })
}
console.log("DB", DB)

function SearchBox() {
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
            <div className="SearchBox flex fww fdc">
                <input
                    autoFocus
                    type="text"
                    value={this.state.text}
                    onChange={this.onChange.bind(this)} />
                <span style={{fontFamily:'monospace'}}>{this.state.text}</span>
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
        <div className="Rating flex">
            {
                [0, 1, 2, 3, 4].map((x, i) => {
                    return <i key={i} className={`material-icons ${(i < rating) ? "--filled" : "--empty"}`}>{iconName}</i>
                })
            }
        </div>
    )
}

function UserCard({user}) {
    const { name: displayName, bio, areaOfExpertise: tags, rating } = user
    return (
        <Card>
            <Card.Img variant="top" src="#" style={{minHeight:'30vh', background: 'slategrey'}} />
            <Card.Body>
                <Card.Title as={({...rest}) => <h3 {...rest} />}>{displayName}</Card.Title>
                <Card.Text>{bio}</Card.Text>
                <Rating rating={rating} />
                {
                    tags.map((t, i) => {
                        return (
                            <Badge variant="secondary" className="p-2 mr-2" key={i}>{t}</Badge>
                        )
                    })
                }
            </Card.Body>
        </Card>
    )
}

function SearchResults({ results }) {
    return (
        <div className="SearchResults flex fdc">
            {results.map((r, i) => {
                const result = { user: results[i] }
                return <UserCard key={i} user={result.user} />
            })}
        </div>
    )
}

export function ExploreView() {

    const _users = DB.users
    this.state = {
        searchText: "",
        searchResults: _users || [],
    }
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState("")

    return (
        <div className="ExploreView flex fdc">
            {/* <h1 className="title">Explore</h1> */}
            <SearchBox onTextChange={(text) => setSearchText(text)} />
            <button onClick={() => { SearchManager.userExist({ name: searchText }); }}>
                send data
            </button>
            <SearchResults results={searchResults} />

        </div>
    )
}