import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        app: {
          settings: {
            language: "Language",
            mods_folder: "Mods Folder",
          },
        },
        mod: {
          name: "Name",
          last_update: "Last Update",
          states: {
            default: "Checking...",
            not_installed: "Not Installed",
            updated: "This mod is updated",
            needs_update: "There is a new update",
          },
          actions: {
            update: "Update",
            check: "Check",
          },
        },
      },
    },
    tr: {
      translation: {
        app: {
          settings: {
            language: "Dil",
            mods_folder: "Mod Klasörü",
          },
        },
        mod: {
          name: "Mod",
          last_update: "Son Güncelleme",
          states: {
            default: "Kontrol ediliyor...",
            not_installed: "Yüklü değil",
            updated: "Bu mod güncel durumda",
            needs_update: "Yeni bir güncelleme var",
          },
          actions: {
            update: "Güncelle",
            check: "Kontrol",
          },
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  keySeparator: ".",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
