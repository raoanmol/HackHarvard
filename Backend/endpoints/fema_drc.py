from flask import Blueprint, jsonify, request
import requests
import math

fema_drc_bp = Blueprint('fema_drc', __name__)

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@fema_drc_bp.route('/within_radius/<lat>/<lon>/<radius>', methods=['GET'])
def get_drcs_within_radius(lat, lon, radius):
    try:
        lat = float(lat)
        lon = float(lon)
        radius = float(radius)

        # Fetch and filter DRCs within the radius
        drcs = fetch_drcs(lat, lon, radius)
        filtered_drcs = filter_drcs_by_radius(drcs, lat, lon, radius)

        if filtered_drcs:
            # Optionally sort DRCs by distance
            filtered_drcs.sort(key=lambda x: x['distance_km'])
            return jsonify({"drcs_within_radius": filtered_drcs})
        else:
            return jsonify({"message": "No disaster recovery centers found within the specified radius"}), 404

    except ValueError:
        return jsonify({"error": "Invalid latitude, longitude, or radius format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def fetch_drcs(lat, lon, radius):
    """Fetch DRCs from the ArcGIS Feature Server endpoint."""
    url = (
        "https://gis.fema.gov/arcgis/rest/services/FEMA/DRC/FeatureServer/0/query"
        "?where=1%3D1&outFields=drc_name,city,state,latitude,longitude,street_1,zip"
        "&geometry={lon},{lat}&geometryType=esriGeometryPoint"
        "&spatialRel=esriSpatialRelIntersects"
        "&distance={radius}&units=esriSRUnit_Meter&outSR=4326&f=json"
    ).format(lon=lon, lat=lat, radius=radius * 1000)  # Radius in meters

    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.json().get("features", [])

def filter_drcs_by_radius(features, lat, lon, radius):
    """Filter DRCs by radius using the Haversine formula."""
    drcs_within_radius = []

    for feature in features:
        geometry = feature.get("geometry")
        attributes = feature.get("attributes")

        if geometry:
            drc_lat = geometry["y"]
            drc_lon = geometry["x"]
            distance = haversine(lat, lon, drc_lat, drc_lon)

            if distance <= radius:
                drcs_within_radius.append({
                    "name": attributes.get("drc_name", "Unknown"),
                    "latitude": drc_lat,
                    "longitude": drc_lon,
                    "distance_km": round(distance, 2)
                })

    return drcs_within_radius