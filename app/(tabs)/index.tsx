import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../src/constants/colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/main-images/bible-logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bible App</Text>
        <Text style={styles.subtitle}>Read. Reflect. Grow.</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Daily Verse</Text>

          <Text style={styles.verseText}>
            “For God so loved the world, that he gave his only begotten Son.”
          </Text>

          <Text style={styles.reference}>John 3:16</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
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
  cardLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 12,
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
});
