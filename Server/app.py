from flask import Flask, request, jsonify, redirect
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import stripe
import os

# Initialization of Flask app
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/testdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
app.app_context().push()

ma = Marshmallow(app)

# Stripe API Key

stripe.api_key = 'sk_test_51NTTjhSJjpADypIhvd6cg1533ba84Hlvvfrvw2huLUKRqQYamEyRwb2eqqfZ1wN2CQ8XssktgtumMCdr2ficwjD400ztsjncen'

# User Class
class User(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    title = db.Column(db.String(100))
    description = db.Column(db.String(200))
    timestamp = db.Column(db.DateTime)
    image_path = db.Column(db.String(200))

    def __init__(self, username, title, description, timestamp, image_path):
        self.username = username
        self.title =title
        self.description = description
        self.timestamp = timestamp
        self.image_path = image_path


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'title' , 'description', 'timestamp', 'image_path')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


#Premimum Class
class Puser(db.Model):
    __tablename__ = 'puser'
    username = db.Column(db.String(200))
    premium = db.Column(db.String(200))

    def __init__(self, username, premium):
        self.username = username
        self.premium = premium

class PuserSchema(ma.Schema):
    class Meta:
        fields = ('username','premium')

puser_schema = PuserSchema()
pusers_schema = PuserSchema(many=True)

# Create a User
@app.route('/user', methods=['POST'])
def add_user():
    username = request.json['username']
    title = request.json['title']
    description = request.json['description']
    timestamp = request.json['timestamp']
    image_path = request.json['image_path']

    new_user = User(username,title,description, timestamp, image_path)

    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)

# Get All Users
@app.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

# Get Single User
@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)

# Update a User
@app.route('/user/<id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)

    username = request.json['username']
    title = request.json['title']
    description = request.json['description']
    timestamp = request.json['timestamp']
    image_path = request.json['image_path']

    user.username = username
    user.title = title
    user.description = description
    user.timestamp = timestamp
    user.image_path = image_path

    db.session.commit()

    return user_schema.jsonify(user)

# Delete User
@app.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

@app.route('/premium', methods=['POST'])
def premium_user():
    username = request.json['username']
    premium = request.json['premium']

    new_puser = Puser(username,premium)

    db.session.delete(new_puser)
    db.session.commit()

    return redirect('http://localhost:5173/', code=303)

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
  session = stripe.checkout.Session.create(
    line_items=[{
      'price_data': {
        'currency': 'usd',
        'product_data': {
          'name': 'T-shirt',
        },
        'unit_amount': 500,
      },
      'quantity': 1,
    }],
    mode='payment',
    success_url='http:/127.0.0.1:5000/premium',
    cancel_url='http://localhost:5173/',
  )

  return redirect(session.url, code=303)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)