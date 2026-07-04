import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../src/constants/colors";
import { getVerseByReference } from "../../src/services/bibleApi";
import { saveBookmark } from "../../src/storage/bookmarkStorage";
import { BibleVerse } from "../../src/types/bible";

export default function SearchScreen() {
  const [reference, setReference] = useState("John 3:16");
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch() {
    const cleanReference = reference.trim();

    if (!cleanReference) {
      Alert.alert("Validation", "Please enter a Bible verse reference.");
      return;
    }

    setIsLoading(true);
    setVerse(null);

    const result = await getVerseByReference(cleanReference);

    setIsLoading(false);

    if (!result) {
      Alert.alert("Not Found", "Verse could not be found. Try John 3:16.");
      return;
    }

    setVerse(result);
  }

  async function handleSaveBookmark() {
    if (!verse) {
      return;
    }

    await saveBookmark(verse);
    Alert.alert("Saved", "Verse has been added to bookmarks.");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Search Verse</Text>

          <Text style={styles.subtitle}>
            Search Bible verses by reference. Try John 3:16, Psalm 23:1, or
            Romans 8:28.
          </Text>

          <View style={styles.searchCard}>
            <Text style={styles.inputLabel}>Verse Reference</Text>

            <TextInput
              value={reference}
              onChangeText={setReference}
              placeholder="Example: John 3:16"
              placeholderTextColor="#A99A8B"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Search</Text>
              )}
            </TouchableOpacity>
          </View>

          {verse && (
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Result</Text>

              <Text style={styles.reference}>{verse.reference}</Text>

              <Text style={styles.verseText}>{verse.text}</Text>

              {!!verse.translationName && (
                <Text style={styles.translationName}>
                  {verse.translationName}
                </Text>
              )}

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleSaveBookmark}
              >
                <Text style={styles.secondaryButtonText}>Save Bookmark</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginTop: 16,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginTop: 8,
    lineHeight: 22,
    fontSize: 15,
  },
  searchCard: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 18,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputLabel: {
    color: Colors.textPrimary,
    fontWeight: "800",
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.textPrimary,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 14,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultLabel: {
    color: Colors.primary,
    fontWeight: "800",
    marginBottom: 10,
  },
  reference: {
    color: Colors.secondary,
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 14,
  },
  verseText: {
    fontSize: 20,
    lineHeight: 31,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  translationName: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 18,
  },
  secondaryButtonText: {
    color: Colors.primary,
    textAlign: "center",
    fontWeight: "800",
  },
});
