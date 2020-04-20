const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var count = 0;



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 	var send = count.toString(10);
 	response.send(send);
 	count++;
 	response.send(request.baseURL);
});

exports.addUser = functions.https.onRequest((request ,response) => {
	var db = admin.firestore();
	let data = {
  		name: 'Dunton James',
  		mentee: true,
  		mentor: false,
  		fields: ['CS'],
  		pword: 'password',
  		uname: 'djames21'
	};
	let setDoc = db.collection('users').doc(data.name).set(data);
	let end = response.send(data);
});

exports.delUser = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	let delDoc = db.collection('users').doc('Test').delete();
})

exports.userExist = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	let update = db.collection('users').doc('Dunton James').get()
  	.then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
      response.send('No such document!');
    } else {
      console.log('Document data:', doc.data());
      response.send(doc.data());
    }
    return;
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
})

exports.changeMentor = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	let update = db.collection('users').doc('Dunton James').get()
  	.then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
      response.send('No such document!');
    } else {
      console.log('Mentor:', doc.data().mentor);
      let change = doc.data().mentor;
      let updateMent = db.collection('users').doc('Dunton James').update({mentor:!change});
      response.send(!change);
    }
    return;
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
})

exports.changeMentee = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	let update = db.collection('users').doc('Dunton James').get()
  	.then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
      response.send('No such document!');
    } else {
      console.log('Mentor:', doc.data().mentee);
      let change = doc.data().mentee;
      let updateMent = db.collection('users').doc('Dunton James').update({mentee:!change});
      response.send(!change);
    }
    return;
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
})

exports.getRequest = functions.https.onRequest((request, response) => {
	var sending = request.getAttribute("data-bool");
	response.send(sending);
}) 
