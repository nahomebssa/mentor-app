import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import App from './App'
import {initializeApp} from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyCmE6rP0Vsuherr46YH8-OQ_SoRXyp6_gg",
	authDomain: "mentor-finder-app.firebaseapp.com",
	databaseURL: "https://mentor-finder-app.firebaseio.com",
	projectId: "mentor-finder-app",
	storageBucket: "mentor-finder-app.appspot.com",
	messagingSenderId: "223437150523",
	appId: "1:223437150523:web:3885fb7f8739c0d1a23f1e",
	measurementId: "G-KL1Q7SGE9T"
}
initializeApp(firebaseConfig)

render(<App />, document.getElementById('root'))