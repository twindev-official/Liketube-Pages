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

// Your Site Key from reCAPTCHA Console
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfD-BYsAAAAAF3AH9TXZkG9t2NG6nuiT7p6xYIl'),
  isTokenAutoRefreshEnabled: true
});

const db = getFirestore(app);

// Test function - Call this to see if it works!
window.testDatabase = async function() {
    try {
        await addDoc(collection(db, "test_posts"), {
            message: "Hello from GitHub Pages!",
            time: Date.now()
        });
        alert("Success! Data sent to Firebase safely.");
    } catch (e) {
        alert("Error: " + e.message);
        console.error(e);
    }
}