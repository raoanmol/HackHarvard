import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import FirstAidGuide from "../components/FirstAidGuide";

// Create a stack navigator
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // Apply global screen options for all screens in the stack
        headerStyle: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark translucent background for the header
        },
        headerTintColor: "#fff", // Set header text color to white for better readability
        headerTitleAlign: "center", // Center align the title in the header
        headerTitleStyle: {
          fontWeight: "bold", // Make the header title bold
          fontSize: 24, // Set the font size of the header title
        },
      }}
    >
      {/* Define the HomeScreen route */}
      <Stack.Screen
        name="MainHome"
        component={HomeScreen}
        options={{
          headerShown: false, // Hide the header for the HomeScreen
        }}
      />
      {/* Define the FirstAidGuide route */}
      <Stack.Screen
        name="FirstAidGuide"
        component={FirstAidGuide}
        options={{
          headerTitle: "Guide", // Set the title for the FirstAidGuide screen
          headerBackTitle: "Home", // Customize the back button label to "Home"
          headerShown: true, // Show the header for the FirstAidGuide screen
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
