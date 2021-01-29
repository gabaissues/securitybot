const firebase = require('firebase')

var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: "https://security-bot-7f5da.firebaseio.com",
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database()

module.exports = { database }