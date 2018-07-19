import rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const HN_DATABASE_URL = 'https://hacker-news.firebaseio.com';
const HN_VERSION = 'v0';

let app = firebase.initializeApp(
  {databaseURL : HN_DATABASE_URL},
  'hackernews'
);

let db = firebase.database(app);
let base = rebase.createClass(db);

// Api is a wrapper around base, to include the version child path to the binding automatically.
const Api = {
/**
 * One way data binding from Firebase to a component's state.
 * @param {string} endpoint
 * @param {object} options
 * @return {Promise} A firebase object which resolves when the write is complete and rejects
 * if there is an error
 */

 fetch(endpoint, options) {
   return base.fetch(`/${HN_VERSION}${endpoint}`, options);
 },
}

export default Api;