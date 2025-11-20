// --- UPDATE THIS CONFIGURATION ---
// Go to Firebase Console -> Project Settings -> General -> Scroll down to "Your apps"
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7"
};

// --- IMPORTS (No Node.js required) ---
import { initializeApp } from "[https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js](https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js)";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "[https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js](https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js)";

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Initialized"); // Debug check

// DOM Elements
const btnSubmit = document.getElementById('btn-submit');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');
const authForm = document.getElementById('auth-form');

// Detect Mode
const urlParams = new URLSearchParams(window.location.search);
const isSignup = urlParams.get('mode') === 'signup';

function showMessage(type, text) {
    // Hide both first
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    if(type === 'error') {
        errorMsg.innerText = text;
        errorMsg.style.display = 'block'; // Force block display
    } else {
        successMsg.innerText = text;
        successMsg.style.display = 'block'; // Force block display
    }
}

// MAIN FUNCTION
async function handleAuth() {
    const email = emailInput.value;
    const password = passInput.value;

    // Basic validation
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
        console.error("Auth Error:", error); // Log to console for debugging
        
        // User Friendly Error Messages
        let message = error.message;
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            message = "Incorrect email or password.";
        } else if (error.code === 'auth/email-already-in-use') {
            message = "This email is already registered.";
        } else if (error.code === 'auth/weak-password') {
            message = "Password should be at least 6 characters.";
        } else if (error.code === 'auth/too-many-requests') {
            message = "Too many failed attempts. Please try again later.";
        }

        showMessage('error', message);
        
        // Reset button
        btnSubmit.innerText = originalText;
        btnSubmit.disabled = false;
    }
}

// Trigger on Button Click
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form refresh
    handleAuth();
});

// Trigger on Enter Key (via form submit event)
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form refresh
    handleAuth();
});