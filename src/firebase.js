import firebase from "firebase";
import 'firebase/auth'
 export const auth = firebase.initializeApp( {
  apiKey: "AIzaSyAHNPaxfqvhdz6zGL608JfNeH3Iqy2BZl4",
  authDomain: "unichat-6af77.firebaseapp.com",
  projectId: "unichat-6af77",
  storageBucket: "unichat-6af77.appspot.com",
  messagingSenderId: "987641996377",
  appId: "1:987641996377:web:3fce97d1a0cec11df17d48"
}).auth();