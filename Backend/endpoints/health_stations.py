from flask import Blueprint, jsonify
import subprocess
import json

health_stations_bp = Blueprint('health_stations', __name__)

GOOGLE_API_KEY = "AIzaSyCjIhGHifYkVaMqqIQSdAn5ywqvk52u6HY"

@health_stations_bp.route('/get/<lat>/<lon>/<radius_meters>', methods=['GET'])
def get_health_stations(lat, lon, radius_meters):
    lat = float(lat)
    lon = float(lon)
    radius_meters = float(radius_meters)

    response = {}

    response['hospitals'] = get_places_by_type("hospital", lat, lon, radius_meters)
    response['clinics'] = get_places_by_type("clinic", lat, lon, radius_meters)
    response['pharmacies'] = get_places_by_type("pharmacy", lat, lon, radius_meters)
    response['doctors'] = get_places_by_type("doctor", lat, lon, radius_meters)
    response['health_posts'] = get_places_by_type("health_post", lat, lon, radius_meters)

    return jsonify(response)

def get_places_by_type(place_type, lat, lon, radius_meters):
    curl_command = f'curl "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius={radius_meters}&type={place_type}&key={GOOGLE_API_KEY}&fields=name,geometry,opening_hours"'
    
    result = subprocess.run(curl_command, shell=True, capture_output=True, text=True)
    places_data = []
    
    if result.returncode == 0:
        data = json.loads(result.stdout)
        
        for item in data.get('results', []):
            is_open_now = item.get('opening_hours', {}).get('open_now', False)
            place_info = {
                'name': item['name'],
                'latitude': item['geometry']['location']['lat'],
                'longitude': item['geometry']['location']['lng']
            }
            places_data.append(place_info)
    
    return places_data
