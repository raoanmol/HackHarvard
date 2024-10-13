import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";

// API URLs for fetching data
const API_BASE_URL = "http://172.232.13.68:5000";
const DEFANG_BASE_URL = "https://raoanmol-flask--5000.prod1.defang.dev/";

// Center coordinates for Petersburgh Florida
const tampaCenter = {
  latitude: 27.7676,
  longitude: -82.6403,
  radius: 10000, // 10 km radius for all services
};

// Helper function to handle timeouts for fetch requests
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
};

const GetHelpScreen = () => {
  // State to manage the map region
  const [region, setRegion] = useState({
    latitude: tampaCenter.latitude,
    longitude: tampaCenter.longitude,
    latitudeDelta: 0.1, // Zoom level around Tampa/Riverview
    longitudeDelta: 0.1,
  });

  // State to manage the active service type
  const [activeService, setActiveService] = useState(null);

  // State to manage the markers to be displayed on the map
  const [markers, setMarkers] = useState([]);

  // State to manage the flood zones polygons
  const [floodZones, setFloodZones] = useState([]);

  // State to manage the loading indicator
  const [loading, setLoading] = useState(false);

  // Function to fetch data based on the active service
  const fetchServiceData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await fetchWithTimeout(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json().catch(() => null);
      if (!data) {
        throw new Error("Invalid JSON response");
      }

      // Log the data to inspect the structure
      console.log(data);

      // Set markers based on the fetched data
      if (data.shelters) {
        setMarkers(
          data.shelters.map((shelter) => ({
            latitude: shelter.latitude,
            longitude: shelter.longitude,
            title: shelter.name,
            description: shelter.address,
          }))
        );
      } else if (data.clinics || data.doctors || data.health_posts) {
        const combinedLocations = [
          ...(data.clinics || []),
          ...(data.doctors || []),
          ...(data.health_posts || []),
        ];
        setMarkers(
          combinedLocations.map((location) => ({
            latitude: location.latitude,
            longitude: location.longitude,
            title: location.name,
          }))
        );
      } else if (data.drcs_within_radius) {
        setMarkers(
          data.drcs_within_radius.map((location) => ({
            latitude: location.latitude,
            longitude: location.longitude,
            title: location.name,
          }))
        );
      } else {
        setMarkers([]); // Empty array if no data is returned
      }
    } catch (error) {
      console.log("Error", `Failed to fetch service data: ${error.message}`);
    } finally {
      setLoading(false);
    }

    // Make the same API call to DEFANG and ignore the response
    try {
      await fetchWithTimeout(
        endpoint.replace(API_BASE_URL, DEFANG_BASE_URL),
        {},
        5000
      );
    } catch (error) {
      console.log("DEFANG request error (ignored):", error);
    }
  };

  // Fetch hardcoded flood zone data for Tampa/Riverview on component mount
  useEffect(() => {
    const floodZonePolygons = [
      {
        id: "flood1",
        coordinates: [
          { latitude: 27.765, longitude: -82.638 },
          { latitude: 27.768, longitude: -82.641 },
          { latitude: 27.77, longitude: -82.639 },
          { latitude: 27.7665, longitude: -82.637 },
        ],
      },
      {
        id: "flood2",
        coordinates: [
          { latitude: 27.771, longitude: -82.643 },
          { latitude: 27.772, longitude: -82.644 },
          { latitude: 27.773, longitude: -82.6435 },
          { latitude: 27.7715, longitude: -82.642 },
        ],
      },
    ];
    setFloodZones(floodZonePolygons);
  }, []);

  // Handle button toggle and fetch data based on the selected service
  const handleToggle = (service) => {
    setActiveService(service);
    setMarkers([]); // Clear existing markers when a new service is selected
    let endpoint;

    // Use Tampa/Riverview coordinates for all requests
    switch (service) {
      case "Shelters":
        endpoint = `${API_BASE_URL}/emergency_shelters/get/${tampaCenter.latitude}/${tampaCenter.longitude}/${tampaCenter.radius}`;
        break;
      case "Emergency Care":
        endpoint = `${API_BASE_URL}/health_stations/get/${tampaCenter.latitude}/${tampaCenter.longitude}/${tampaCenter.radius}`;
        break;
      case "Financial":
        endpoint = `${API_BASE_URL}/fema_drc/within_radius/${tampaCenter.latitude}/${tampaCenter.longitude}/${tampaCenter.radius}`;
        break;
      case "Supplies":
        // Random markers around Tampa/Riverview for now
        setMarkers([
          { latitude: 27.768, longitude: -82.641, title: "Supply Point 1" },
          { latitude: 27.7705, longitude: -82.6395, title: "Supply Point 2" },
        ]);
        return; // No need to fetch for this
      default:
        setMarkers([]);
        return;
    }

    fetchServiceData(endpoint);
  };

  // Open Google Maps for navigation when a marker is pressed
  const handleMarkerPress = (latitude, longitude, title) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", `Unable to open maps for ${title}`);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {/* Plot Flood Zones */}
        {floodZones.map((zone) => (
          <Polygon
            key={zone.id}
            coordinates={zone.coordinates}
            strokeColor="rgba(0, 0, 255, 0.7)" // Blue stroke color for flood polygons
            fillColor="rgba(0, 0, 255, 0.4)" // Blue fill color with transparency
          />
        ))}

        {/* Plot Markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() =>
              handleMarkerPress(marker.latitude, marker.longitude, marker.title)
            }
          />
        ))}
      </MapView>

      {/* Show loading indicator while fetching data */}
      {loading && (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      )}

      {/* Service selection buttons */}
      <View style={styles.gridButtonContainer}>
        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Shelters" && styles.activeButtonBlue,
          ]}
          onPress={() => handleToggle("Shelters")}
        >
          <Text
            style={[
              styles.pillText,
              activeService === "Shelters" && styles.activeTextWhite,
            ]}
          >
            Shelters
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Emergency Care" && styles.activeButtonBlue,
          ]}
          onPress={() => handleToggle("Emergency Care")}
        >
          <Text
            style={[
              styles.pillText,
              activeService === "Emergency Care" && styles.activeTextWhite,
            ]}
          >
            Emergency Care
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Financial" && styles.activeButtonBlue,
          ]}
          onPress={() => handleToggle("Financial")}
        >
          <Text
            style={[
              styles.pillText,
              activeService === "Financial" && styles.activeTextWhite,
            ]}
          >
            Financial
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.pillButton,
            activeService === "Supplies" && styles.activeButtonBlue,
          ]}
          onPress={() => handleToggle("Supplies")}
        >
          <Text
            style={[
              styles.pillText,
              activeService === "Supplies" && styles.activeTextWhite,
            ]}
          >
            Supplies
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { flex: 1 },
  gridButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  pillButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 8,
    alignItems: "center",
    width: "45%",
  },
  activeButtonWhite: { backgroundColor: "#FFFFFF" },
  activeButtonBlue: { backgroundColor: "#007AFF" },
  activeTextWhite: { color: "#FFFFFF" },
  activeTextBlue: { color: "#007AFF" },
  pillText: { fontSize: 16, color: "#007AFF" },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -25,
    marginTop: -25,
  },
});

export default GetHelpScreen;
