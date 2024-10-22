from flask import Flask
from endpoints.health_stations import health_stations_bp
from endpoints.hurricane_path import hurricane_path_bp
from endpoints.fema_drc import fema_drc_bp
from endpoints.emergency_shelters import emergency_shelters_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register blueprints for each module
app.register_blueprint(health_stations_bp, url_prefix='/health_stations')
app.register_blueprint(hurricane_path_bp, url_prefix='/hurricane_path')
app.register_blueprint(fema_drc_bp, url_prefix='/fema_drc')
app.register_blueprint(emergency_shelters_bp, url_prefix='/emergency_shelters')

@app.route('/')
def index():
    return {'message': 'Welcome to the Backend API'}

if __name__ == '__main__':
    app.run(debug=True)
