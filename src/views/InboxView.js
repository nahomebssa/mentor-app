import React, { Component } from "react";
import firebase from "firebase";

export class InboxView extends Component {
    render() {
        console.log(firebase.auth().currentUser);
        return (
            <div className="InboxView flex" style={{ height: "100%" }}>
                <div className="coming-soon flex-1 flex aic jcc">
                    <p>Coming soon...</p>
                </div>
            </div>
        );
    }
}
