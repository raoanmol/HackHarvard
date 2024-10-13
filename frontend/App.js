// Import necessary libraries and components
import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MainNavigator from "./src/navigation/MainNavigator";
import GetHelpScreen from "./src/components/GetHelpScreen";
import { useColorScheme } from "react-native";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  // Get the current color scheme (light or dark mode)
  const scheme = useColorScheme();

  return (
    // Set up the navigation container with a dark theme
    <NavigationContainer theme={DarkTheme}>
      {/* Configure the bottom tab navigator */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Define the icons for each tab based on the route name
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Get Help") {
              iconName = focused ? "medkit" : "medkit-outline";
            }
            // Return the appropriate icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Set the active and inactive tint colors for the tab bar
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          // Set the style for the tab bar
          tabBarStyle: {
            backgroundColor: "rgba(28, 28, 30, 0.98)", // Dark transparent background
          },
        })}
      >
        {/* Define the Home tab with MainNavigator as the component */}
        <Tab.Screen
          name="Home"
          component={MainNavigator}
          options={{ headerShown: false }} // Hide the default header in tabs
        />
        {/* Define the Get Help tab with GetHelpScreen as the component */}
        <Tab.Screen
          name="Get Help"
          component={GetHelpScreen}
          options={{ headerShown: false }} // Hide the default header in tabs
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Export the App component as the default export
export default App;
