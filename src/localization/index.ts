import { AppLanguage, LanguageOption } from "../types/language";

export const languageOptions: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    description: "Use English for the app interface",
  },
  {
    code: "id",
    label: "Bahasa Indonesia",
    description: "Gunakan Bahasa Indonesia untuk tampilan aplikasi",
  },
  {
    code: "bt",
    label: "Batak Toba",
    description: "Pakke Hata Batak Toba di aplikasi on",
  },
];

export const translations = {
  en: {
    appName: "Bible App",
    tagline: "Read. Reflect. Grow.",
    dailyVerse: "Daily Verse",
    today: "Today",
    searchVerse: "Search Verse",
    bookmarks: "Bookmarks",
    savedVerses: "Saved verses",
    findScripture: "Find scripture",
    changeLanguage: "Change Language",
    chooseLanguage: "Choose Language",
    close: "Close",
    failedLoad: "Failed to load daily verse.",
  },
  id: {
    appName: "Bible App",
    tagline: "Baca. Renungkan. Bertumbuh.",
    dailyVerse: "Ayat Harian",
    today: "Hari Ini",
    searchVerse: "Cari Ayat",
    bookmarks: "Ayat Tersimpan",
    savedVerses: "Ayat favorit",
    findScripture: "Cari firman",
    changeLanguage: "Ganti Bahasa",
    chooseLanguage: "Pilih Bahasa",
    close: "Tutup",
    failedLoad: "Gagal memuat ayat harian.",
  },
  bt: {
    appName: "Bible App",
    tagline: "Jaha. Rimangi. Marsirang.",
    dailyVerse: "Ayat Ari-ari",
    today: "Sadari On",
    searchVerse: "Lului Ayat",
    bookmarks: "Ayat na Pinillit",
    savedVerses: "Ayat na disimpan",
    findScripture: "Lului hata ni Debata",
    changeLanguage: "Ganti Hata",
    chooseLanguage: "Pillit Hata",
    close: "Tutup",
    failedLoad: "Gagal mambuat ayat ari-ari.",
  },
};

export function getText(language: AppLanguage) {
  return translations[language];
}
