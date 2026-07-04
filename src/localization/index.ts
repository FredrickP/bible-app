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
    chooseLanguage: "Choose your language",
    chooseLanguageSubtitle: "Select the language you want to use in this app.",
    continue: "Continue",
    goodMorning: "Good Morning",
    startJourney: "Let's start your spiritual journey today.",
    dailyVerse: "Daily Verse",
    searchVerse: "Search Verse",
    bookmarks: "Bookmarks",
    searchPlaceholder: "Example: John 3:16",
    search: "Search",
    saveBookmark: "Save Bookmark",
    remove: "Remove",
    noBookmarks: "No bookmarks yet",
    noBookmarksDesc: "Saved verses will appear here.",
    failedLoad: "Failed to load verse.",
  },
  id: {
    appName: "Bible App",
    tagline: "Baca. Renungkan. Bertumbuh.",
    chooseLanguage: "Pilih Bahasa",
    chooseLanguageSubtitle:
      "Pilih bahasa yang ingin kamu gunakan di aplikasi ini.",
    continue: "Lanjutkan",
    goodMorning: "Selamat Pagi",
    startJourney: "Mari mulai perjalanan rohanimu hari ini.",
    dailyVerse: "Ayat Harian",
    searchVerse: "Cari Ayat",
    bookmarks: "Ayat Tersimpan",
    searchPlaceholder: "Contoh: John 3:16",
    search: "Cari",
    saveBookmark: "Simpan Ayat",
    remove: "Hapus",
    noBookmarks: "Belum ada ayat tersimpan",
    noBookmarksDesc: "Ayat yang kamu simpan akan muncul di sini.",
    failedLoad: "Gagal memuat ayat.",
  },
  bt: {
    appName: "Bible App",
    tagline: "Jaha. Rimangi. Marsirang.",
    chooseLanguage: "Pillit Hata",
    chooseLanguageSubtitle: "Pillit hata na laho dipakke di aplikasi on.",
    continue: "Lanjut",
    goodMorning: "Horas",
    startJourney: "Mulai ma pardalanan rohanim sadari on.",
    dailyVerse: "Ayat Ari-ari",
    searchVerse: "Lului Ayat",
    bookmarks: "Ayat na Pinillit",
    searchPlaceholder: "Contoh: John 3:16",
    search: "Lului",
    saveBookmark: "Pillit Ayat",
    remove: "Hasathon",
    noBookmarks: "Dang adong ayat na pinillit",
    noBookmarksDesc: "Ayat na dipillitmu tarida di son.",
    failedLoad: "Gagal mambuat ayat.",
  },
};

export function getText(language: AppLanguage) {
  return translations[language];
}
