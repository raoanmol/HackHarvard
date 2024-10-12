import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * HomeScreen Component
 * Displays "Hello World" on the home tab.
 */
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
});

export default HomeScreen;
