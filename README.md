# CrisisCompanion

## Description

CrisisCompanion is a disaster relief application that assists users in locating emergency services and resources during natural disasters such as hurricanes, floods, and other crises. The app is built using a combination of Flask-based APIs for backend services and a React Native front end, enabling real-time updates on shelters, health stations, financial aid centers, and disaster zones.

## Functionalities

- Track Food Distribution Sites
- Track Health stations
- Navigate to Disaster Recovery Centers (DRCs)
- Track Emergency Shelters
- Weather alerts and news articles
- First Aid and Emergency information

## Backend Setup

To set up and run the backend APIs, you'll need the following:

### Requirements

- Python 3.6 or higher
- Flask
- Requests

### Install Backend Packages

1. Create a `requirements.txt` file with the following:

   ```txt
   Flask==2.0.3
   requests==2.26.0
   ```

2. Install dependencies using pip:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Backend API

1.  Clone the repository.
2.  Navigate to the folder containing the `app.py` file.
3.  Run the Flask server:

        ```bash
        export FLASK_APP=app.py
        flask run
        ```

    The backend APIs will now be running at `http://127.0.0.1:5001/` or `http://localhost:5001/`.

## Frontend Setup

The CrisisCompanion app is built using **React Native** and **Expo** for a smooth, cross-platform experience.

### Requirements

- **Node.js**: Download and install it from [nodejs.org](https://nodejs.org/).
- **Expo CLI**: To install Expo, run:
  ```bash
  npm install -g expo-cli
  ```

### Setting Up the Frontend

1. Clone the repository.
2. Navigate to the `frontend/` folder.
3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:
   ```bash
   npm start
   ```

### Running the App on a Device

- **Expo Go**: Install the Expo Go app on your iOS/Android device.
- Use the Expo QR code from the terminal or browser to open the app on your device.

## Features Overview

### Backend API Features

1. **Food Distribution API**

   - **Endpoint**: `/food_distribution`
   - Retrieves information on food distribution locations during crises.

2. **Health Stations API**

   - **Endpoint**: `/health_stations/get/<lat>/<lon>/<radius_meters>`
   - Fetches nearby health stations (clinics, hospitals, pharmacies).

3. **Disaster Recovery Centers API**

   - **Endpoint**: `/fema_drc/within_radius/<lat>/<lon>/<radius>`
   - Retrieves DRCs within a given radius from specified coordinates.

4. **Emergency Shelters API**

   - **Endpoint**: `/emergency_shelters/get/<lat>/<lon>/<radius_meters>`
   - Retrieves nearby emergency shelters.

5. **Hurricane Weather Alerts API**
   - **Endpoint**: `/get/<lat>/<lon>`
   - Provides weather alerts related to hurricanes and other weather events.

### Frontend Features

- **Dynamic Map**: The app includes a map that shows real-time data, including flood zones and locations of various emergency services.
- **Service Markers**: Users can toggle between shelters, health stations, financial aid centers, and supplies to see their locations marked on the map.
- **Flood Zones**: Predefined polygons highlight areas under flood risk based on disaster updates.
- **Toggling Services**: Dynamic buttons allow users to toggle between services like Shelters, Emergency Care, Financial Aid, and Supplies, updating the map accordingly.

## Notes

- For the backend API, the radius determines the search range for emergency services.
- The app utilizes the Google Places API and National Weather Service data for real-time updates.

## License
This is licensed under the MIT license

Feel free to read `DOCS.md` for more information on the endpoints
