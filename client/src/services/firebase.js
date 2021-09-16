import { initializeApp } from "firebase/app";
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFJxIRc5mcmVcqiGxPV6mQxzbt0tnpvbI",
  authDomain: "social-media-v2-84274.firebaseapp.com",
  projectId: "social-media-v2-84274",
  storageBucket: "social-media-v2-84274.appspot.com",
  messagingSenderId: "187457581267",
  appId: "1:187457581267:web:f1fb0b4cdda4777c10a426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)
export {storage,ref,uploadBytes,getDownloadURL}
