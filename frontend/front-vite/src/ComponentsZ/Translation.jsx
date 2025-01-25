// import  { useState, useEffect } from "react";
// import Dictionary from "./Dictionary.json";

// const Translation = () => {
//   const [language, setLanguage] = useState(localStorage.getItem("lang") || "fr");

//   useEffect(() => {

//     localStorage.setItem("lang", language);

//     document.dir = language === "ar" ? "rtl" : "ltr";
//   }, [language]);

//    const translate = (key) => Dictionary[language]?.[key] || key;

//   return (
//     <div>
//       <select
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         className="border p-2 rounded"
//       >
//         <option value="fr">{translate("Françait")}</option>
//         <option value="ar">{translate("Arabe")}</option>
//       </select>

//       {/* Example of translated content */}
//       {/* <div>
//         <h1>{translate("welcome_message")}</h1>
//         <p>{translate("description")}</p>
//       </div> */}
//     </div>
//   );
// };

// export default Translation;

// components/LanguageSwitcher.jsx

import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Translation = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="m-3">
      <button
        onClick={() => changeLanguage("fr")}
        className={`${currentLanguage === 'fr' ? 'bg-secondary-beige text-main-brown' : 'bg-beige text-main-brown'} p-2 rounded-md hover:bg-secondary-beige m-1`}
      >
        Français
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`${currentLanguage === 'ar' ? 'bg-secondary-beige text-main-brown' : 'bg-beige text-main-brown'} p-2 rounded-md hover:bg-secondary-beige m-1`}
      >
        العربية
      </button>
    </div>
  );
};

export default Translation;
