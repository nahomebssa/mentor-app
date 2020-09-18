import React, { useState } from 'react'
import { SearchManager } from '../controllers/SearchManager'
import { Badge, Card } from 'react-bootstrap'
import { fakedb as DB, range } from '../utils'

function SearchBox({ onTextChange }) {
    const [value, setValue] = useState("")
    const onChange = (event) => {
        setValue(event.target.value)
        onTextChange(event.target.value);
    }
    return (
        <div className="SearchBox flex fww fdc">
            <input type="text" value={value} onChange={onChange} autoFocus />
            <span style={{fontFamily:'monospace'}}>{value}</span>
        </div>
    )
}

const Rating = ({ value, iconName }) => {
    const MAX_RATING = 5
    return (
        <div className="Rating flex">
            {
                range(MAX_RATING).map((x, i) => {
                    return <i key={i} className={`material-icons ${(i < value) ? "--filled" : "--empty"}`}>{iconName}</i>
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
                <Rating value={rating} />
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
    const [searchText, setSearchText] = useState("")
    const [searchResults, setSearchResults] = useState(DB.users || [])
    const handleClick = () => {
        // SearchManager.userExist({ name: searchText })
        SearchManager.searchFor({ query: searchText })
        console.log()
    }
    return (
        <div className="ExploreView flex fdc">
            <SearchBox onTextChange={(text) => setSearchText(text)} />
            <button onClick={handleClick}>
                send data
            </button>
            <SearchResults results={searchResults} />
        </div>
    )
}