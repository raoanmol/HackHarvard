# Backend Endpoints

Here's a list of current backend endpoints implemented by us in use throughout our app
## `/emergency_shelters`
Gives coordinates of emergency shelters around a provided latitude, longitude and certain radius (in meters).

Mock request: `http://localhost:5000/emergency_shelters/get/28.391988/-80.928436/1000`

Mock response:
```json
{
    "shelters": [
        {
            "address": "Christmas",
            "latitude": 28.3918254,
            "longitude": -80.9260604,
            "name": "S&L Materials 520 Plant",
            "rating": 5
        }
    ]
}
```

## `/fema_drc`
Gives access to FEMA financial aid centers around a provided latitude, longitude and certain radius (in kilometers).

Mock request: `http://localhost:5000/fema_drc/within_radius/28.391988/-80.928436/150`

Mock response:
```json
{
    "drcs_within_radius": [
        {
            "distance_km": 146.75,
            "latitude": 27.88697300000007,
            "longitude": -82.31118199999997,
            "name": "Hillsborough Community College (The Regent)"
        }
    ]
}
```

## `/health_stations`
Gives access to local clinics, doctors, health posts, hospitals and pharmacies when provided with coordinates and a radius in meters.

Mock request: `http://localhost:5000/health_stations/get/28.391988/-80.928436/1000`

Mock response:
```json
{
    "clinics": [
        {
            "latitude": 28.3918254,
            "longitude": -80.9260604,
            "name": "S&L Materials 520 Plant"
        }
    ],
    "doctors": [],
    "health_posts": [
        {
            "latitude": 28.3918254,
            "longitude": -80.9260604,
            "name": "S&L Materials 520 Plant"
        }
    ],
    "hospitals": [],
    "pharmacies": []
}
```

