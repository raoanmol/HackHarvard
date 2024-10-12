from rapidfuzz import fuzz
import subprocess
import json
import math
from flask import Blueprint

health_stations_bp = Blueprint('health_stations', __name__)

GOOGLE_API_KEY = "AIzaSyCjIhGHifYkVaMqqIQSdAn5ywqvk52u6HY"

@health_stations_bp.route('/get/<float:lat>/<float:lon>/<float:radius>', methods=['GET'])
def get_health_stations(lat, lon, radius):
    hospitals = get_health_stations("hospital", lat, lon, radius)
    for item in hospitals:
        print(is_open(item[2], item[0], item[1]))
    print("Hospitals:", hospitals)


    clinics = get_health_stations("clinic", lat, lon, radius)
    for item in clinics:
        print(is_open(item[2], item[0], item[1]))
    print("Clinics:", clinics)

    pharmacy = get_health_stations("pharmacy", lat, lon, radius)
    for item in pharmacy:
        print(is_open(item[2], item[0], item[1]))
    print("Pharmacies:", pharmacy)

    doctors = get_health_stations("doctors", lat, lon, radius)
    for item in doctors:
        print(is_open(item[2], item[0], item[1]))
    print("Doctors:", doctors)

    health_posts = get_health_stations("health_post", lat, lon, radius)
    for item in health_posts:
        print(is_open(item[2], item[0], item[1]))
    print("Health Posts:", health_posts)

def station_locations(query, lat, lon, radius):
    curl_command = f'curl "https://nominatim.openstreetmap.org/search?format=json&q={query}&lat={lat}&lon={lon}&radius={radius}"'

    result = subprocess.run(curl_command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        health_stations = []

        for item in data:
            station_lat = float(item['lat'])
            station_lon = float(item['lon'])
            distance = haversine(lat, lon, station_lat, station_lon)

            if distance <= radius:
                health_stations.append((station_lat, station_lon, item['display_name'], distance))

        return health_stations
    else:
        return []
    
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * (math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c
    
def is_open(osm_name, lat, lon):
    curl_command = f'curl "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius=5000&type=hospital&key={GOOGLE_API_KEY}&fields=name,geometry,opening_hours"'

    result = subprocess.run(curl_command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        data = json.loads(result.stdout)
        most_accurate = 0
        final_place = None

        for item in data.get('results', []):  # Iterate over 'results' in the response
            score = name_matching(item['name'], osm_name)
            if score > most_accurate:
                most_accurate = score
                final_place = item

        if final_place and 'opening_hours' in final_place and final_place['opening_hours'].get('open_now'):
            return True
        else:
            return False
    else:
        return False
    
def name_matching(google_name, osm_name):
    google_name_normalized = google_name.strip().lower()
    osm_name_normalized = osm_name.strip().lower()

    similarity_score = fuzz.token_sort_ratio(google_name_normalized, osm_name_normalized)

    return similarity_score

# # Usage
# latitude = 28.391988
# longitude = -80.928436

# hospitals = get_health_stations("hospital", latitude, longitude)
# for item in hospitals:
#     print(is_open(item[2], item[0], item[1]))
# print("Hospitals:", hospitals)


# clinics = get_health_stations("clinic", latitude, longitude)
# for item in clinics:
#     print(is_open(item[2], item[0], item[1]))
# print("Clinics:", clinics)

# pharmacy = get_health_stations("pharmacy", latitude, longitude)
# for item in pharmacy:
#     print(is_open(item[2], item[0], item[1]))
# print("Pharmacies:", pharmacy)

# doctors = get_health_stations("doctors", latitude, longitude)
# for item in doctors:
#     print(is_open(item[2], item[0], item[1]))
# print("Doctors:", doctors)

# health_posts = get_health_stations("health_post", latitude, longitude)
# for item in health_posts:
#     print(is_open(item[2], item[0], item[1]))
# print("Health Posts:", health_posts)
