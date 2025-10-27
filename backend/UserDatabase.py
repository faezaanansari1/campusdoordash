import os
from pymongo import MongoClient
from dotenv import load_dotenv
import bcrypt
from datetime import datetime, timezone


# Load environment variables from .env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client['RetrieverEats']          # Database
users_collection = db['users']        # Collection

# -----------------------------
# Add a new user
# -----------------------------
def add_user(email, password, permission):
    # Hash the password and convert to string
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user = {
        "email": email,
        "password_hash": hashed,
        "permission": permission,
        "created_at": datetime.now(timezone.utc),
        "last_login": None
    }

    try:
        users_collection.insert_one(user)
        print(f"User {email} added")
    except Exception as e:
        print(f"Error adding user: {e}")

# -----------------------------
# List all users (without passwords)
# -----------------------------
def get_users():
    print("Current users in the database:")
    for user in users_collection.find({}, {"password_hash": 0}):
        print(user)

# -----------------------------
# Login a user
# -----------------------------
def login_user(email, password):
    user = users_collection.find_one({"email": email})
    if user:
        # Verify password
        if bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            # Update last login timestamp
            users_collection.update_one(
                {"email": email},
                {"$set": {"last_login": datetime.now(timezone.utc)}}
            )
            print(f"Login successful for {email}")
            return True
        else:
            print("Incorrect password")
            return False
    else:
        print("User not found")
        return False

# -----------------------------
# Example usage
# -----------------------------
#if __name__ == "__main__":
    # Add a test user
#    add_user("test@example.com", "password123", "admin")
    
    # List all users
#    get_users()
    
    # Attempt login
#    login_user("test@example.com", "password123")
#    login_user("test@example.com", "wrongpassword")
