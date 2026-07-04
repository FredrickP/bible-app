import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppLanguage } from "../types/language";

const LANGUAGE_KEY = "APP_LANGUAGE";

export async function saveLanguage(language: AppLanguage): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.log("Failed to save language:", error);
  }
}

export async function getSavedLanguage(): Promise<AppLanguage | null> {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_KEY);

    if (language === "en" || language === "id" || language === "bt") {
      return language;
    }

    return null;
  } catch (error) {
    console.log("Failed to get language:", error);
    return null;
  }
}

export async function clearSavedLanguage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(LANGUAGE_KEY);
  } catch (error) {
    console.log("Failed to clear language:", error);
  }
}
