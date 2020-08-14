import firebase from "firebase/app";
import "firebase/storage"

// fill in and setup needed!!
const firebaseConfig = {
  apiKey: "AIzaSyDScTxX-bFnsHTSQIrp3lDm_ioULzT6B_o",
  authDomain: "pocket-broker-f8f82.firebaseapp.com",
  databaseURL: "https://pocket-broker-f8f82.firebaseio.com",
  projectId: "pocket-broker-f8f82",
  storageBucket: "pocket-broker-f8f82.appspot.com",
  messagingSenderId: "318698226784",
  appId: "1:318698226784:web:cc2a8eba214884caa56f05",
  measurementId: "G-K9TH21TG95"
};

// Firebase Init
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// May not need for storing images
const storage = firebase.storage();

export {storage, firebase as default };
