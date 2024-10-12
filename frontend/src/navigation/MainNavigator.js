import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../components/HomeScreen";
import GetHelpScreen from "../components/GetHelpScreen";
import { Ionicons } from "@expo/vector-icons";

/**
 * MainNavigator Component
 * Handles tab navigation between Home and Get Help.
 */
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home"; // Icon for Home tab
            } else if (route.name === "Get Help") {
              iconName = "alert-circle"; // Icon for Get Help tab (Warning sign)
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Get Help" component={GetHelpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
