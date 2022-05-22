import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeW6-i_pUvpyO5i_5UcKzm9Rtz0PDBOiw",
  authDomain: "socialmedia-e77be.firebaseapp.com",
  projectId: "socialmedia-e77be",
  storageBucket: "socialmedia-e77be.appspot.com",
  messagingSenderId: "104404305918",
  appId: "1:104404305918:web:1f689f43c19fbd46e2a2af",
  measurementId: "G-58Z2NDVXKX"
};

const app = initializeApp(firebaseConfig);

export default app