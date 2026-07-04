import AsyncStorage from "@react-native-async-storage/async-storage";
import { BibleVerse } from "../types/bible";

const BOOKMARK_KEY = "BIBLE_BOOKMARKS";

export async function getBookmarks(): Promise<BibleVerse[]> {
  try {
    const data = await AsyncStorage.getItem(BOOKMARK_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Failed to get bookmarks:", error);
    return [];
  }
}

export async function saveBookmark(verse: BibleVerse): Promise<void> {
  try {
    const bookmarks = await getBookmarks();
    const exists = bookmarks.some((item) => item.id === verse.id);

    if (exists) {
      return;
    }

    const updatedBookmarks = [verse, ...bookmarks];

    await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updatedBookmarks));
  } catch (error) {
    console.log("Failed to save bookmark:", error);
  }
}

export async function removeBookmark(verseId: string): Promise<void> {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter((item) => item.id !== verseId);

    await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(updatedBookmarks));
  } catch (error) {
    console.log("Failed to remove bookmark:", error);
  }
}
