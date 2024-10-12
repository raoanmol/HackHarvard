
from flask import Blueprint, jsonify, request
import requests
from datetime import datetime

hurricane_path_bp = Blueprint('hurricane_path', __name__)

def validate_iso8601(date_string):
    try:
        datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return True
    except ValueError:
        return False

@hurricane_path_bp.route('/get/<string:lat>/<string:lon>', methods=['GET'])
def get_weather_alerts(lat, lon):
    try:
        lat = float(lat)
        lon = float(lon)

        start = request.args.get('start')
        end = request.args.get('end')
        event = request.args.get('event')

        if not event:
            event_list = [
                'Hurricane Warning',
                'Hurricane Watch',
                'Tropical Storm Warning',
                'Tropical Storm Watch'
            ]
        else:
            event_list = [event]

        if start and not validate_iso8601(start):
            return jsonify({"error": "Invalid start date format. Use ISO 8601 format, e.g., 2024-10-08T00:00:00Z"}), 400
        if end and not validate_iso8601(end):
            return jsonify({"error": "Invalid end date format. Use ISO 8601 format, e.g., 2024-10-10T23:59:59Z"}), 400

        alerts = get_active_alerts(lat, lon, start, end)
        filtered_alerts = [
            alert for alert in alerts if alert['event'] in event_list
        ]
        if filtered_alerts:
            return jsonify({"alerts": filtered_alerts})
        else:
            return jsonify({"message": "No hurricane alerts found"}), 404

    except ValueError:
        return jsonify({"error": "Invalid latitude or longitude format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_active_alerts(lat, lon, start=None, end=None):
    url = "https://api.weather.gov/alerts"
    params = {
        'point': f"{lat},{lon}"
    }

    if start:
        params['start'] = start
    if end:
        params['end'] = end

    headers = {
        'User-Agent': 'MyWeatherApp/1.0 (hannahrose2871@icloud.com)'
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        alerts = []

        for alert in data.get('features', []):
            alert_info = alert['properties']
            alerts.append({
                "event": alert_info.get("event"),
                "description": alert_info.get("description"),
                "area": alert_info.get("areaDesc"),
                "severity": alert_info.get("severity"),
                "certainty": alert_info.get("certainty"),
                "urgency": alert_info.get("urgency"),
                "effective": alert_info.get("effective"),
                "expires": alert_info.get("expires"),
            })

        #note that this info is included as needed (remove whatever is not)
        #we will put the specific day we are demoing when the time comes, try a 24 hour period 

        return alerts
    else:
        return []