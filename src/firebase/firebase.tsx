import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBS2A1doB6z-H_PIJUeo3PRqCGhrQA7XZg",
    authDomain: "seriesnow.firebaseapp.com",
    databaseURL: "https://seriesnow.firebaseio.com",
    projectId: "seriesnow",
    storageBucket: "seriesnow.appspot.com",
    messagingSenderId: "910491154029",
    appId: "1:910491154029:web:636c044141f7f5d61cf164",
    measurementId: "G-G35B2GQNJ6"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;