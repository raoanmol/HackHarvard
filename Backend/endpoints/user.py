from flask import Blueprint, jsonify

user_bp = Blueprint('user', __name__)

@user_bp.route('/get/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({'user_id': user_id, 'name': 'John Doe'})

@user_bp.route('/create', methods=['POST'])
def create_user():
    return jsonify({'message': 'User created successfully'})