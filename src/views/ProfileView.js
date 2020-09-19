import React, { Component } from "react";
import firebase from "firebase";
import { DBG, ALERT } from "../utils";
// import { Redirect } from "react-router-dom";
// import { GridBox } from "../components";

const PageTitle = (props) => <h2 className="title">Edit Profile</h2>;

export class ProfileView extends Component {
    constructor(props) {
        super(props);
        const FNID = `[ProfileView#constructor]`;
        DBG(FNID, `props.profile: `, this.props.profile);

        // props passed in as attributes
        const { profile = {} } = this.props;

        // maintain the state of the profile view
        this.state = {
            // profile: props.profile || DEFAULT_PROFILE || { isEmptyProfile: true, }
            profile: profile || { isEmptyProfile: true },

            // ProfileForm
            iName: profile.name || "",
            iUsername: profile.username || "",
            iBio: profile.bio || "",
            iEmail: profile.email || "",
        };

        // ProfileForm
        this.saveChanges = this.saveChanges.bind(this);

        this.onProfileRefGet = this.onProfileRefGet.bind(this);
        this.onProfileRefGetError = this.onProfileRefGetError.bind(this);
        this.getProfile = this.loadProfile.bind(this);

        // get profile from firebase
        this.loadProfile();
    }

    onProfileUpdated() {
        alert("Your changes have been saved.");
    }

    // ProfileForm
    saveChanges() {
        const FNID = `[ProfileForm#saveChanges]`;
        // ALERT(`${FNID} SUCCESS \n${result}`)
        // DBG(FNID, result)

        const { name, bio } = this.state;
        ALERT(`saving changes...\nname: ${name}\nbio: ${bio}`);

        const user = firebase.auth().currentUser;
        // const { displayName, email, photoURL, emailVerified, uid } = user;
        const { uid } = user;
        user.updateProfile({
            displayName: this.state.name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
            .then(function () {
                // Update successful.
                ALERT(`${FNID} updated profile`);
            })
            .catch(function (error) {
                // An error happened.
                ALERT(`${FNID} failed to update profile`);
                DBG(FNID, error);
            });

        const db = firebase.firestore();
        const usersRef = db.collection("/users");
        const profileRef = usersRef.doc(uid);
        const newProfile = {
            // ...this.state.profile,
            name: this.state.iName,
            username: this.state.iUsername,
            bio: this.state.iBio,
            email: this.state.iEmail,
        };
        DBG(newProfile);
        profileRef.set(newProfile);

        this.onProfileUpdated();
    }
    // end ProfileForm

    onProfileRefGet(doc) {
        const thispv = this;
        const FNID = `[ProfileView#onProfileRefGet]`;
        if (doc.exists) {
            const profile = doc.data();
            thispv.setState({
                // name: firebase.auth().currentUser.displayName,
                profile,
                iName: profile.name,
                iUsername: profile.username,
                iBio: profile.bio,
                iEmail: profile.email,
            });
            this.forceUpdate();
            DBG(`${FNID} this.state.profile`, this.state.profile);
            // ALERT(`${FNID} doc exists`)
        } else {
            console.log("No such document 'doc.data()' defined!");
        }
    }

    onProfileRefGetError(error) {
        const FNID = `[ProfileView#onProfileRefGetError]`;
        console.log("Error getting document:", error);
        ALERT(`${FNID} Error getting document: ${error}`);
    }

    loadProfile() {
        if (!firebase.auth().currentUser) {
            ALERT("NO CURUSER");
            this.setState({ signedIn: false });
            return;
        }
        // const DEFAULT_PROFILE = { isDefaultProfile: true, name: "", bio: "" };
        const user = firebase.auth().currentUser;
        // const { displayName, email, photoURL, emailVerified, uid } = user || {};
        const { uid } = user || {};

        // const profileRef = firebase.firestore().collection("/users").doc(firebase.auth().currentUser)
        const db = firebase.firestore();
        const usersRef = db.collection("/users");
        const profileRef = usersRef.doc(uid);
        profileRef
            .get()
            .then(this.onProfileRefGet)
            .catch(this.onProfileRefGetError);

        DBG(`user: `, user);
    }

    render() {
        const MProfileForm = ({ ...rest }) => <div {...rest} />;
        const MLabel = ({ ...rest }) => (
            <label className="flex aifs" {...rest} />
        );
        MLabel.Left = ({ children }) => (
            <span style={{ width: "30%" }}>{children}</span>
        );
        // const { profile, signedIn } = this.state;
        const profView = (
            <div className="ProfileView">
                <div className="flex fdc">
                    <PageTitle />
                    {/* <ProfileForm
						profile={profile} /> */}
                    <MProfileForm className="profile-form flex fww">
                        <MLabel>
                            <MLabel.Left>Name</MLabel.Left>
                            <input
                                style={{ width: "70%" }}
                                type="text"
                                placeholder="Name"
                                value={this.state.iName}
                                onChange={(event) =>
                                    this.setState({ iName: event.target.value })
                                }
                            />
                        </MLabel>

                        <MLabel>
                            <MLabel.Left>Username</MLabel.Left>
                            <input
                                style={{ width: "70%" }}
                                type="text"
                                placeholder="Username"
                                value={this.state.iUsername}
                                onChange={(event) =>
                                    this.setState({
                                        iUsername: event.target.value,
                                    })
                                }
                            />
                        </MLabel>

                        <MLabel>
                            <MLabel.Left>Bio</MLabel.Left>
                            <textarea
                                style={{ width: "70%" }}
                                placeholder="Insert bio here..."
                                value={this.state.iBio}
                                onChange={(event) =>
                                    this.setState({ iBio: event.target.value })
                                }
                            />
                        </MLabel>

                        {/* <MLabel>
								<span style={{width: '30%'}}>Email</span>
								<input style={{width: '70%'}}
									type="email"
									placeholder="Email address"
									value={this.state.iEmail}
									onChange={(event) => this.setState({ iEmail: event.target.value })} />
							</label> */}
                        <div id="btns" className="flex ">
                            <input
                                className="btn btn-primary flex-1"
                                type="button"
                                onClick={(event) => {
                                    this.saveChanges();
                                }}
                                value="Save changes"
                            />
                        </div>
                    </MProfileForm>
                </div>
            </div>
        );

        // return signedIn ? profView : <Redirect to='/sign-in' />
        console.log(firebase.auth().currentUser);
        return profView;
    }
}
