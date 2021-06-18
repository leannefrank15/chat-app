import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'

const config = {
  apiKey: "AIzaSyBKoRzMEzTwyzWQEspAUz8Sat7td1Nckdk",
    authDomain: "chat-web-app-dbc9c.firebaseapp.com",
    projectId: "chat-web-app-dbc9c",
    storageBucket: "chat-web-app-dbc9c.appspot.com",
    messagingSenderId: "415675181059",
    appId: "1:415675181059:web:c5941d5f2bc13e46b2c636"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();