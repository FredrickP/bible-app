import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../src/constants/colors";
import {
  bibleTranslationOptions,
  DEFAULT_TRANSLATION,
  getTranslationLabel,
} from "../../src/constants/translations";
import {
  getDailyVerseReference,
  getVerseByReference,
} from "../../src/services/bibleApi";
import {
  getSavedTranslation,
  saveTranslation,
} from "../../src/storage/translationStorage";
import { BibleVerse } from "../../src/types/bible";
import { BibleTranslation } from "../../src/types/translation";

export default function HomeScreen() {
  const [dailyVerse, setDailyVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [translation, setTranslation] =
    useState<BibleTranslation>(DEFAULT_TRANSLATION);
  const [isTranslationModalVisible, setIsTranslationModalVisible] =
    useState(false);

  useEffect(() => {
    async function initHome() {
      const savedTranslation = await getSavedTranslation();

      setTranslation(savedTranslation);
      await loadDailyVerse(savedTranslation);
    }

    initHome();
  }, []);

  async function loadDailyVerse(activeTranslation: BibleTranslation) {
    setIsLoading(true);

    const verse = await getVerseByReference(
      getDailyVerseReference(),
      activeTranslation,
    );

    setDailyVerse(verse);
    setIsLoading(false);
  }

  async function handleChangeTranslation(
    selectedTranslation: BibleTranslation,
  ) {
    setTranslation(selectedTranslation);
    await saveTranslation(selectedTranslation);
    setIsTranslationModalVisible(false);
    await loadDailyVerse(selectedTranslation);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <View />

          <TouchableOpacity
            style={styles.translationButton}
            onPress={() => setIsTranslationModalVisible(true)}
          >
            <Text style={styles.translationButtonText}>
              {translation.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/main-images/bible-logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bible App</Text>
        <Text style={styles.subtitle}>Read. Reflect. Grow.</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Daily Verse</Text>
            <Text style={styles.todayLabel}>Today</Text>
          </View>

          {isLoading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : dailyVerse ? (
            <>
              <Text style={styles.verseText}>“{dailyVerse.text}”</Text>
              <Text style={styles.reference}>{dailyVerse.reference}</Text>

              <Text style={styles.translationName}>
                {dailyVerse.translationName ?? getTranslationLabel(translation)}
              </Text>
            </>
          ) : (
            <Text style={styles.errorText}>Failed to load daily verse.</Text>
          )}
        </View>

        <View style={styles.menuGrid}>
          <Link href="/search" asChild>
            <TouchableOpacity style={styles.menuCard}>
              <Text style={styles.menuIcon}>🔎</Text>
              <Text style={styles.menuTitle}>Search Verse</Text>
              <Text style={styles.menuSubtitle}>Find scripture</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/bookmarks" asChild>
            <TouchableOpacity style={styles.menuCard}>
              <Text style={styles.menuIcon}>🔖</Text>
              <Text style={styles.menuTitle}>Bookmarks</Text>
              <Text style={styles.menuSubtitle}>Saved verses</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      <Modal
        visible={isTranslationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsTranslationModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Bible Translation</Text>

            <ScrollView style={styles.translationList}>
              {bibleTranslationOptions.map((item) => {
                const isSelected = translation === item.code;

                return (
                  <TouchableOpacity
                    key={item.code}
                    style={[
                      styles.translationOption,
                      isSelected && styles.translationOptionSelected,
                    ]}
                    onPress={() => handleChangeTranslation(item.code)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.translationOptionTitle,
                          isSelected && styles.translationOptionTitleSelected,
                        ]}
                      >
                        {item.label}
                      </Text>

                      <Text
                        style={[
                          styles.translationOptionDescription,
                          isSelected &&
                            styles.translationOptionDescriptionSelected,
                        ]}
                      >
                        {item.language} • {item.description}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.checkText,
                        isSelected && styles.checkTextSelected,
                      ]}
                    >
                      {isSelected ? "✓" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsTranslationModalVisible(false)}
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
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  translationButton: {
    backgroundColor: Colors.card,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  translationButtonText: {
    color: Colors.primary,
    fontWeight: "800",
  },
  logoImage: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.primary,
  },
  todayLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  verseText: {
    fontSize: 20,
    lineHeight: 30,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  reference: {
    marginTop: 16,
    color: Colors.secondary,
    fontWeight: "800",
  },
  translationName: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    color: Colors.danger,
  },
  menuGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  menuCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  menuTitle: {
    color: Colors.textPrimary,
    fontWeight: "800",
    fontSize: 15,
  },
  menuSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
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
  translationList: {
    maxHeight: 460,
  },
  translationOption: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  translationOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  translationOptionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  translationOptionTitleSelected: {
    color: "#FFFFFF",
  },
  translationOptionDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  translationOptionDescriptionSelected: {
    color: "#F5EDE4",
  },
  checkText: {
    width: 24,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: Colors.primary,
  },
  checkTextSelected: {
    color: "#FFFFFF",
  },
  closeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 8,
  },
  closeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "800",
  },
});
