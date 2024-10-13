# Disaster Response API Project

## Description
This project provides a set of Flask-based APIs designed to assist in disaster response efforts. The APIs offer information on various emergency services, including:

- Food distribution sites
- Health stations
- Disaster Recovery Centers (DRCs)
- Emergency shelters
- Weather alerts related to hurricanes

## Requirements
To run this project, you need to have the following installed:

- Python 3.6 or higher
- Flask
- Requests

### Install Required Packages
You can install the required Python packages using the provided `requirements.txt` file.

Create a `requirements.txt` file with the following content:

```
Flask==2.0.3
requests==2.26.0
```

Then, install the dependencies using pip:

```bash
pip install -r requirements.txt
```

## API Features

### 1. Food Distribution API
#### Endpoint: `/food_distribution`
This API retrieves information about food distribution sites.

### 2. Health Stations API
#### Endpoint: `/health_stations/get/<lat>/<lon>/<radius_meters>`
- **Parameters:**
    - `lat`: Latitude of the location.
    - `lon`: Longitude of the location.
    - `radius_meters`: Search radius in meters.

This API fetches nearby health stations, including hospitals, clinics, and pharmacies.

### 3. Disaster Recovery Centers (DRC) API
#### Endpoint: `/fema_drc/within_radius/<lat>/<lon>/<radius>`
- **Parameters:**
    - `lat`: Latitude of the location.
    - `lon`: Longitude of the location.
    - `radius`: Search radius in kilometers.

This API retrieves DRCs within a specified radius from the given coordinates.

### 4. Emergency Shelters API
#### Endpoint: `/emergency_shelters/get/<lat>/<lon>/<radius_meters>`
- **Parameters:**
    - `lat`: Latitude of the location.
    - `lon`: Longitude of the location.
    - `radius_meters`: Search radius in meters.

This API retrieves emergency shelters within the specified radius.

### 5. Hurricane Weather Alerts API
#### Endpoint: `/get/<string:lat>/<string:lon>`
- **Parameters:**
    - `lat`: Latitude of the location.
    - `lon`: Longitude of the location.

This API fetches active weather alerts related to hurricanes, with optional filters for event types and date ranges.

## Usage
1. Clone the repository or download the script files.
2. Ensure you have Flask and Requests installed. If not, run the following command:

```bash
pip install Flask requests
```

3. Create a Python file named `app.py` and add the provided Flask code for each feature.
4. Replace the placeholders (like `GOOGLE_API_KEY`) with your actual API keys as needed.
5. Run the Flask app:

```bash
export FLASK_APP=app.py
flask run
```

6. The APIs will be accessible at `http://127.0.0.1:5000/`

## Notes
- Ensure the latitude and longitude values are valid.
- The radius value determines how far from the specified location the API will search for services.
- The application utilizes the Google Places API for health stations and emergency shelters, and you must have an active API key with Places API enabled.
- The Hurricane Weather Alerts API fetches data from the National Weather Service and may be subject to rate limits.

## License
This project is licensed under the MIT License.

---

Feel free to customize any part of this README to better fit your project or add additional details as necessary!