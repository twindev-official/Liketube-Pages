// 1. Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3sD90sRQcKyDGa3YSdzacO2Ixxu9SgGI",
  authDomain: "liketube-database.firebaseapp.com",
  projectId: "liketube-database",
  storageBucket: "liketube-database.firebasestorage.app",
  messagingSenderId: "328915578966",
  appId: "1:328915578966:web:ea47dbe233d55add864bf7",
  measurementId: "G-ERJRG1YDFC"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- DOM Elements ---
const txtLoginEmail = document.getElementById('login-email');
const txtLoginPass = document.getElementById('login-password');
const btnLogin = document.getElementById('btn-login');

const txtSignupEmail = document.getElementById('signup-email');
const txtSignupPass = document.getElementById('signup-password');
const btnSignup = document.getElementById('btn-signup');
const msg = document.getElementById('status-message');

// --- Sign Up Function ---
btnSignup.addEventListener('click', async () => {
    const email = txtSignupEmail.value;
    const pass = txtSignupPass.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        msg.innerText = "Account created for: " + userCredential.user.email;
    } catch (error) {
        msg.innerText = "Error: " + error.message;
    }
});

// --- Login Function ---
btnLogin.addEventListener('click', async () => {
    const email = txtLoginEmail.value;
    const pass = txtLoginPass.value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        msg.innerText = "Logged in successfully!";
        // Redirect to your main social media page
        // window.location.href = "feed.html"; 
    } catch (error) {
        msg.innerText = "Login Failed: " + error.message;
    }
});

// --- Monitor Authentication State ---
// This runs automatically when the page loads to see if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user.email);
        // You can hide the login form here if you want
    } else {
        console.log("No user is signed in.");
    }
});