// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getMessaging } from 'firebase/messaging';

// const {
//   VITE_APP_API_KEY,
//   VITE_APP_AUTH_DOMAIN,
//   VITE_APP_PROJECT_ID,
//   VITE_APP_STORAGE_BUCKET,
//   VITE_APP_MESSENGER_SENDER_ID,
//   VITE_APP_APP_ID,
//   VITE_APP_MEASUREMENT_ID,
// } = import.meta.env;

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: VITE_APP_API_KEY,
//   authDomain: VITE_APP_AUTH_DOMAIN,
//   projectId: VITE_APP_PROJECT_ID,
//   storageBucket: VITE_APP_STORAGE_BUCKET,
//   messagingSenderId: VITE_APP_MESSENGER_SENDER_ID,
//   appId: VITE_APP_APP_ID,
//   measurementId: VITE_APP_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const messaging = getMessaging(app);

// export { analytics, messaging };



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ51lnFJrLmQ5kvLUAWRdirNIGP6xSGdY",
  authDomain: "clientmangementsystem.firebaseapp.com",
  projectId: "clientmangementsystem",
  storageBucket: "clientmangementsystem.appspot.com",
  messagingSenderId: "761518854232",
  appId: "1:761518854232:web:f6822f4a4d4ff3dc10fa2d",
  measurementId: "G-HHVGJENZD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };