from flask import Blueprint, jsonify

order_bp = Blueprint('order', __name__)

@order_bp.route('/place', methods=['POST'])
def place_order():
    return jsonify({'message': 'Order placed successfully'})

@order_bp.route('/get/<int:order_id>', methods=['GET'])
def get_order(order_id):
    return jsonify({'order_id': order_id, 'status': 'Shipped'})
