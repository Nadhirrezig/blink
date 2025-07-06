"""
User management utilities for Blink User Database
"""

import hashlib
import secrets
import uuid
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List
from .connection import get_db_connection, execute_query, execute_update, execute_transaction

class UserManager:
    """User management class for blink_user_db operations."""

    def __init__(self, environment: Optional[str] = None):
        """Initialize UserManager with optional environment."""
        self.environment = environment
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password using SHA-256 with salt."""
        salt = secrets.token_hex(32)
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return f"{salt}:{password_hash}"
    
    @staticmethod
    def verify_password(password: str, stored_hash: str) -> bool:
        """Verify a password against stored hash."""
        try:
            salt, password_hash = stored_hash.split(':')
            return hashlib.sha256((password + salt).encode()).hexdigest() == password_hash
        except ValueError:
            return False
    
    @staticmethod
    def generate_token() -> str:
        """Generate a secure random token."""
        return secrets.token_urlsafe(32)
    
    def create_user(self, username: str, email: str, password: str, **kwargs) -> Optional[Dict[str, Any]]:
        """Create a new user."""
        # Check if user already exists
        if self.get_user_by_email(email) or self.get_user_by_username(username):
            return None
        
        # Hash password
        password_hash = self.hash_password(password)
        
        # Prepare user data
        user_data = {
            'username': username,
            'email': email,
            'password_hash': password_hash,
            'first_name': kwargs.get('first_name'),
            'last_name': kwargs.get('last_name'),
            'phone': kwargs.get('phone'),
            'date_of_birth': kwargs.get('date_of_birth'),
            'bio': kwargs.get('bio')
        }
        
        # Insert user
        query = """
        INSERT INTO users (username, email, password_hash, first_name, last_name, phone, date_of_birth, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """
        params = (
            user_data['username'], user_data['email'], user_data['password_hash'],
            user_data['first_name'], user_data['last_name'], user_data['phone'],
            user_data['date_of_birth'], user_data['bio']
        )
        
        try:
            execute_update(query, params, self.environment)
            return self.get_user_by_email(email)
        except Exception:
            return None
    
    def get_user_by_id(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get user by ID."""
        query = "SELECT * FROM users WHERE id = ? AND status != 'deleted'"
        results = execute_query(query, (user_id,), self.environment)
        return dict(results[0]) if results else None

    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email."""
        query = "SELECT * FROM users WHERE email = ? AND status != 'deleted'"
        results = execute_query(query, (email,), self.environment)
        return dict(results[0]) if results else None

    def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """Get user by username."""
        query = "SELECT * FROM users WHERE username = ? AND status != 'deleted'"
        results = execute_query(query, (username,), self.environment)
        return dict(results[0]) if results else None
    
    def authenticate_user(self, email_or_username: str, password: str) -> Optional[Dict[str, Any]]:
        """Authenticate user with email/username and password."""
        # Try to get user by email first, then username
        user = self.get_user_by_email(email_or_username)
        if not user:
            user = self.get_user_by_username(email_or_username)
        
        if not user or user['status'] != 'active':
            return None
        
        if self.verify_password(password, user['password_hash']):
            # Update last login
            self.update_last_login(user['id'])
            return user
        
        return None
    
    def update_user(self, user_id: int, **kwargs) -> bool:
        """Update user information."""
        if not kwargs:
            return False
        
        # Build dynamic update query
        set_clauses = []
        params = []
        
        allowed_fields = ['username', 'email', 'first_name', 'last_name', 'phone', 
                         'date_of_birth', 'bio', 'profile_picture_url', 'status']
        
        for field, value in kwargs.items():
            if field in allowed_fields:
                set_clauses.append(f"{field} = ?")
                params.append(value)
        
        if not set_clauses:
            return False
        
        set_clauses.append("updated_at = CURRENT_TIMESTAMP")
        params.append(user_id)
        
        query = f"UPDATE users SET {', '.join(set_clauses)} WHERE id = ?"
        
        try:
            rows_affected = execute_update(query, tuple(params), self.environment)
            return rows_affected > 0
        except Exception:
            return False
    
    def update_password(self, user_id: int, new_password: str) -> bool:
        """Update user password."""
        password_hash = self.hash_password(new_password)
        query = "UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        
        try:
            rows_affected = execute_update(query, (password_hash, user_id), self.environment)
            return rows_affected > 0
        except Exception:
            return False
    
    def update_last_login(self, user_id: int) -> bool:
        """Update user's last login timestamp."""
        query = """
        UPDATE users 
        SET last_login_at = CURRENT_TIMESTAMP, last_activity_at = CURRENT_TIMESTAMP 
        WHERE id = ?
        """
        try:
            execute_update(query, (user_id,), self.environment)
            return True
        except Exception:
            return False
    
    def deactivate_user(self, user_id: int) -> bool:
        """Deactivate a user account."""
        return self.update_user(user_id, status='inactive')
    
    def delete_user(self, user_id: int) -> bool:
        """Soft delete a user account."""
        return self.update_user(user_id, status='deleted')
    
    def create_session(self, user_id: int, device_info: str = None, ip_address: str = None, 
                      user_agent: str = None, expires_hours: int = 24) -> Optional[str]:
        """Create a new user session."""
        session_token = self.generate_token()
        expires_at = datetime.now() + timedelta(hours=expires_hours)
        
        query = """
        INSERT INTO user_sessions (user_id, session_token, device_info, ip_address, user_agent, expires_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        params = (user_id, session_token, device_info, ip_address, user_agent, expires_at)
        
        try:
            execute_update(query, params, self.environment)
            return session_token
        except Exception:
            return None
    
    def validate_session(self, session_token: str) -> Optional[Dict[str, Any]]:
        """Validate a session token and return user info."""
        query = """
        SELECT u.*, s.expires_at, s.last_accessed_at
        FROM users u
        JOIN user_sessions s ON u.id = s.user_id
        WHERE s.session_token = ? AND s.is_active = TRUE AND s.expires_at > CURRENT_TIMESTAMP
        """
        results = execute_query(query, (session_token,), self.environment)

        if results:
            # Update last accessed time
            update_query = "UPDATE user_sessions SET last_accessed_at = CURRENT_TIMESTAMP WHERE session_token = ?"
            execute_update(update_query, (session_token,), self.environment)
            return dict(results[0])
        
        return None
    
    def invalidate_session(self, session_token: str) -> bool:
        """Invalidate a session token."""
        query = "UPDATE user_sessions SET is_active = FALSE WHERE session_token = ?"
        try:
            rows_affected = execute_update(query, (session_token,), self.environment)
            return rows_affected > 0
        except Exception:
            return False
    
    def log_activity(self, user_id: Optional[int], activity_type: str, description: str = None,
                    ip_address: str = None, user_agent: str = None, metadata: str = None) -> bool:
        """Log user activity."""
        query = """
        INSERT INTO user_activity_log (user_id, activity_type, description, ip_address, user_agent, metadata)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        params = (user_id, activity_type, description, ip_address, user_agent, metadata)
        
        try:
            execute_update(query, params, self.environment)
            return True
        except Exception:
            return False
