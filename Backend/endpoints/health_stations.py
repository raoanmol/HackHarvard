from rapidfuzz import fuzz
import subprocess
import json
import math
from flask import Blueprint, jsonify

health_stations_bp = Blueprint('health_stations', __name__)

GOOGLE_API_KEY = ""

@health_stations_bp.route('/get/<lat>/<lon>/<radius>', methods=['GET'])
def get_health_stations(lat, lon, radius):
    lat = float(lat)
    lon = float(lon)
    radius = float(radius)

    response = {}

    hospitals = station_locations("hospital", lat, lon, radius)
    hospital_data = []
    for item in hospitals:
        if is_open(item[2], item[0], item[1]):
            hospital_data.append({
                'name': item[2],
                'latitude': item[0],
                'longitude': item[1],
                'distance': item[3]
            })
    response['hospitals'] = hospital_data

    clinics = station_locations("clinic", lat, lon, radius)
    clinic_data = []
    for item in clinics:
        if is_open(item[2], item[0], item[1]):
            clinic_data.append({
                'name': item[2],
                'latitude': item[0],
                'longitude': item[1],
                'distance': item[3]
            })
    response['clinics'] = clinic_data

    pharmacies = station_locations("pharmacy", lat, lon, radius)
    pharmacy_data = []
    for item in pharmacies:
        if is_open(item[2], item[0], item[1]):
            pharmacy_data.append({
                'name': item[2],
                'latitude': item[0],
                'longitude': item[1],
                'distance': item[3]
            })
    response['pharmacies'] = pharmacy_data

    doctors = station_locations("doctors", lat, lon, radius)
    doctor_data = []
    for item in doctors:
        if is_open(item[2], item[0], item[1]):
            doctor_data.append({
                'name': item[2],
                'latitude': item[0],
                'longitude': item[1],
                'distance': item[3]
            })
    response['doctors'] = doctor_data

    health_posts = station_locations("health_post", lat, lon, radius)
    health_post_data = []
    for item in health_posts:
        if is_open(item[2], item[0], item[1]):
            health_post_data.append({
                'name': item[2],
                'latitude': item[0],
                'longitude': item[1],
                'distance': item[3]
            })
    response['health_posts'] = health_post_data

    return jsonify(response)

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

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2) + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * (math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# # Usage
# latitude = 28.391988
# longitude = -80.928436
# get_health_stations(latitude, longitude, 1000)
