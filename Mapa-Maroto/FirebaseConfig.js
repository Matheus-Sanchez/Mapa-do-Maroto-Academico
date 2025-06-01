// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Platform } from 'react-native';

import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from "@react-native-firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDvEu0zqgTmgr2wqV1uC5HmOUxIZ7jsUeY",
  authDomain: "mapamaroto-cccf3.firebaseapp.com",
  projectId: "mapamaroto-cccf3",
  storageBucket: "mapamaroto-cccf3.firebasestorage.app",
  messagingSenderId: "278319290845",
  appId: "1:278319290845:web:4062618ff6308b9dfcfe34",
  measurementId: "G-90VQ3X9M2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
}else{
  auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    }
  );
}

const db = getFirestore(app);
export {app, db, auth}
