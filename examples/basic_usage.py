#!/usr/bin/env python3
"""
Basic usage example for Blink User Database
This script demonstrates how to use the blink_user_db for common operations.
"""

import sys
from pathlib import Path

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from database.user_manager import UserManager
from database.connection import get_db_connection, execute_query

def main():
    """Demonstrate basic database operations."""
    print("🚀 Blink User Database - Basic Usage Example")
    print("=" * 50)
    
    # Initialize user manager
    user_manager = UserManager()
    
    # 1. Create a new user
    print("👤 Creating a new user...")
    user = user_manager.create_user(
        username="alice_demo",
        email="alice@example.com",
        password="secure_password_123",
        first_name="Alice",
        last_name="Johnson",
        bio="Demo user for testing the blink database"
    )
    
    if user:
        print(f"✅ User created successfully!")
        print(f"   - ID: {user['id']}")
        print(f"   - Username: {user['username']}")
        print(f"   - Email: {user['email']}")
        print(f"   - Created: {user['created_at']}")
    else:
        print("❌ User creation failed (user might already exist)")
        # Try to get existing user
        user = user_manager.get_user_by_email("alice@example.com")
        if user:
            print(f"📋 Using existing user: {user['username']}")
    
    print()
    
    # 2. Authenticate user
    print("🔐 Authenticating user...")
    auth_user = user_manager.authenticate_user("alice@example.com", "secure_password_123")
    
    if auth_user:
        print("✅ Authentication successful!")
        print(f"   - Last login: {auth_user['last_login_at']}")
    else:
        print("❌ Authentication failed")
        return
    
    print()
    
    # 3. Create a session
    print("🎫 Creating user session...")
    session_token = user_manager.create_session(
        user['id'],
        device_info="Demo Script",
        ip_address="127.0.0.1"
    )
    
    if session_token:
        print("✅ Session created successfully!")
        print(f"   - Token: {session_token[:20]}...")
    else:
        print("❌ Session creation failed")
        return
    
    print()
    
    # 4. Validate session
    print("✅ Validating session...")
    session_user = user_manager.validate_session(session_token)
    
    if session_user:
        print("✅ Session validation successful!")
        print(f"   - User: {session_user['username']}")
        print(f"   - Session expires: {session_user['expires_at']}")
    else:
        print("❌ Session validation failed")
    
    print()
    
    # 5. Update user profile
    print("📝 Updating user profile...")
    success = user_manager.update_user(
        user['id'],
        bio="Updated bio - I'm learning to use the blink database!",
        phone="+1-555-0123"
    )
    
    if success:
        print("✅ Profile updated successfully!")
        # Get updated user
        updated_user = user_manager.get_user_by_id(user['id'])
        print(f"   - New bio: {updated_user['bio']}")
        print(f"   - Phone: {updated_user['phone']}")
    else:
        print("❌ Profile update failed")
    
    print()
    
    # 6. Log some activity
    print("📊 Logging user activity...")
    activities = [
        ("login", "User logged in via demo script"),
        ("profile_update", "User updated their profile"),
        ("view_dashboard", "User viewed the dashboard")
    ]
    
    for activity_type, description in activities:
        success = user_manager.log_activity(
            user['id'],
            activity_type,
            description,
            ip_address="127.0.0.1",
            metadata='{"source": "demo_script"}'
        )
        if success:
            print(f"✅ Logged activity: {activity_type}")
        else:
            print(f"❌ Failed to log activity: {activity_type}")
    
    print()
    
    # 7. Query recent activity
    print("📈 Querying recent user activity...")
    try:
        query = """
        SELECT activity_type, description, created_at 
        FROM user_activity_log 
        WHERE user_id = ? 
        ORDER BY created_at DESC 
        LIMIT 5
        """
        activities = execute_query(query, (user['id'],))
        
        print("Recent activities:")
        for activity in activities:
            print(f"   - {activity[0]}: {activity[1]} ({activity[2]})")
    
    except Exception as e:
        print(f"❌ Failed to query activities: {e}")
    
    print()
    
    # 8. Show database statistics
    print("📊 Database Statistics:")
    try:
        stats_queries = [
            ("Total users", "SELECT COUNT(*) FROM users WHERE status != 'deleted'"),
            ("Active sessions", "SELECT COUNT(*) FROM user_sessions WHERE is_active = TRUE AND expires_at > CURRENT_TIMESTAMP"),
            ("Total activities", "SELECT COUNT(*) FROM user_activity_log"),
            ("Available roles", "SELECT COUNT(*) FROM user_roles")
        ]
        
        for stat_name, query in stats_queries:
            result = execute_query(query)
            count = result[0][0] if result else 0
            print(f"   - {stat_name}: {count}")
    
    except Exception as e:
        print(f"❌ Failed to get statistics: {e}")
    
    print()
    
    # 9. Clean up (invalidate session)
    print("🧹 Cleaning up...")
    success = user_manager.invalidate_session(session_token)
    if success:
        print("✅ Session invalidated successfully!")
    else:
        print("❌ Failed to invalidate session")
    
    print()
    print("🎉 Demo completed successfully!")
    print("💡 Check the database files:")
    print("   - Main database: database/blink_user_db.sqlite")
    print("   - Test database: database/test_blink_user_db.sqlite")
    print("   - Configuration: config/database.json")

if __name__ == "__main__":
    main()
