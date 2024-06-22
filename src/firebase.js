// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mern-estate-4e89d.firebaseapp.com",
  projectId: "mern-estate-4e89d",
  // storageBucket: "mern-blog-b327f.appspot.com",
  storageBucket: "mern-estate-4e89d.appspot.com",
  messagingSenderId: "11007302888",
  appId: "1:11007302888:web:e3d232a01659511033bd5d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//         request.resource.size < 2 * 1024 * 1024 &&
//         request.resource.contentType.matches('image/.*')
//       }
//     }
//   }