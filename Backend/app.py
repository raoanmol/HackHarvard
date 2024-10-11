from flask import Flask
from endpoints.user import user_bp
from endpoints.product import product_bp
from endpoints.order import order_bp

app = Flask(__name__)

# Register blueprints for each module
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(product_bp, url_prefix='/product')
app.register_blueprint(order_bp, url_prefix='/order')

@app.route('/')
def index():
    return {'message': 'Welcome to the Backend API'}

if __name__ == '__main__':
    app.run(debug=True)
