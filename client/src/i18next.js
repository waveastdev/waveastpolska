import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import translationEN from "../public/locales/en/translation.json";
import translationFR from "../public/locales/fr/translation.json";
import translationES from "../public/locales/es/translation.json"
import translationPL from "../public/locales/pl/translation.json";

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: localStorage.getItem("lng") || "en",
    resources: {
        en: {
            translation: translationEN
        },
        fr: {
            translation: translationFR
        },
        es: {
            translation: translationES
        },
        pl: {
            translation: translationPL
        },
    },
});

export default i18next;