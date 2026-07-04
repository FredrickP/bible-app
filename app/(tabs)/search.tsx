import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BibleBook,
  BibleTestament,
  generateNumberOptions,
  getBooksByTestament,
} from "../../src/constants/bibleBooks";
import { Colors } from "../../src/constants/colors";
import { getTranslationLabel } from "../../src/constants/translations";
import { getVerseByReference } from "../../src/services/bibleApi";
import { saveBookmark } from "../../src/storage/bookmarkStorage";
import { getSavedTranslation } from "../../src/storage/translationStorage";
import { BibleVerse } from "../../src/types/bible";
import { BibleTranslation } from "../../src/types/translation";

type PickerType = "book" | "chapter" | "verse" | null;

export default function SearchScreen() {
  const [selectedTestament, setSelectedTestament] =
    useState<BibleTestament>("new");

  const newTestamentBooks = getBooksByTestament("new");
  const oldTestamentBooks = getBooksByTestament("old");

  const [selectedBook, setSelectedBook] = useState<BibleBook>(
    newTestamentBooks.find((book) => book.name === "John") ??
      newTestamentBooks[0],
  );

  const [selectedChapter, setSelectedChapter] = useState(3);
  const [selectedVerse, setSelectedVerse] = useState(16);

  const filteredBooks = getBooksByTestament(selectedTestament);

  const [pickerType, setPickerType] = useState<PickerType>(null);
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [translation, setTranslation] = useState<BibleTranslation>("web");

  const chapterOptions = generateNumberOptions(selectedBook.chapters);

  // Kita kasih 60 dulu sebagai batas pilihan ayat.
  // Kalau ayat tidak ada, API akan return not found.
  const verseOptions = generateNumberOptions(60);

  useFocusEffect(
    useCallback(() => {
      async function loadTranslation() {
        const savedTranslation = await getSavedTranslation();
        setTranslation(savedTranslation);
      }

      loadTranslation();
    }, []),
  );

  function handleSelectBook(book: BibleBook) {
    setSelectedBook(book);
    setSelectedChapter(1);
    setSelectedVerse(1);
    setVerse(null);
    setPickerType(null);
  }

  function handleSelectChapter(chapter: number) {
    setSelectedChapter(chapter);
    setSelectedVerse(1);
    setVerse(null);
    setPickerType(null);
  }

  function handleSelectVerse(verseNumber: number) {
    setSelectedVerse(verseNumber);
    setVerse(null);
    setPickerType(null);
  }

  function handleSelectTestament(testament: BibleTestament) {
    const books = getBooksByTestament(testament);
    const firstBook = books[0];

    setSelectedTestament(testament);
    setSelectedBook(firstBook);
    setSelectedChapter(1);
    setSelectedVerse(1);
    setVerse(null);
  }

  async function handleSearch() {
    const reference = `${selectedBook.name} ${selectedChapter}:${selectedVerse}`;

    setIsLoading(true);
    setVerse(null);

    const result = await getVerseByReference(reference, translation);

    setIsLoading(false);

    if (!result) {
      Alert.alert(
        "Not Found",
        "Verse could not be found in this translation. Please choose another verse.",
      );
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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Search Verse</Text>

        <Text style={styles.subtitle}>
          Current translation: {translation.toUpperCase()} -{" "}
          {getTranslationLabel(translation)}
        </Text>

        <View style={styles.searchCard}>
          <Text style={styles.inputLabel}>Select Bible Reference</Text>

          <View style={styles.testamentSegment}>
            <TouchableOpacity
              style={[
                styles.testamentButton,
                selectedTestament === "old" && styles.testamentButtonSelected,
              ]}
              onPress={() => handleSelectTestament("old")}
            >
              <Text
                style={[
                  styles.testamentButtonText,
                  selectedTestament === "old" &&
                    styles.testamentButtonTextSelected,
                ]}
              >
                Old Testament
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.testamentButton,
                selectedTestament === "new" && styles.testamentButtonSelected,
              ]}
              onPress={() => handleSelectTestament("new")}
            >
              <Text
                style={[
                  styles.testamentButtonText,
                  selectedTestament === "new" &&
                    styles.testamentButtonTextSelected,
                ]}
              >
                New Testament
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.selector}
            onPress={() => setPickerType("book")}
          >
            <Text style={styles.selectorLabel}>Book</Text>
            <Text style={styles.selectorValue}>{selectedBook.name}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.selector, styles.halfSelector]}
              onPress={() => setPickerType("chapter")}
            >
              <Text style={styles.selectorLabel}>Chapter</Text>
              <Text style={styles.selectorValue}>{selectedChapter}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.selector, styles.halfSelector]}
              onPress={() => setPickerType("verse")}
            >
              <Text style={styles.selectorLabel}>Verse</Text>
              <Text style={styles.selectorValue}>{selectedVerse}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.referencePreview}>
            <Text style={styles.referencePreviewLabel}>Selected Reference</Text>
            <Text style={styles.referencePreviewText}>
              {selectedBook.name} {selectedChapter}:{selectedVerse}
            </Text>
          </View>

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

      <Modal
        visible={pickerType !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerType(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {pickerType === "book" && "Choose Book"}
              {pickerType === "chapter" && "Choose Chapter"}
              {pickerType === "verse" && "Choose Verse"}
            </Text>

            {pickerType === "book" && (
              <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.name}
                style={styles.list}
                renderItem={({ item }) => {
                  const isSelected = item.name === selectedBook.name;

                  return (
                    <TouchableOpacity
                      style={[
                        styles.optionItem,
                        isSelected && styles.optionItemSelected,
                      ]}
                      onPress={() => handleSelectBook(item)}
                    >
                      <Text
                        style={[
                          styles.optionTitle,
                          isSelected && styles.optionTitleSelected,
                        ]}
                      >
                        {item.name}
                      </Text>

                      <Text
                        style={[
                          styles.optionSubtitle,
                          isSelected && styles.optionSubtitleSelected,
                        ]}
                      >
                        {item.chapters} chapters
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            {pickerType === "chapter" && (
              <FlatList
                data={chapterOptions}
                keyExtractor={(item) => String(item)}
                numColumns={5}
                style={styles.list}
                renderItem={({ item }) => {
                  const isSelected = item === selectedChapter;

                  return (
                    <TouchableOpacity
                      style={[
                        styles.numberItem,
                        isSelected && styles.numberItemSelected,
                      ]}
                      onPress={() => handleSelectChapter(item)}
                    >
                      <Text
                        style={[
                          styles.numberText,
                          isSelected && styles.numberTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            {pickerType === "verse" && (
              <FlatList
                data={verseOptions}
                keyExtractor={(item) => String(item)}
                numColumns={5}
                style={styles.list}
                renderItem={({ item }) => {
                  const isSelected = item === selectedVerse;

                  return (
                    <TouchableOpacity
                      style={[
                        styles.numberItem,
                        isSelected && styles.numberItemSelected,
                      ]}
                      onPress={() => handleSelectVerse(item)}
                    >
                      <Text
                        style={[
                          styles.numberText,
                          isSelected && styles.numberTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPickerType(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    marginBottom: 12,
  },
  selector: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  selectorLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  selectorValue: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfSelector: {
    flex: 1,
  },
  referencePreview: {
    backgroundColor: "#F3E8DC",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  referencePreviewLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  referencePreviewText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "800",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    maxHeight: "82%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  list: {
    maxHeight: 440,
  },
  optionItem: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  optionItemSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  optionTitleSelected: {
    color: "#FFFFFF",
  },
  optionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  optionSubtitleSelected: {
    color: "#F5EDE4",
  },
  numberItem: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    margin: "1%",
    backgroundColor: Colors.background,
  },
  numberItemSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  numberText: {
    color: Colors.textPrimary,
    fontWeight: "800",
  },
  numberTextSelected: {
    color: "#FFFFFF",
  },
  closeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 12,
  },
  closeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "800",
  },
  testamentSegment: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  testamentButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  testamentButtonSelected: {
    backgroundColor: Colors.primary,
  },
  testamentButtonText: {
    color: Colors.textSecondary,
    fontWeight: "800",
    fontSize: 13,
  },
  testamentButtonTextSelected: {
    color: "#FFFFFF",
  },
});
