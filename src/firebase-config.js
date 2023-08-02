import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBzB3qqy77T5mitB_1nu1O9e8J4AlaLeIo",
    authDomain: "react-meals-94400.firebaseapp.com",
    databaseURL: "https://react-meals-94400-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-meals-94400",
    storageBucket: "react-meals-94400.appspot.com",
    messagingSenderId: "7792576365",
    appId: "1:7792576365:web:9756e11d846322b831fc64",
    measurementId: "G-QX4FNEBEY7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export default db;