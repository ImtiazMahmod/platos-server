// import { initializeApp } from "firebase/app";

const { initializeApp } = require("firebase/app")
const firebaseConfig = require('./firebase.config')

const initApp = initializeApp(firebaseConfig);


module.exports =   initApp