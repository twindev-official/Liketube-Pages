import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-check.js";

// Your Config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7"
};

const app = initializeApp(firebaseConfig);

self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; 

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfD-BYsAAAAAF3AH9TXZkG9t2NG6nuiT7p6xYIl'),
  isTokenAutoRefreshEnabled: true
});

const db = getFirestore(app);

window.testDatabase = async function() {
    console.log("1. Starting test..."); // Debug Log
    try {
        console.log("2. Sending request..."); // Debug Log
        
        // This is likely where it was getting stuck
        await addDoc(collection(db, "test_posts"), {
            message: "Hello from Localhost!",
            time: Date.now()
        });
        
        console.log("3. Success!"); // Debug Log
        alert("Success! Data sent to Firebase.");
    } catch (e) {
        console.error("ERROR:", e);
        alert("Error: " + e.message);
    }
}