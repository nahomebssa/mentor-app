import firebase from 'firebase'
import {ERR, DBG} from '../utils'

const FSC_USERS = "users"

export class SearchManager {

    static SearchQuery = class { }
    static SearchResult = class { }

    /**
     * Class variables
     * _results: []
     */
    constructor({ /* ... */ }) { }

    /**
     * 
     * @param {SearchManager.Query} query
     * @param {SearchManager.SortType} sortBy
     * @returns {SearchManager.Result} ...
     */
    static searchFor({ query, sortBy, callback }) {

        const collectionFilter = ['', '', '']
        const db = firebase.firestore()
        db.collection('users').where(...collectionFilter).get().catch(console.error).then(snap => {
            // snap.forEach(s => users.push(s))
            // console.log('users', users)
        })


    }

    static userExist({ name }) {
        var db = firebase.firestore();
        let update = db.collection('users').doc('Dunton James').get()
            .then(doc => {
                if (!doc.exists) {
                    alert('No such document!');
                    // response.send('No such document!');  // FIXME:
                } else {
                    console.log(name, 'Document data:', doc.data());
                    // response.send(doc.data());  // FIXME: 
                }
                return;
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

}