import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Polygon } from "react-native-maps";

/**
 * GetHelpScreen Component
 * Displays a map centered on Florida with precise flood polygons and toggle buttons.
 */
const GetHelpScreen = () => {
  const [region, setRegion] = useState({
    latitude: 27.9944024, // Florida's Latitude
    longitude: -81.7602544, // Florida's Longitude
    latitudeDelta: 3, // Zoom level to cover Florida state
    longitudeDelta: 3,
  });
  const [floodData, setFloodData] = useState([]); // Flood polygons data
  const [activeService, setActiveService] = useState(null); // Active service (e.g., Shelters)
  const [loading, setLoading] = useState(true); // Loading state for fetching flood data
  const [error, setError] = useState(null); // Error state

  // Generate precise polygons for flood zones in Florida
  const generateFloodPolygons = () => {
    return [
      // Tampa Flood Polygon
      {
        id: "tampa-flood",
        coordinates: [
          { latitude: 27.9506, longitude: -82.4572 },
          { latitude: 27.9606, longitude: -82.4672 },
          { latitude: 27.9706, longitude: -82.4572 },
          { latitude: 27.9606, longitude: -82.4472 },
        ],
      },
      // Miami Flood Polygon
      {
        id: "miami-flood",
        coordinates: [
          { latitude: 25.7617, longitude: -80.1918 },
          { latitude: 25.7717, longitude: -80.2018 },
          { latitude: 25.7817, longitude: -80.1918 },
          { latitude: 25.7717, longitude: -80.1818 },
        ],
      },
      // Orlando Flood Polygon
      {
        id: "orlando-flood",
        coordinates: [
          { latitude: 28.5383, longitude: -81.3792 },
          { latitude: 28.5483, longitude: -81.3892 },
          { latitude: 28.5583, longitude: -81.3792 },
          { latitude: 28.5483, longitude: -81.3692 },
        ],
      },
      // Jacksonville Flood Polygon
      {
        id: "jacksonville-flood",
        coordinates: [
          { latitude: 30.3322, longitude: -81.6557 },
          { latitude: 30.3422, longitude: -81.6657 },
          { latitude: 30.3522, longitude: -81.6557 },
          { latitude: 30.3422, longitude: -81.6457 },
        ],
      },
    ];
  };

  // Fetch flood data
  useEffect(() => {
    try {
      const polygons = generateFloodPolygons(); // Get the flood polygons for Florida
      setFloodData(polygons);
    } catch (error) {
      setError("Error generating flood data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle service button toggling
  const handleToggle = (service) => {
    setActiveService((prevService) =>
      prevService === service ? null : service
    );
  };

  return (
    <View style={styles.container}>
      {/* Map Section */}
      {region ? (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          {/* Plot flood polygons */}
          {floodData.map((flood) => (
            <Polygon
              key={flood.id}
              coordinates={flood.coordinates}
              strokeColor="rgba(0, 0, 255, 0.7)" // Blue stroke color for flood polygons
              fillColor="rgba(0, 0, 255, 0.4)" // Blue fill color with transparency
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {/* Error Handling */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Buttons for toggling services */}
      <View style={styles.gridButtonContainer}>
        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Shelters" && styles.activeButton,
          ]}
          onPress={() => handleToggle("Shelters")}
        >
          <Text style={styles.pillText}>Shelters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Supplies" && styles.activeButton,
          ]}
          onPress={() => handleToggle("Supplies")}
        >
          <Text style={styles.pillText}>Supplies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Emergency Care" && styles.activeButton,
          ]}
          onPress={() => handleToggle("Emergency Care")}
        >
          <Text style={styles.pillText}>Emergency Care</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Financial" && styles.activeButton,
          ]}
          onPress={() => handleToggle("Financial")}
        >
          <Text style={styles.pillText}>Financial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { flex: 1 },
  gridButtonContainer: {
    position: "absolute", // Float buttons on top of the map
    bottom: 20, // Adjust distance from the bottom
    left: 0,
    right: 0,
    flexDirection: "row",
    flexWrap: "wrap", // Allow buttons to wrap into multiple rows (grid)
    justifyContent: "space-around", // Space the buttons evenly
    paddingHorizontal: 15,
  },
  pillButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 8,
    alignItems: "center",
    width: "45%", // Adjust button width to fit in grid
  },
  activeButton: { backgroundColor: "#005BB5" },
  pillText: { fontSize: 16, color: "#ffffff" },
  errorText: { color: "red", textAlign: "center", marginTop: 10 },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -25,
    marginTop: -25,
  },
});

export default GetHelpScreen;
