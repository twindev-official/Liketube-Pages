// ==========================================
// 1. IMPORTS (Standardized to v11.0.2)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setLogLevel } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; 
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-check.js";

console.log("Modules loaded successfully"); // Check console for this

// ==========================================
// 2. CONFIGURATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7",
};

// ==========================================
// 3. INITIALIZATION (Production Ready)
// ==========================================
const app = initializeApp(firebaseConfig);

// Keep this to see WHY it fails in the browser console
setLogLevel('debug'); 

const db = getFirestore(app);
const auth = getAuth(app);

// Initialize App Check WITHOUT the debug token line
const appCheck = initializeAppCheck(app, {
  // Ensure this Key is correct!
  provider: new ReCaptchaV3Provider('6LeaIhosAAAAAEVskUAHLp8hJpVkfS3BW0UFKppV'), 
  isTokenAutoRefreshEnabled: true
});

console.log("Firebase initialized (Production Mode)");

// ==========================================
// 4. AUTHENTICATION LOGIC
// ==========================================
const btnSubmit = document.getElementById('btn-submit');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authForm = document.getElementById('auth-form');

function showMessage(type, text) {
    if(errorMsg) errorMsg.style.display = 'none';
    if(successMsg) successMsg.style.display = 'none';

    if(type === 'error' && errorMsg) {
        errorMsg.innerText = text;
        errorMsg.style.display = 'block';
    } else if (successMsg) {
        successMsg.innerText = text;
        successMsg.style.display = 'block';
    }
}

async function handleAuth() {
    if (!emailInput || !passInput) return; // Guard clause

    const email = emailInput.value;
    const password = passInput.value;
    const isSignup = window.getAuthMode && window.getAuthMode() === 'signup';

    if (!email || !password) {
        showMessage('error', "Please fill in all fields.");
        return;
    }

    if(btnSubmit) {
        btnSubmit.innerText = "Processing...";
        btnSubmit.disabled = true;
    }

    try {
        if (isSignup) {
            await createUserWithEmailAndPassword(auth, email, password);
            showMessage('success', "Account created! Redirecting...");
            setTimeout(() => { window.location.href = "../index.html"; }, 1500);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
            showMessage('success', "Login successful! Redirecting...");
            setTimeout(() => { window.location.href = "../index.html"; }, 1000);
        }
    } catch (error) {
        console.error("Auth Error:", error);
        showMessage('error', error.message);
        if(btnSubmit) {
            btnSubmit.innerText = "Submit";
            btnSubmit.disabled = false;
        }
    }
}

if(authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAuth();
    });
}

// ==========================================
// 5. TEST FUNCTION (The one you are looking for)
// ==========================================
window.testDatabase = async function() {
    console.log("🚀 Starting Connection Test...");
    try {
        await addDoc(collection(db, "test_connection"), {
            msg: "App Check works!",
            time: Date.now()
        });
        console.log("✅ WRITE SUCCESS!");
        alert("✅ SUCCESS! Database Connected & Secured.");
    } catch (e) {
        console.error("❌ FAILED:", e);
        alert("❌ ERROR: " + e.message);
    }
};