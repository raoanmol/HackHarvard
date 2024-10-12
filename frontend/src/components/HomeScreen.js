import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * HomeScreen Component
 * Displays a welcome message for the disaster relief app.
 */
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Disaster Relief App</Text>
      {/* Additional content can be added here if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8", // Light background color
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default HomeScreen;
