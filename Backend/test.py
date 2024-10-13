import requests
from geopy.geocoders import Nominatim
import folium

# Initialize geolocator
geolocator = Nominatim(user_agent="flood_mapper")

def fetch_flood_warnings():
    # Replace this with the actual API call to fetch flood warnings
    # For demonstration purposes, this function returns dummy data
    return [
        {
            'message': 'Flood Watch issued October 9 at 5:18PM EDT until October 10 at 6:00PM EDT by NWS Jacksonville FL',
            'areas': ['Bradford', 'Central Marion', 'Eastern Alachua', 'Western Alachua']
        },
        {
            'message': 'Flood Watch issued October 8 at 11:03PM EDT until October 10 at 6:00PM EDT by NWS Jacksonville FL',
            'areas': ['Baker', 'Coastal Duval', 'Coastal Flagler', 'Eastern Clay']
        }
    ]

def geocode_area(area):
    try:
        location = geolocator.geocode(area, timeout=5)
        return location
    except Exception as e:
        print(f"Error geocoding {area}: {e}")  # Log the error
        return None

def find_flood_warning_and_show_map(lat, lon):
    flood_warnings = fetch_flood_warnings()
    geocoded_areas = set()  # Track areas that were successfully geocoded
    unsuccessful_geocodes = set()  # Track areas that failed to geocode

    for warning in flood_warnings:
        areas = warning['areas']
        for area in areas:
            if area in unsuccessful_geocodes or area in geocoded_areas:
                continue  # Skip areas already attempted

            geocoded_location = geocode_area(area)
            if geocoded_location:
                geocoded_areas.add(area)  # Mark as successfully geocoded
                print(f"Geocoded {area}: {geocoded_location.latitude}, {geocoded_location.longitude}")
                # You can add logic to plot this on a map here
            else:
                unsuccessful_geocodes.add(area)  # Mark as unsuccessful
                print(f"Could not geocode area: {area}")

    # Create a map centered at the provided coordinates
    flood_map = folium.Map(location=[lat, lon], zoom_start=8)

    # Optionally add markers for successfully geocoded areas
    for area in geocoded_areas:
        location = geocode_area(area)
        if location:
            folium.Marker(
                [location.latitude, location.longitude],
                popup=area,
            ).add_to(flood_map)

    # Save the map to an HTML file
    flood_map.save('flood_warnings_map.html')
    print("Map saved as 'flood_warnings_map.html'.")

# Replace with desired coordinates
find_flood_warning_and_show_map(29.651634, -82.324829)
