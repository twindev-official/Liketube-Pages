import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setLogLevel, initializeFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; 

// --- CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7",
};

const app = initializeApp(firebaseConfig);

// --- DB SETUP ---
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true, 
});

const auth = getAuth(app);

// --- APP CHECK IS DISABLED FOR THIS TEST ---
// We must confirm the database works without security first.
// console.log("App Check is temporarily disabled for testing");

setLogLevel('debug'); 

// --- TEST FUNCTION ---
window.testDatabase = async function() {
    console.log("🚀 Starting Connection Test on GitHub Pages...");
    try {
        await addDoc(collection(db, "test_connection"), {
            msg: "Verifying API Status",
            url: window.location.href,
            time: Date.now()
        });
        alert("✅ SUCCESS! The Database API is ENABLED and working.");
    } catch (e) {
        console.error("❌ FAILED:", e);
        if (e.message.includes("Cloud Firestore API")) {
             alert("🚨 MAJOR ERROR: The API is still DISABLED. You must go to Google Cloud Console and click ENABLE.");
        } else if (e.code === 'permission-denied') {
             alert("❌ Permission Denied. Check Firestore Rules.");
        } else {
             alert("❌ Error: " + e.message);
        }
    }
};