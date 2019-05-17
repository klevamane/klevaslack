import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"; 
im

 var firebaseConfig = {
    apiKey: "AIzaSyACwKYJqve8RlHh74mEee2shNQXPma9wGw",
    authDomain: "slack-clone-3b98b.firebaseapp.com",
    databaseURL: "https://slack-clone-3b98b.firebaseio.com",
    projectId: "slack-clone-3b98b",
    storageBucket: "slack-clone-3b98b.appspot.com",
    messagingSenderId: "832465399208",
    appId: "1:832465399208:web:b82b07bdc0104a67"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase; 
