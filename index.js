const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var count = 0;



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*exports.helloWorld = functions.https.onRequest((request, response) => {
 	var send = count.toString(10);
 	response.send(send);
 	count++;
 	response.send(request.baseURL);
});*/


//Edit function to accept parameters of users information and replace sample user data with variables
exports.addUser = functions.https.onRequest((request ,response) => {
	var db = admin.firestore();
	let data =
	{
		name: 'Mr. Mentor',
		mentee: false,
		mentor: true,
		fields: 'CS',
		pword: '1234',
		uname: 'mentor',
		bio: 'Hello, I\'m Mister Mentor',
		experience: 2
	}
	let setDoc = db.collection('users').doc(data.uname).set(data);
	let end = response.send(data);
});

/*exports.login = functions.https.onRequest((request, response) => {
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
})*/
/*
exports.delUser = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	let delDoc = db.collection('users').doc('Test').delete();
})*/

//Edit parameters to accept a username variable and replace 'mentor' with the username variable
exports.userExist = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	var user = 'mentor'
	let update = db.collection('users').doc(user).get()
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

//Edit to accept a username to change the status of and replace 'Dunton James' with the variable
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

//Edit to accept a username to change the status of and replace 'Dunton James' with the variable
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

//Edit to accept parameter of field to search for and replace 'CS' with the variable
exports.findMentor = functions.https.onRequest((request, response) => {
	var db = admin.firestore();
	var mentors = [];
	var send = '';

	let users = db.collection('users');
	let query = users.where('mentor', '==', true).where('field','==','CS')get()
  	.then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      mentors.push(doc.data())
      send += doc.data().name + '\n';
    });
    response.send(mentors);
    return;
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
})

exports.getRequest = functions.https.onRequest((request, response) => {
	var sending = request.getAttribute("data-bool");
	response.send(sending);
}) 
