 /*
 <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
*/


import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyDtcKXhRPl6ByJYv8AA9n8lMDDrIyCObvw",
    authDomain: "api-6421642098094677721-516031.firebaseapp.com",
    projectId: "api-6421642098094677721-516031",
    storageBucket: "api-6421642098094677721-516031.appspot.com",
    messagingSenderId: "599621067826",
    appId: "1:599621067826:web:ddbb1a04368c97c663882b",
    measurementId: "G-MMSMVDB9L6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };