import React, { Component } from "react";
// import { AuthenticationManager } from "../controllers/AuthenticationManager";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

import { Button, Card } from "react-bootstrap";

export class HomeView extends Component {
    render() {
        console.log(firebase.auth().currentUser);
        // const isSignedOut = (AuthenticationManager._authState == AuthenticationManager.AuthState.SIGNEDOUT)
        const isSignedOut = firebase.auth().currentUser == null;
        if (isSignedOut) return <Redirect to="/sign-in" />;
        return (
            <div className="HomeView">
                {/* <h1 className="title">Home</h1> */}
                <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        {/* <Card.Title>Card Title</Card.Title> */}
                        <Card.Text>
                            Quickly share a couple of details about yourself.
                            Let them know who you are!
                        </Card.Text>
                        <Button href="/profile" variant="primary">
                            Edit Profile
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        {/* <Card.Title>Card Title</Card.Title> */}
                        <Card.Text>
                            Your professor breezed through the lecture? You
                            didn't figure out the answer to your question? Have
                            a degree but don't know what to do with it? I've got
                            you covered.
                        </Card.Text>
                        <Button href="/explore" variant="primary">
                            Search for a mentor
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
