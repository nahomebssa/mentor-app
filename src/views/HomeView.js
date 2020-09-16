import React, { Component } from 'react'
import { AuthenticationManager } from '../controllers/AuthenticationManager'
import { Redirect } from 'react-router-dom'

import {
    Button,
    Card
} from 'react-bootstrap'

export class HomeView extends Component {
    render() {
        const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
        if (isSignedOut) return <Redirect to="/sign-in" />
        return (
            <div className="HomeView">
                <h1 className="title">Home</h1>
                <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button href="/profile" variant="primary">Edit Profile</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button href="/explore" variant="primary">Search for a mentor</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}