import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next, Translation } from "react-i18next";
import HttpApi from 'i18next-http-backend';


const storedLanguage = localStorage.getItem('language') || 'fr';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    lng: storedLanguage,
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",       
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    backend:{
      loadPath: '/locale/{{lng}}/translation.json', 
    }
    
  });
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng); 
    
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr');
  });
  
  
  document.documentElement.setAttribute('dir', storedLanguage === 'ar' ? 'rtl' : 'ltr');
  export default i18n;




