import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../src/constants/colors";
import {
  getBookmarks,
  removeBookmark,
} from "../../src/storage/bookmarkStorage";
import { BibleVerse } from "../../src/types/bible";

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<BibleVerse[]>([]);

  async function loadBookmarks() {
    const data = await getBookmarks();
    setBookmarks(data);
  }

  function handleRemove(verseId: string) {
    Alert.alert(
      "Delete Saved Verse",
      "Do you want to delete this saved verse?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: async () => {
            await removeBookmark(verseId);
            await loadBookmarks();

            Alert.alert("Deleted", "The verse has been deleted.");
          },
        },
      ],
    );
  }

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔖</Text>
          <Text style={styles.emptyTitle}>No bookmarks yet</Text>
          <Text style={styles.emptySubtitle}>
            Search and save your favorite Bible verses. They will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.reference}>{item.reference}</Text>

              <Text style={styles.verseText}>{item.text}</Text>

              {!!item.translationName && (
                <Text style={styles.translationName}>
                  {item.translationName}
                </Text>
              )}

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyIcon: {
    fontSize: 46,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reference: {
    color: Colors.secondary,
    fontWeight: "800",
    marginBottom: 12,
    fontSize: 16,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 29,
    color: Colors.textPrimary,
  },
  translationName: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
  removeButton: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 14,
    paddingVertical: 12,
  },
  removeButtonText: {
    color: Colors.danger,
    textAlign: "center",
    fontWeight: "800",
  },
});
