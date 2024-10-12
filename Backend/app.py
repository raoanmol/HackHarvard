from flask import Flask
from endpoints.health_stations import health_stations_bp
from endpoints.hurricane_path import hurricane_path_bp

app = Flask(__name__)

# Register blueprints for each module
app.register_blueprint(health_stations_bp, url_prefix='/health_stations')
app.register_blueprint(hurricane_path_bp, url_prefix='/hurricane_path')

@app.route('/')
def index():
    return {'message': 'Welcome to the Backend API'}

if __name__ == '__main__':
    app.run(debug=True, port=5001)
