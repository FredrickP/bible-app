import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../src/constants/colors";
import {
  getDailyVerseReference,
  getVerseByReference,
} from "../../src/services/bibleApi";
import { BibleVerse } from "../../src/types/bible";

export default function HomeScreen() {
  const [dailyVerse, setDailyVerse] = useState<BibleVerse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDailyVerse() {
      setIsLoading(true);

      const verse = await getVerseByReference(getDailyVerseReference());

      setDailyVerse(verse);
      setIsLoading(false);
    }

    loadDailyVerse();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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

              {!!dailyVerse.translationName && (
                <Text style={styles.translationName}>
                  {dailyVerse.translationName}
                </Text>
              )}
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
});
