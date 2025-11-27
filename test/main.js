// --- IMPORTS (Use Version 11.0.2 for everything to match) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app-check.js";

// --- CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7",
};

// --- INITIALIZE FIREBASE ---
const app = initializeApp(firebaseConfig);

// --- 🛑 START APP CHECK (THIS WAS MISSING!) 🛑 ---
// Paste your reCAPTCHA Site Key inside the quotes below
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfD-BYsAAAAAF3AH9TXZkG9t2NG6nuiT7p6xYIl'), 
  isTokenAutoRefreshEnabled: true
});

// --- INITIALIZE SERVICES ---
const auth = getAuth(app);
const db = getFirestore(app); // Added this back so you can use the database later

// --- DOM ELEMENTS ---
const btnSubmit = document.getElementById('btn-submit');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authForm = document.getElementById('auth-form');

// --- HELPER FUNCTION ---
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

// --- MAIN AUTH FUNCTION ---
async function handleAuth() {
    const email = emailInput.value;
    const password = passInput.value;
    
    const isSignup = window.getAuthMode && window.getAuthMode() === 'signup';

    if (!email || !password) {
        showMessage('error', "Please fill in all fields.");
        return;
    }

    // UI Loading State
    if(btnSubmit) {
        var originalText = btnSubmit.innerText;
        btnSubmit.innerText = "Processing...";
        btnSubmit.disabled = true;
    }

    try {
        if (isSignup) {
            // SIGN UP
            await createUserWithEmailAndPassword(auth, email, password);
            showMessage('success', "Account created! Redirecting...");
            setTimeout(() => { window.location.href = "../index.html"; }, 1500);
        } else {
            // LOGIN
            await signInWithEmailAndPassword(auth, email, password);
            showMessage('success', "Login successful! Redirecting...");
            setTimeout(() => { window.location.href = "../index.html"; }, 1000);
        }
    } catch (error) {
        console.error("Auth Error:", error); 
        
        let message = error.message;
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            message = "Incorrect email or password.";
        } else if (error.code === 'auth/email-already-in-use') {
            message = "This email is already registered.";
        } else if (error.code === 'auth/weak-password') {
            message = "Password should be at least 6 characters.";
        }

        showMessage('error', message);
        
        // Reset button
        if(btnSubmit) {
            btnSubmit.innerText = originalText;
            btnSubmit.disabled = false;
        }
    }
}

// --- EVENT LISTENER ---
if(authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAuth();
    });
}