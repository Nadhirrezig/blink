#!/usr/bin/env python3
"""
Test script for Blink User Database
This script tests the basic functionality of the blink_user_db.
"""

import os
import sys
import tempfile
from pathlib import Path

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from database.user_manager import UserManager
from database.connection import get_db_connection, execute_query

def test_database_connection():
    """Test database connection."""
    print("🔌 Testing database connection...")
    try:
        with get_db_connection('test') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            assert result[0] == 1
        print("✅ Database connection successful")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_schema_creation():
    """Test that all tables are created."""
    print("📋 Testing schema creation...")
    try:
        expected_tables = [
            'users', 'user_sessions', 'user_roles', 'user_role_assignments',
            'password_reset_tokens', 'email_verification_tokens', 
            'user_preferences', 'user_activity_log', 'oauth_providers',
            'user_oauth_connections'
        ]
        
        with get_db_connection('test') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = [row[0] for row in cursor.fetchall()]
            
            missing_tables = set(expected_tables) - set(tables)
            if missing_tables:
                print(f"❌ Missing tables: {missing_tables}")
                return False
            
        print(f"✅ All {len(expected_tables)} tables created successfully")
        return True
    except Exception as e:
        print(f"❌ Schema creation test failed: {e}")
        return False

def test_user_operations():
    """Test user CRUD operations."""
    print("👤 Testing user operations...")
    user_manager = UserManager(environment='test')
    
    try:
        # Test user creation
        try:
            user = user_manager.create_user(
                username="testuser",
                email="test@example.com",
                password="testpassword123",
                first_name="Test",
                last_name="User"
            )

            if not user:
                print("❌ User creation failed - returned None")
                return False
        except Exception as e:
            print(f"❌ User creation failed with exception: {e}")
            return False
        
        print(f"✅ User created with ID: {user['id']}")
        
        # Test user authentication
        auth_user = user_manager.authenticate_user("test@example.com", "testpassword123")
        if not auth_user:
            print("❌ User authentication failed")
            return False
        
        print("✅ User authentication successful")
        
        # Test user update
        success = user_manager.update_user(user['id'], bio="Updated bio")
        if not success:
            print("❌ User update failed")
            return False
        
        print("✅ User update successful")
        
        # Test session creation
        session_token = user_manager.create_session(user['id'], device_info="Test Device")
        if not session_token:
            print("❌ Session creation failed")
            return False
        
        print("✅ Session created successfully")
        
        # Test session validation
        session_user = user_manager.validate_session(session_token)
        if not session_user:
            print("❌ Session validation failed")
            return False
        
        print("✅ Session validation successful")
        
        # Test activity logging
        success = user_manager.log_activity(
            user['id'], 
            "test_activity", 
            "Test activity description"
        )
        if not success:
            print("❌ Activity logging failed")
            return False
        
        print("✅ Activity logging successful")
        
        return True
        
    except Exception as e:
        print(f"❌ User operations test failed: {e}")
        return False

def test_role_system():
    """Test role system."""
    print("🔐 Testing role system...")
    try:
        # Check default roles exist
        roles = execute_query("SELECT name FROM user_roles", environment='test')
        role_names = [role[0] for role in roles]
        
        expected_roles = ['admin', 'user', 'moderator']
        missing_roles = set(expected_roles) - set(role_names)
        
        if missing_roles:
            print(f"❌ Missing default roles: {missing_roles}")
            return False
        
        print(f"✅ All default roles present: {role_names}")
        return True
        
    except Exception as e:
        print(f"❌ Role system test failed: {e}")
        return False

def test_indexes():
    """Test that indexes are created."""
    print("📊 Testing database indexes...")
    try:
        with get_db_connection('test') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_%'")
            indexes = [row[0] for row in cursor.fetchall()]
            
            if len(indexes) < 5:  # We expect several indexes
                print(f"❌ Expected more indexes, found: {indexes}")
                return False
        
        print(f"✅ Database indexes created: {len(indexes)} indexes found")
        return True
        
    except Exception as e:
        print(f"❌ Index test failed: {e}")
        return False

def run_all_tests():
    """Run all database tests."""
    print("🧪 Starting Blink User Database Tests")
    print("=" * 50)
    
    # Initialize test database
    os.environ['NODE_ENV'] = 'test'
    
    # Import and run schema initialization
    try:
        from pathlib import Path
        import sqlite3
        
        # Read schema file
        schema_path = Path(__file__).parent.parent / "database" / "schema.sql"
        with open(schema_path, 'r') as f:
            schema_sql = f.read()
        
        # Initialize test database
        with get_db_connection('test') as conn:
            conn.executescript(schema_sql)
        
        print("✅ Test database initialized")
        
    except Exception as e:
        print(f"❌ Test database initialization failed: {e}")
        return False
    
    # Run tests
    tests = [
        test_database_connection,
        test_schema_creation,
        test_role_system,
        test_indexes,
        test_user_operations
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            if test():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {e}")
            failed += 1
        print()
    
    print("=" * 50)
    print(f"🎯 Test Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("🎉 All tests passed! Database is working correctly.")
        return True
    else:
        print("💥 Some tests failed. Please check the database setup.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
