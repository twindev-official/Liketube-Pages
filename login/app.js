<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Liketube</title>
    <link href="https://fonts.googleapis.com/css2?family=Tahoma:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="../icon.png">
    
    <style>
        /* --- VARIABLES (Matches Main Page) --- */
        :root {
            --bg-color: #e6f0ff;
            --header-bg: linear-gradient(to bottom, #4267B2, #3b5998);
            --header-border: #365899;
            --header-text: #ffffff;
            --header-text-secondary: #d0d8e8;
            --text-color: #000000;
            --text-color-secondary: #333;
            --primary-blue: #3b5998;
            --search-bg: #ffffff;
            --search-border: #ddd;
            --footer-bg: #343a40;
            --footer-text: #f8f9fa;
            --dropdown-bg: #ffffff;
            --dropdown-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
            --dropdown-hover: #f1f1f1;
            --mobile-menu-bg: #f0f2f5;
            --mobile-menu-text: #000000;
            
            --btn-login-bg: linear-gradient(to bottom, #f0f8ff, #d6e8ff);
            --btn-login-hover-bg: linear-gradient(to bottom, #d6e8ff, #c0d9ff);
            --btn-login-border: var(--primary-blue);
            --btn-login-text: var(--primary-blue);
            
            --btn-signup-bg: linear-gradient(to bottom, #28a745, #218838);
            --btn-signup-hover-bg: linear-gradient(to bottom, #218838, #1e7e34);
            --btn-signup-border: #1e7e34;
            --btn-signup-text: #ffffff;

            /* Login Card Specifics */
            --card-bg: #ffffff;
            --card-shadow: 0 4px 12px rgba(0,0,0,0.1);
            --input-border: #ccc;
        }

        .dark-mode {
            --bg-color: #1a2233;
            --header-bg: linear-gradient(to bottom, #2a4a8a, #243f7a);
            --header-border: #243f7a;
            --header-text: #e0e0e0;
            --header-text-secondary: #a0a8b8;
            --text-color: #e0e0e0;
            --text-color-secondary: #aaaaaa;
            --primary-blue: #5890ff;
            --search-bg: #2c2c2c;
            --search-border: #444;
            --footer-bg: #1c1c1c;
            --footer-text: #aaaaaa;
            --dropdown-bg: #2c2c2c;
            --dropdown-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
            --dropdown-hover: #3a3a3a;
            --mobile-menu-bg: #2c2c2c;
            --mobile-menu-text: #e0e0e0;
            
            --btn-login-bg: linear-gradient(to bottom, #2c3a5e, #24304d);
            --btn-login-hover-bg: linear-gradient(to bottom, #24304d, #1e2840);
            --btn-login-border: var(--primary-blue);
            --btn-login-text: var(--primary-blue);
            
            --btn-signup-bg: linear-gradient(to bottom, #28a745, #218838);
            --btn-signup-hover-bg: linear-gradient(to bottom, #218838, #1e7e34);
            --btn-signup-border: #1e7e34;
            --btn-signup-text: #ffffff;

            --card-bg: #2c2c2c;
            --card-shadow: 0 4px 12px rgba(0,0,0,0.4);
            --input-border: #555;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; min-width: 100%; overflow-x: clip; height: 100%; }
        body {
            font-family: 'Tahoma', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.3s ease, color 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        [dir="rtl"] body { font-family: 'Tajawal', 'Tahoma', sans-serif; line-height: 1.7; }

        /* --- HEADER STYLES --- */
        .header {
            background-image: var(--header-bg);
            padding: 1rem 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--header-border);
            position: relative;
            z-index: 100;
        }
        .header-left, .header-center, .header-right { display: flex; align-items: center; }
        .header-left { flex: 1; justify-content: flex-start; }
        .header-center { flex: 2; justify-content: center; }
        .header-right { flex: 1; justify-content: flex-end; }

        .logo { font-size: 1.75rem; font-weight: 700; color: var(--header-text); text-decoration: none; margin-right: 2.5rem; }
        .nav-links { display: flex; gap: 1.2rem; }
        .nav-links a { color: var(--header-text); text-decoration: none; font-weight: 500; position: relative; padding-bottom: 5px; }
        .nav-links a:hover { color: var(--header-text-secondary); }

        .search-bar {
            width: 100%; max-width: 450px; display: flex; align-items: center;
            background-color: var(--search-bg); border: 1px solid var(--search-border);
            border-radius: 4px; padding: 0.5rem 1rem;
        }
        .search-bar i { color: #888; margin-right: 0.5rem; }
        .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-family: 'Tahoma', sans-serif; font-size: 0.9rem; color: var(--text-color); }

        .user-controls { display: flex; align-items: center; gap: 0.75rem; }
        
        /* --- BUTTONS --- */
        .btn {
            border: none; padding: 0.6rem 1.2rem; border-radius: 4px;
            cursor: pointer; font-weight: 700; font-family: 'Tahoma', sans-serif;
            text-decoration: none; font-size: 0.9rem; transition: all 0.3s ease;
        }

        /* Greyed out "Login" button in header */
        .btn-disabled-style {
            background: #b0b3b8 !important;
            background-image: none !important;
            border: 1px solid #999 !important;
            color: #444 !important;
            cursor: default;
            pointer-events: none; 
        }
        .dark-mode .btn-disabled-style {
            background: #4a4a4a !important;
            border: 1px solid #333 !important;
            color: #ccc !important;
        }

        .btn-signup {
            background-image: var(--btn-signup-bg); color: var(--btn-signup-text);
            border: 1px solid var(--btn-signup-border);
        }
        .btn-signup:hover { background-image: var(--btn-signup-hover-bg); }

        /* --- MOBILE MENU (Copied from Main) --- */
        .hamburger-menu {
            display: none; /* Hide by default */
            font-size: 1.5rem; color: var(--header-text);
            cursor: pointer; margin-right: 1rem;
        }
        [dir="rtl"] .hamburger-menu { margin-right: 0; margin-left: 1rem; }

        .mobile-menu {
            position: fixed; top: 0; left: -100%; width: 80%; height: 100%;
            background-color: var(--mobile-menu-bg); color: var(--mobile-menu-text);
            z-index: 1050; padding: 2rem;
            transition: left 0.3s ease-out;
            box-shadow: 2px 0 5px rgba(0,0,0,0.2);
            display: flex; flex-direction: column; gap: 1.5rem;
        }
        [dir="rtl"] .mobile-menu { left: auto; right: -100%; transition: right 0.3s ease-out; }
        
        .mobile-menu.open { left: 0; }
        [dir="rtl"] .mobile-menu.open { left: auto; right: 0; }

        .mobile-menu-close {
            position: absolute; top: 1rem; right: 1rem;
            font-size: 1.5rem; cursor: pointer; color: var(--text-color);
        }
        [dir="rtl"] .mobile-menu-close { right: auto; left: 1rem; }

        .mobile-search-bar {
            width: 100%; display: flex; align-items: center;
            background-color: var(--search-bg); border: 1px solid var(--search-border);
            border-radius: 4px; padding: 0.5rem 1rem;
        }
        .mobile-search-bar input { border: none; background: transparent; width: 100%; outline: none; color: var(--text-color); }

        .mobile-nav-links a {
            display: block; padding: 0.75rem 0; text-decoration: none;
            color: var(--mobile-menu-text); font-weight: 700;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .dark-mode .mobile-nav-links a { border-bottom: 1px solid rgba(255,255,255,0.1); }

        /* --- LOGIN CARD --- */
        .main-container { flex: 1; display: flex; justify-content: center; align-items: center; padding: 2rem; }
        .login-card {
            background-color: var(--card-bg); padding: 2.5rem;
            border-radius: 8px; box-shadow: var(--card-shadow);
            width: 100%; max-width: 420px; text-align: center;
        }
        .login-card h2 { margin-bottom: 1.5rem; font-size: 1.8rem; color: var(--text-color); }
        
        .form-group { margin-bottom: 1.2rem; text-align: left; }
        [dir="rtl"] .form-group { text-align: right; }

        .form-control {
            width: 100%; padding: 0.9rem;
            border: 1px solid var(--input-border); border-radius: 4px;
            background-color: var(--bg-color); color: var(--text-color);
            font-family: inherit; font-size: 1rem; outline: none;
        }
        .form-control:focus { border-color: var(--primary-blue); }

        .btn-full { width: 100%; padding: 0.8rem; font-size: 1.1rem; margin-top: 1rem; font-weight: bold; cursor: pointer; border-radius: 4px; }
        .btn-submit-login {
            background-image: var(--btn-login-bg); border: 1px solid var(--btn-login-border);
            color: var(--btn-login-text);
        }
        .btn-submit-signup {
            background-image: var(--btn-signup-bg); color: white; border: 1px solid var(--btn-signup-border);
            display: none; 
        }

        .msg-box { margin-top: 1rem; padding: 10px; border-radius: 4px; font-size: 0.9rem; display: none; font-weight: bold; }
        .error-msg { background-color: rgba(220, 53, 69, 0.1); border: 1px solid #dc3545; color: #dc3545; }
        .success-msg { background-color: rgba(40, 167, 69, 0.1); border: 1px solid #28a745; color: #28a745; }

        .auth-toggle-text { margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-color-secondary); }
        .auth-toggle-link { color: var(--primary-blue); font-weight: bold; text-decoration: underline; cursor: pointer; }

        .footer { background-color: var(--footer-bg); color: var(--footer-text); text-align: center; padding: 2rem; margin-top: auto; }

        /* Dropdowns */
        .dropdown { position: relative; }
        .dropdown-toggle { background: none; border: none; cursor: pointer; color: var(--header-text); font-size: 1.2rem; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .dropdown-menu { display: none; position: absolute; right: 0; top: 50px; background-color: var(--dropdown-bg); min-width: 140px; box-shadow: var(--dropdown-shadow); border-radius: 4px; overflow: hidden; z-index: 100; }
        .dropdown-menu.show { display: block; }
        .dropdown-menu a { color: var(--text-color); padding: 0.75rem 1rem; text-decoration: none; display: block; font-size: 0.9rem; }

        @media (max-width: 992px) {
            .hamburger-menu { display: block; }
            .header-center, .nav-links { display: none; }
            .header-left { flex: none; }
            .header-right { flex: 1; }
        }
        @media (max-width: 768px) {
            .header { padding: 1rem; }
            .user-controls { gap: 0.25rem; }
            .logo { margin-right: 0.5rem; font-size: 1.5rem; }
        }
    </style>
</head>
<body>

    <!-- MOBILE MENU -->
    <div class="mobile-menu" id="mobile-menu">
        <i class="fas fa-times mobile-menu-close" id="mobile-menu-close"></i>
        <div class="mobile-search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." data-key="search_placeholder">
        </div>
        <nav class="mobile-nav-links">
            <a href="../index.html" data-key="nav_home">Home</a>
            <a href="#" data-key="nav_posts">Posts</a>
            <a href="#" data-key="nav_ping">Ping</a>
            <a href="#" data-key="nav_download">Download</a>
        </nav>
    </div>

    <!-- HEADER -->
    <header class="header">
        <div class="header-left">
            <i class="fas fa-bars hamburger-menu" id="hamburger-menu"></i>
            <a href="../index.html" class="logo">Liketube</a>
            <nav class="nav-links">
                <a href="../index.html" data-key="nav_home">Home</a>
                <a href="#" data-key="nav_posts">Posts</a>
                <a href="#" data-key="nav_ping">Ping</a>
                <a href="#" data-key="nav_download">Download</a>
            </nav>
        </div>

        <div class="header-center">
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search..." data-key="search_placeholder">
            </div>
        </div>

        <div class="header-right">
            <div class="user-controls">
                <div class="dropdown">
                    <button class="dropdown-toggle" id="theme-toggle-btn"><i class="fas fa-sun" id="theme-icon"></i></button>
                    <div class="dropdown-menu" id="theme-menu">
                        <a href="#" data-theme="light" data-key="theme_light"><i class="fas fa-sun fa-fw"></i> Light</a>
                        <a href="#" data-theme="dark" data-key="theme_dark"><i class="fas fa-moon fa-fw"></i> Dark</a>
                        <a href="#" data-theme="auto" data-key="theme_auto"><i class="fas fa-magic fa-fw"></i> Automatic</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropdown-toggle" id="lang-toggle-btn" style="font-size:0.9rem; font-weight:bold;">EN</button>
                    <div class="dropdown-menu" id="lang-menu">
                        <a href="#" data-lang="en" data-key="lang_en">English</a>
                        <a href="#" data-lang="ar" data-key="lang_ar">Arabic</a>
                    </div>
                </div>

                <a href="#" class="btn btn-disabled-style" data-key="btn_login">Login</a>
                <!-- Signup HREF is now #, triggers JS -->
                <a href="#" id="header-btn-signup" class="btn btn-signup" data-key="btn_signup">Signup</a>
            </div>
        </div>
    </header>

    <!-- MAIN LOGIN/SIGNUP CARD -->
    <main class="main-container">
        <div class="login-card">
            <h2 id="form-title" data-key="login_title">Login</h2>
            
            <!-- IMPORTANT: Form has no inline action, handled by app.js -->
            <form id="auth-form">
                <div class="form-group">
                    <input type="email" id="email" class="form-control" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                    <input type="password" id="password" class="form-control" placeholder="Password" required>
                </div>
                <button type="submit" id="btn-submit" class="btn-full btn-submit-login" data-key="btn_login">Login</button>
            </form>

            <div id="error-msg" class="msg-box error-msg"></div>
            <div id="success-msg" class="msg-box success-msg"></div>

            <div class="auth-toggle-text">
                <span id="toggle-text" data-key="no_account_text">Don't have an account?</span>
                <span id="toggle-link" class="auth-toggle-link" data-key="toggle_signup">Signup</span>
            </div>
        </div>
    </main>

    <footer class="footer">
        <p data-key="footer_text">© 2025 Liketube. Developed by Twindev. All rights reserved.</p>
    </footer>

    <!-- UI INTERACTION SCRIPT -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            
            // --- 1. MOBILE MENU LOGIC ---
            const hamburgerMenu = document.getElementById('hamburger-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuClose = document.getElementById('mobile-menu-close');

            hamburgerMenu.addEventListener('click', () => {
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });

            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });

            // --- 2. MODE SWITCHING (Login vs Signup) ---
            // Elements
            const formTitle = document.getElementById('form-title');
            const btnSubmit = document.getElementById('btn-submit');
            const toggleText = document.getElementById('toggle-text');
            const toggleLink = document.getElementById('toggle-link');
            const headerBtnSignup = document.getElementById('header-btn-signup');
            const errorMsg = document.getElementById('error-msg');
            const successMsg = document.getElementById('success-msg');

            // State
            let isSignupMode = false;

            function updateAuthUI() {
                // Clear messages on switch
                errorMsg.style.display = 'none';
                successMsg.style.display = 'none';

                if (isSignupMode) {
                    // Signup UI
                    formTitle.setAttribute('data-key', 'create_account_title');
                    btnSubmit.className = 'btn-full btn-submit-signup';
                    btnSubmit.setAttribute('data-key', 'btn_signup_action');
                    
                    toggleText.setAttribute('data-key', 'have_account_text');
                    toggleLink.setAttribute('data-key', 'toggle_login');
                } else {
                    // Login UI
                    formTitle.setAttribute('data-key', 'login_title');
                    btnSubmit.className = 'btn-full btn-submit-login';
                    btnSubmit.setAttribute('data-key', 'btn_login');

                    toggleText.setAttribute('data-key', 'no_account_text');
                    toggleLink.setAttribute('data-key', 'toggle_signup');
                }
                
                // Refresh translations for current language
                const lang = localStorage.getItem('language') || 'en';
                setLanguage(lang);
            }

            // Link at bottom of card
            toggleLink.addEventListener('click', () => {
                isSignupMode = !isSignupMode;
                updateAuthUI();
            });

            // Signup button in Header
            headerBtnSignup.addEventListener('click', (e) => {
                e.preventDefault();
                isSignupMode = true; // Force signup mode
                updateAuthUI();
            });

            // Expose mode to global scope for app.js to read
            window.getAuthMode = () => isSignupMode ? 'signup' : 'login';


            // --- 3. TRANSLATIONS & THEME (Standard) ---
            const translations = {
                en: {
                    nav_home: "Home", nav_posts: "Posts", nav_ping: "Ping", nav_download: "Download",
                    search_placeholder: "Search...", theme_light: "Light", theme_dark: "Dark", theme_auto: "Automatic",
                    lang_en: "English", lang_ar: "Arabic", footer_text: "© 2025 Liketube. Developed by Twindev. All rights reserved.",
                    login_title: "Login", create_account_title: "Create Account",
                    btn_login: "Login", btn_signup: "Signup", btn_signup_action: "Create Account",
                    no_account_text: "Don't have an account?", have_account_text: "Already have an account?",
                    toggle_signup: "Signup", toggle_login: "Login"
                },
                ar: {
                    nav_home: "الرئيسية", nav_posts: "المنشورات", nav_ping: "بينغ", nav_download: "تحميل",
                    search_placeholder: "بحث...", theme_light: "فاتح", theme_dark: "داكن", theme_auto: "تلقائي",
                    lang_en: "الإنجليزية", lang_ar: "العربية", footer_text: "© 2025  لايكتيوب. مصنوع من توين ديف. جميع الحقوق محفوظة.",
                    login_title: "تسجيل الدخول", create_account_title: "إنشاء حساب",
                    btn_login: "تسجيل الدخول", btn_signup: "إنشاء حساب", btn_signup_action: "إنشاء حساب",
                    no_account_text: "ليس لديك حساب؟", have_account_text: "لديك حساب بالفعل؟",
                    toggle_signup: "إنشاء حساب", toggle_login: "دخول"
                }
            };

            const langMenu = document.getElementById('lang-menu');
            const langToggleBtn = document.getElementById('lang-toggle-btn');
            function setLanguage(lang) {
                if (!translations[lang]) lang = 'en';
                document.documentElement.lang = lang;
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                document.querySelectorAll('[data-key]').forEach(el => {
                    const key = el.getAttribute('data-key');
                    if (translations[lang][key]) {
                        if(el.tagName === 'INPUT') el.placeholder = translations[lang][key];
                        else el.innerText = translations[lang][key];
                    }
                });
                langToggleBtn.textContent = lang.toUpperCase();
                localStorage.setItem('language', lang);
            }
            setLanguage(localStorage.getItem('language') || 'en');

            langMenu.addEventListener('click', (e) => {
                const target = e.target.closest('a[data-lang]');
                if (target) {
                    setLanguage(target.getAttribute('data-lang'));
                    target.closest('.dropdown-menu').classList.remove('show');
                }
            });

            const themeMenu = document.getElementById('theme-menu');
            const themeIcon = document.getElementById('theme-icon');
            function applyTheme(theme) {
                const dark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.body.className = dark ? 'dark-mode' : '';
                themeIcon.className = theme === 'auto' ? 'fas fa-magic' : (theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun');
                localStorage.setItem('theme', theme);
            }
            applyTheme(localStorage.getItem('theme') || 'auto');
            
            themeMenu.addEventListener('click', (e) => {
                const target = e.target.closest('a[data-theme]');
                if(target) {
                    applyTheme(target.getAttribute('data-theme'));
                    target.closest('.dropdown-menu').classList.remove('show');
                }
            });

            document.querySelectorAll('.dropdown-toggle').forEach(t => t.addEventListener('click', (e) => {
                e.stopPropagation(); t.nextElementSibling.classList.toggle('show');
            }));
            window.addEventListener('click', () => document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show')));
        });
    </script>
    
    <!-- Firebase Logic -->
    <script type="module" src="app.js"></script>

</body>
</html>