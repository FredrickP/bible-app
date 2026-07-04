import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Colors } from "../../src/constants/colors";

export default function BookmarksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <Text style={styles.subtitle}>Bookmarks page is ready.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginTop: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});
