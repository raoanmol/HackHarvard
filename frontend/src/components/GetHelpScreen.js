import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Polygon } from "react-native-maps";

/**
 * GetHelpScreen Component
 * Fetches and plots hurricane path data and flood zones for Florida.
 */
const GetHelpScreen = () => {
  const [region, setRegion] = useState({
    latitude: 27.9944024, // Centered in Florida
    longitude: -81.7602544,
    latitudeDelta: 3, // Zoom level to cover the state
    longitudeDelta: 3,
  });
  const [hurricaneCone, setHurricaneCone] = useState([]); // Cone of the hurricane
  const [floodData, setFloodData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch both hurricane and flood data when the component mounts
    fetchHurricaneData();
    generateFloodData();
  }, []);

  // Function to fetch hurricane path data from NOAA API
  const fetchHurricaneData = async () => {
    try {
      const response = await fetch(
        `https://api.weather.gov/alerts/active?event=hurricane&point=27.9944024,-81.7602544`
      );
      const data = await response.json();
      const path = extractHurricaneCone(data.features);
      setHurricaneCone(path);
    } catch (error) {
      setError("Error fetching hurricane data");
    }
  };

  // Extract the hurricane cone from the NOAA API response and expand it
  const extractHurricaneCone = (features) => {
    const conePoints = []; // Array to store points for the cone polygon

    features.forEach((feature) => {
      if (feature.geometry && feature.geometry.type === "Polygon") {
        const coordinates = feature.geometry.coordinates[0];
        const expandedCoordinates = coordinates.map(([lng, lat]) => ({
          latitude: lat * 1.5, // Expanding latitude for visibility
          longitude: lng * 1.5, // Expanding longitude for visibility
        }));
        conePoints.push(...expandedCoordinates);
      }
    });

    return conePoints;
  };

  // Function to generate multiple smaller flood zones within Florida
  const generateFloodData = () => {
    const floodZones = [];
    const numberOfZones = 10; // Number of flood zones
    const radius = 500; // 500km radius around Florida

    for (let i = 0; i < numberOfZones; i++) {
      const centralPoint = generateRandomPoint(region, radius);
      for (let j = 0; j < 5; j++) {
        const smallerPolygonCenter = generateRandomPoint(centralPoint, 10);
        floodZones.push({
          id: `flood-${i}-${j}`,
          coordinates: createFloodPolygon(smallerPolygonCenter, 2), // Smaller flood zones
        });
      }
    }

    setFloodData(floodZones);
  };

  // Helper function to generate a random point within a given radius
  const generateRandomPoint = (center, radiusInKm) => {
    const radiusInDegrees = radiusInKm / 111;
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const latOffset = w * Math.cos(t);
    const lngOffset =
      (w * Math.sin(t)) / Math.cos(center.latitude * (Math.PI / 180));

    return {
      latitude: center.latitude + latOffset,
      longitude: center.longitude + lngOffset,
    };
  };

  // Helper function to create a polygon around a point (simulating a flood zone)
  const createFloodPolygon = (center, sizeInKm) => {
    const radiusInDegrees = sizeInKm / 111;
    const polygonCoords = [];

    for (let i = 0; i < 360; i += 45) {
      const angleRad = (i * Math.PI) / 180;
      const latOffset = radiusInDegrees * Math.cos(angleRad);
      const lngOffset =
        (radiusInDegrees * Math.sin(angleRad)) /
        Math.cos(center.latitude * (Math.PI / 180));

      polygonCoords.push({
        latitude: center.latitude + latOffset,
        longitude: center.longitude + lngOffset,
      });
    }

    return polygonCoords;
  };

  return (
    <View style={styles.container}>
      {/* Map section */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {error && <Text>{error}</Text>}

        {/* Plot hurricane cone */}
        {hurricaneCone.length > 0 && (
          <Polygon
            coordinates={hurricaneCone}
            strokeColor="rgba(255, 0, 0, 0.8)" // Red cone for the hurricane path
            fillColor="rgba(255, 0, 0, 0.5)" // Semi-transparent red for the cone area
          />
        )}

        {/* Plot flood zones */}
        {floodData.map((flood) => (
          <Polygon
            key={flood.id}
            coordinates={flood.coordinates}
            strokeColor="rgba(0, 0, 255, 0.7)" // Outline of the flood zone
            fillColor="rgba(0, 0, 255, 0.4)" // Fill color for the flood zone
          />
        ))}
      </MapView>

      {/* Buttons section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pillButton}>
          <Text style={styles.pillText}>Shelters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pillButton}>
          <Text style={styles.pillText}>Supplies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pillButton}>
          <Text style={styles.pillText}>Emergency Care</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pillButton}>
          <Text style={styles.pillText}>Financial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  pillButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 8,
    alignItems: "center",
  },
  pillText: {
    fontSize: 16,
    color: "#333",
  },
});

export default GetHelpScreen;
