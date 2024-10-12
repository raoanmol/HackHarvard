from rapidfuzz import fuzz
import subprocess
import json

GOOGLE_API_KEY = ""

def get_health_stations(query, lat, lon, radius=16010):
    curl_command = f'curl "https://nominatim.openstreetmap.org/search?format=json&q={query}&lat={lat}&lon={lon}&radius={radius}"'

    result = subprocess.run(curl_command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        health_stations = [(item['lat'], item['lon'], item['display_name'], item['boundingbox']) for item in data]
        return health_stations
    else:
        return []
    
def is_open(osm_name, lat, lon):
    curl_command = f'curl "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=5000&type=hospital&key=GOOGLE_API_KEY&fields=name,geometry,opening_hours"'

    result = subprocess.run(curl_command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        most_accurate = 0
        final_place = ""
        for item in data:
            if name_matching(item['name'], osm_name) > most_accurate:
                most_accurate = name_matching(item['name'])
                final_place = item

        if final_place['open_now'] == 'true':
            return "It's open"
        else:
            return "It's closed"
        
    else:
        return "Couldn't get data from google"
    
def name_matching(google_name, osm_name):
    google_name_normalized = google_name.strip().lower()
    osm_name_normalized = osm_name.strip().lower()

    similarity_score = fuzz.token_sort_ration(google_name_normalized, osm_name_normalized)

    return similarity_score

# Usage
latitude = 34.0522
longitude = -118.2437

hospitals = get_health_stations("hospital", latitude, longitude)
for item in hospitals:
    print(is_open(item['name'], item['lat'], item['lon']))
    
    
print(hospitals)
# clinics = get_health_stations("clinic", latitude, longitude)
# pharmacies = get_health_stations("pharmacy", latitude, longitude)
# doctors = get_health_stations("doctors", latitude, longitude)
# health_posts = get_health_stations("health_post", latitude, longitude)

# print("Hospitals:", hospitals)
# print("Clinics:", clinics)
# print("Pharmacies:", pharmacies)
# print("Doctors:", doctors)
# print("Health Posts:", health_posts)
