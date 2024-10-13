import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Main component for the First Aid Guide
const FirstAidGuide = () => {
  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState({});

  // Function to toggle the visibility of a section
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Text */}
      <Text style={styles.headerText}>First Aid Guide</Text>
      <Text style={styles.description}>
        This guide provides essential first aid tips and emergency preparedness
        information for various situations.
      </Text>

      {/* General First Aid Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("general")}
      >
        <Text style={styles.sectionTitle}>General First Aid Tips</Text>
      </TouchableOpacity>
      {expandedSections["general"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **Cuts and Scrapes**: Clean with water and soap, apply antiseptic,
            and cover with a bandage.
          </Text>
          <Text style={styles.bullet}>
            • **Burns**: Cool under running water for 10 minutes, apply a
            sterile dressing, and seek medical care for severe burns.
          </Text>
          <Text style={styles.bullet}>
            • **Choking**: Perform the Heimlich maneuver or encourage coughing
            if the person can still breathe.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-123-4567</Text>
        </View>
      )}

      {/* Hurricane Preparedness Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("hurricane")}
      >
        <Text style={styles.sectionTitle}>Hurricane Preparedness</Text>
      </TouchableOpacity>
      {expandedSections["hurricane"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **Before the Hurricane**: Secure your home, prepare emergency
            kits, and know your evacuation routes.
          </Text>
          <Text style={styles.bullet}>
            • **During the Hurricane**: Stay indoors, avoid windows, and
            evacuate if directed by authorities.
          </Text>
          <Text style={styles.bullet}>
            • **Post-Hurricane**: Treat minor injuries, avoid debris, and stay
            away from downed power lines.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-456-7890</Text>
        </View>
      )}

      {/* Flood Emergency First Aid Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("flood")}
      >
        <Text style={styles.sectionTitle}>Flood Emergency First Aid</Text>
      </TouchableOpacity>
      {expandedSections["flood"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **Before the Flood**: Move valuables to higher ground and prepare
            emergency supplies.
          </Text>
          <Text style={styles.bullet}>
            • **During the Flood**: Move to higher ground and avoid walking or
            driving through floodwaters.
          </Text>
          <Text style={styles.bullet}>
            • **Post-Flood**: Treat wounds with antiseptic, stay hydrated, and
            avoid downed power lines.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-987-6543</Text>
        </View>
      )}

      {/* Tornado Safety and First Aid Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("tornado")}
      >
        <Text style={styles.sectionTitle}>Tornado Safety and First Aid</Text>
      </TouchableOpacity>
      {expandedSections["tornado"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **During a Tornado**: Take shelter in a basement or interior room,
            covering your head and neck.
          </Text>
          <Text style={styles.bullet}>
            • **Post-Tornado**: Check for injuries and administer basic first
            aid.
          </Text>
          <Text style={styles.bullet}>
            • **Stay away from fallen debris and power lines**.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-654-3210</Text>
        </View>
      )}

      {/* Earthquake Safety and First Aid Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("earthquake")}
      >
        <Text style={styles.sectionTitle}>Earthquake Safety and First Aid</Text>
      </TouchableOpacity>
      {expandedSections["earthquake"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **During an Earthquake**: Drop, cover, and hold on. Stay indoors
            away from windows.
          </Text>
          <Text style={styles.bullet}>
            • **Post-Earthquake**: Treat injuries, monitor for signs of shock,
            and avoid entering damaged buildings.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-333-4567</Text>
        </View>
      )}

      {/* Heat Exhaustion and Heatstroke Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("heat")}
      >
        <Text style={styles.sectionTitle}>Heat Exhaustion and Heatstroke</Text>
      </TouchableOpacity>
      {expandedSections["heat"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **Heat Exhaustion**: Move to a cool place, sip water, and apply
            cool cloths.
          </Text>
          <Text style={styles.bullet}>
            • **Heatstroke**: Call emergency services, cool the person rapidly
            using water or ice, and avoid giving fluids if unconscious.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-777-8888</Text>
        </View>
      )}

      {/* Cold Exposure and Hypothermia Section */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection("hypothermia")}
      >
        <Text style={styles.sectionTitle}>Cold Exposure and Hypothermia</Text>
      </TouchableOpacity>
      {expandedSections["hypothermia"] && (
        <View style={styles.content}>
          <Text style={styles.bullet}>
            • **Hypothermia**: Move to a warm place, remove wet clothing, and
            gradually warm the body using blankets or body heat.
          </Text>
          <Text style={styles.bullet}>
            • Seek emergency medical help if the person shows signs of confusion
            or unconsciousness.
          </Text>
          <Text style={styles.helpline}>Helpline: 1-800-888-9999</Text>
        </View>
      )}

      {/* Link to Detailed Guide */}
      <View style={styles.linkContainer}>
        <Text style={styles.detailedGuide}>
          For more detailed information, visit the{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/anatomy-of-a-first-aid-kit.html"
              )
            }
          >
            American Red Cross First Aid Guide
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000000" },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#A9A9A9",
    marginBottom: 20,
  },
  sectionHeader: {
    padding: 15,
    backgroundColor: "#1C1C1E",
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#FFFFFF" },
  content: { paddingHorizontal: 15, paddingBottom: 5 },
  bullet: { fontSize: 16, marginVertical: 5, color: "#FFFFFF" },
  helpline: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A84FF",
  },
  detailedGuide: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: "#A9A9A9",
  },
  link: {
    color: "#0A84FF",
    textDecorationLine: "underline",
  },
  linkContainer: {
    marginTop: 20,
  },
});

export default FirstAidGuide;
