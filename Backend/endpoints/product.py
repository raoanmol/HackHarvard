from flask import Blueprint, jsonify

product_bp = Blueprint('product', __name__)

@product_bp.route('/list', methods=['GET'])
def list_products():
    return jsonify([
        {'product_id': 1, 'name': 'Product A'},
        {'product_id': 2, 'name': 'Product B'}
    ])

@product_bp.route('/get/<int:product_id>', methods=['GET'])
def get_product(product_id):
    return jsonify({'product_id': product_id, 'name': 'Product A'})
