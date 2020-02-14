import firebase from "firebase";
import { FIREBASE_API_KEY } from "../API/ApiKeys"

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
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
