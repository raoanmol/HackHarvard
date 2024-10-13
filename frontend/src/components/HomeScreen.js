import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Main component for the Home Screen
const HomeScreen = () => {
  const navigation = useNavigation();

  // Array of news articles related to disaster relief and preparedness
  const newsArticles = [
    {
      title: "How to Create a Family Emergency Preparedness Plan",
      summary:
        "Learn how to develop a comprehensive plan to ensure your family’s safety during emergencies.",
      url: "https://www.ready.gov/plan",
      image:
        "https://www.cityofirvine.org/sites/default/files/styles/large_feature_image/public/EM.jpg?itok=EW-fBX2D", // Public domain family planning image
    },
    {
      title: "American Red Cross Shares Vital Flood Safety Tips",
      summary:
        "Explore essential flood safety tips from the American Red Cross to stay prepared.",
      url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/flood.html",
      image:
        "https://www.weather.gov/images/wrn/Infographics/2021/ww-flood.png", // Public domain flood image
    },
    {
      title:
        "Hurricane Idalia Makes Landfall in Florida, Causing Widespread Damage",
      summary:
        "An in-depth report on Hurricane Idalia’s impact on Florida and the aftermath.",
      url: "https://www.cnn.com/2023/08/30/weather/hurricane-idalia-florida/index.html",
      image:
        "https://weartv.com/resources/media/67b58640-1b51-4c41-b23e-456853d2fc46-large16x9_FdsTbqzXkAAg3m.jpg?1664314590602", // Image from Wikipedia
    },
    {
      title: "Preparing for Natural Disasters: Essential Steps to Stay Safe",
      summary:
        "Discover key actions you can take to prepare for natural disasters and protect yourself.",
      url: "https://www.npr.org/2023/09/05/preparing-for-natural-disasters-guide",
      image:
        "https://www.allenschool.edu/wp-content/uploads/2018/09/How-to-Prepare-for-a-Natural-Disaster.jpg", // Sample public domain image
    },
    {
      title: "FEMA Mobilizes Resources in Response to Recent Hurricanes",
      summary:
        "Find out how FEMA is responding to recent hurricanes and supporting affected communities.",
      url: "https://www.fema.gov/press-release/2023/09/01/fema-response-hurricane-idalia",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQM1AMzS0ZYFa1edgZ9hkxRRWGilbwbr87BQ&s", // FEMA response image
    },
  ];

  // Function to handle external linking to news articles
  const openNewsLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to Crisis Companion</Text>
        <Text style={styles.subtitleText}>
          Your essential guide to disaster preparedness, first aid, and staying
          safe during emergencies.
        </Text>
      </View>

      {/* First Aid Guide Button */}
      <View style={styles.firstAidContainer}>
        <TouchableOpacity
          style={styles.firstAidButton}
          onPress={() => navigation.navigate("FirstAidGuide")}
        >
          <Text style={styles.firstAidText}>First Aid Guide</Text>
        </TouchableOpacity>
      </View>

      {/* News Articles Section */}
      <View style={styles.newsContainer}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        {newsArticles.map((article, index) => (
          <Card
            key={index}
            style={styles.newsCard}
            onPress={() => openNewsLink(article.url)}
          >
            {/* News Image */}
            <Image
              source={{ uri: article.image }}
              style={styles.newsImage}
              resizeMode="cover"
            />
            {/* News Title and Summary */}
            <View style={styles.cardContent}>
              <Text style={styles.newsTitle}>{article.title}</Text>
              <Text style={styles.newsSummary}>{article.summary}</Text>
              <Text style={styles.readMore}>Read more</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles for the Home Screen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000", // Dark mode background color
  },
  welcomeContainer: {
    marginTop: 40,
    alignItems: "center",
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF", // Dark mode text color
    textAlign: "center",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: "#A9A9A9", // Dark mode subtitle text color
    textAlign: "center",
    marginHorizontal: 20,
  },
  firstAidContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  firstAidButton: {
    backgroundColor: "#0A84FF", // Dark mode button color
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  firstAidText: {
    color: "#FFFFFF", // Dark mode button text color
    fontSize: 18,
    fontWeight: "600",
  },
  newsContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF", // Dark mode section title color
    marginBottom: 15,
  },
  newsCard: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#1C1C1E", // Dark mode card background color
    elevation: 2,
  },
  newsImage: {
    height: 150,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // Dark mode news title color
  },
  newsSummary: {
    marginTop: 5,
    fontSize: 14,
    color: "#A9A9A9", // Dark mode summary text color
  },
  readMore: {
    marginTop: 5,
    fontSize: 14,
    color: "#0A84FF", // Dark mode read more text color
    fontWeight: "600",
  },
});

export default HomeScreen;
