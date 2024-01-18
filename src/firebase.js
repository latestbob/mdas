// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore, CACHE_SIZE_UNLIMITED, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyAVxXMRjZ5oeujuXGvbl-nu60uoUbmJoBk",
    authDomain: "emdacenter.firebaseapp.com",
    projectId: "emdacenter",
    storageBucket: "emdacenter.appspot.com",
    messagingSenderId: "564145106911",
    appId: "1:564145106911:web:996dcc21531578178fde6a",
    measurementId: "G-K08ZVN5G6N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//const db = getFirestore(app);

// const db = initializeFirestore(app, {
//     cacheSizeBytes: CACHE_SIZE_UNLIMITED,
//   });

const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
      settings: {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
      },
    }),
  });

  const auth = getAuth(app);


export {auth, db};