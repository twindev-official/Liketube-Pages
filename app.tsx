import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Theme, Language } from './types';

const content = {
  [Language.EN]: {
    header: {
      posts: "Posts",
      ping: "Ping",
      login: "Login",
      signUp: "Sign Up",
      liketube: "Liketube"
    },
    main: {
      title: "Liketube",
      description: "Liketube is a brand-new, entirely free social media platform with a nostalgic theme, created exclusively for the Muslim community. Downloadable clients are available for Android and Windows.",
      loremIpsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egas leo in pede."
    },
    footer: {
      copyright: "© 2025 Twindev. All rights reserved."
    }
  },
  [Language.AR]: {
    header: {
      posts: "المنشورات",
      ping: "رنين",
      login: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      liketube: "لايك تيوب"
    },
    main: {
      title: "لايك تيوب",
      description: "لايك تيوب هي منصة تواصل اجتماعي جديدة ومجانية بالكامل ذات طابع حنيني، تم إنشاؤها حصريًا للمجتمع المسلم. تتوفر برامج قابلة للتنزيل لأنظمة أندرويد وويندوز.",
      loremIpsum: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع."
    },
    footer: {
      copyright: "© 2025 توين ديف. جميع الحقوق محفوظة."
    }
  }
};

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && Object.values(Theme).includes(storedTheme as Theme)) {
      return storedTheme as Theme;
    }
  }
  return Theme.SYSTEM;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());
  const [language, setLanguage] = useState<Language>(Language.EN);

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);
  
  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === Theme.LIGHT) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'system');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
  }, [language]);

  const currentContent = content[language];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${language === Language.AR ? 'font-amiri' : 'font-opensans'}`}>
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        language={language} 
        setLanguage={setLanguage} 
        content={currentContent.header}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="bg-white dark:bg-liketube-card p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-liketube-login-border transition-colors duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className={`flex-1 ${language === Language.AR ? 'md:text-right' : 'md:text-left'}`}>
              <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                {currentContent.main.title}
              </h1>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {currentContent.main.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1520454133694-e0c1b9b6643b?q=80&w=400&h=300&auto=format&fit=crop" alt="Platform placeholder" className="rounded-md shadow-lg" />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-liketube-login-border">
            <p className={`text-gray-600 dark:text-gray-400 leading-7 ${language === Language.AR ? 'text-right' : 'text-left'}`}>
              {currentContent.main.loremIpsum}
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&h=400&auto=format&fit=crop" alt="Community placeholder" className="rounded-md shadow-lg" />
          </div>
        </div>
      </main>

      <Footer content={currentContent.footer}/>
    </div>
  );
};

export default App;
