// --- UPDATE THIS CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7",
};

// --- IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const btnSubmit = document.getElementById('btn-submit');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authForm = document.getElementById('auth-form');

function showMessage(type, text) {
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    if(type === 'error') {
        errorMsg.innerText = text;
        errorMsg.style.display = 'block';
    } else {
        successMsg.innerText = text;
        successMsg.style.display = 'block';
    }
}

// MAIN AUTH FUNCTION
async function handleAuth() {
    const email = emailInput.value;
    const password = passInput.value;
    
    // Check if we are in Signup mode using the function exposed in index.html
    const isSignup = window.getAuthMode && window.getAuthMode() === 'signup';

    // Validation
    if (!email || !password) {
        showMessage('error', "Please fill in all fields.");
        return;
    }

    // UI Loading State
    const originalText = btnSubmit.innerText;
    btnSubmit.innerText = "Processing...";
    btnSubmit.disabled = true;

    try {
        if (isSignup) {
            // --- SIGN UP ---
            await createUserWithEmailAndPassword(auth, email, password);
            showMessage('success', "Account created! Redirecting...");
            setTimeout(() => { window.location.href = "../index.html"; }, 1500);
        } else {
            // --- LOGIN ---
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
        } else if (error.code === 'auth/too-many-requests') {
            message = "Too many failed attempts. Please try again later.";
        } else if (error.code === 'auth/network-request-failed') {
            message = "Network error. Check your internet connection.";
        }

        showMessage('error', message);
        
        // Reset button
        btnSubmit.innerText = originalText;
        btnSubmit.disabled = false;
    }
}

// Form Submit Event (Captures Enter Key and Button Click)
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload
    handleAuth();
});