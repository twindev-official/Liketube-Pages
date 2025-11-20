import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const btnSignup = document.getElementById('btn-signup');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

// Helper to clear messages
function clearMessages() {
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
    errorMsg.innerText = '';
    successMsg.innerText = '';
}

// --- LOGIN ACTION ---
btnLogin.addEventListener('click', async () => {
    clearMessages();
    const email = emailInput.value;
    const pass = passwordInput.value;

    if(!email || !pass) {
        errorMsg.innerText = "Please fill in all fields.";
        errorMsg.style.display = 'block';
        return;
    }

    btnLogin.innerText = "Loading...";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        successMsg.innerText = "Login Successful! Redirecting...";
        successMsg.style.display = 'block';
        
        // Redirect to Home Page after 1 second
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);

    } catch (error) {
        console.error(error);
        let message = error.message;
        if(error.code === 'auth/invalid-credential') message = "Incorrect email or password.";
        if(error.code === 'auth/too-many-requests') message = "Too many attempts. Try again later.";
        
        errorMsg.innerText = message;
        errorMsg.style.display = 'block';
    } finally {
        // Reset button text based on current language
        const lang = localStorage.getItem('language') || 'en';
        btnLogin.innerText = lang === 'ar' ? "تسجيل الدخول" : "Login";
    }
});

// --- SIGNUP ACTION ---
btnSignup.addEventListener('click', async () => {
    clearMessages();
    const email = emailInput.value;
    const pass = passwordInput.value;

    if(!email || !pass) {
        errorMsg.innerText = "Please fill in all fields.";
        errorMsg.style.display = 'block';
        return;
    }
    
    if(pass.length < 6) {
        errorMsg.innerText = "Password must be at least 6 characters.";
        errorMsg.style.display = 'block';
        return;
    }

    btnSignup.innerText = "Creating...";

    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        successMsg.innerText = "Account Created! You are now logged in.";
        successMsg.style.display = 'block';
        
        // Redirect to Home Page
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);

    } catch (error) {
        console.error(error);
        let message = error.message;
        if(error.code === 'auth/email-already-in-use') message = "This email is already registered.";
        
        errorMsg.innerText = message;
        errorMsg.style.display = 'block';
    } finally {
        // Reset button text based on current language
        const lang = localStorage.getItem('language') || 'en';
        btnSignup.innerText = lang === 'ar' ? "إنشاء حساب" : "Create Account";
    }
});