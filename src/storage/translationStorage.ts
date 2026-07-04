import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_TRANSLATION } from "../constants/translations";
import { BibleTranslation } from "../types/translation";

const TRANSLATION_KEY = "BIBLE_TRANSLATION";

const validTranslations: BibleTranslation[] = [
  "cherokee",
  "cuv",
  "bkr",
  "asv",
  "bbe",
  "darby",
  "dra",
  "kjv",
  "web",
  "ylt",
  "oeb-cw",
  "webbe",
  "oeb-us",
  "clementine",
  "almeida",
  "rccv",
];

export async function saveTranslation(
  translation: BibleTranslation,
): Promise<void> {
  try {
    await AsyncStorage.setItem(TRANSLATION_KEY, translation);
  } catch (error) {
    console.log("Failed to save translation:", error);
  }
}

export async function getSavedTranslation(): Promise<BibleTranslation> {
  try {
    const translation = await AsyncStorage.getItem(TRANSLATION_KEY);

    if (validTranslations.includes(translation as BibleTranslation)) {
      return translation as BibleTranslation;
    }

    return DEFAULT_TRANSLATION;
  } catch (error) {
    console.log("Failed to get translation:", error);
    return DEFAULT_TRANSLATION;
  }
}
