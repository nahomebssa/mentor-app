import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
// import './styles/index.css'
// import './styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { App } from './components/App.js'
import * as serviceWorker from './serviceWorker'
import * as firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyCmE6rP0Vsuherr46YH8-OQ_SoRXyp6_gg",
	authDomain: "mentor-finder-app.firebaseapp.com",
	databaseURL: "https://mentor-finder-app.firebaseio.com",
	projectId: "mentor-finder-app",
	storageBucket: "mentor-finder-app.appspot.com",
	messagingSenderId: "223437150523",
	appId: "1:223437150523:web:3885fb7f8739c0d1a23f1e",
	measurementId: "G-KL1Q7SGE9T"
};
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
