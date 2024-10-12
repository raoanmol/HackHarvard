from flask import Blueprint, jsonify
import subprocess
import json

emergency_shelters_bp = Blueprint('emergency_shelters', __name__)

GOOGLE_API_KEY = "AIzaSyCjIhGHifYkVaMqqIQSdAn5ywqvk52u6HY"

@emergency_shelters_bp.route('/get/<lat>/<lon>/<radius_meters>', methods=['GET'])
def get_emergency_shelters(lat, lon, radius_meters):
    lat = float(lat)
    lon = float(lon)
    radius_meters = float(radius_meters)

    response = {}

    # Fetch shelters as a specific type from Google Places API
    response['shelters'] = get_places_by_type("shelter", lat, lon, radius_meters)

    return jsonify(response)

def get_places_by_type(place_type, lat, lon, radius_meters):
    curl_command = f'curl "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lon}&radius={radius_meters}&type={place_type}&key={GOOGLE_API_KEY}&fields=name,geometry,rating,vicinity"'
    
    result = subprocess.run(curl_command, shell=True, capture_output=True, text=True)
    places_data = []
    
    if result.returncode == 0:
        data = json.loads(result.stdout)
        
        for item in data.get('results', []):
            name = item.get('name')
            rating = item.get('rating')
            latitude = item['geometry']['location'].get('lat')
            longitude = item['geometry']['location'].get('lng')

            # Only include places that have both a name and a rating
            if name and rating:
                place_info = {
                    'name': name,
                    'address': item.get('vicinity'),
                    'latitude': latitude,
                    'longitude': longitude,
                    'rating': rating
                }
                places_data.append(place_info)
    
    return places_data
