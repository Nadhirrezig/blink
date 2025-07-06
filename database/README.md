# Blink User Database (blink_user_db)

A comprehensive user management database system with support for authentication, sessions, roles, and activity tracking.

## 🏗️ Database Architecture

### Supported Database Systems
- **SQLite** (Development/Testing) - Lightweight, file-based database
- **PostgreSQL** (Production/Staging) - Robust, scalable database

### Core Tables

#### 1. `users` - Core User Information
- **Primary Key**: `id` (auto-increment)
- **Unique Fields**: `uuid`, `username`, `email`
- **Features**: Password hashing, profile data, status management, verification flags
- **Timestamps**: `created_at`, `updated_at`, `last_login_at`, `last_activity_at`

#### 2. `user_sessions` - Session Management
- **Purpose**: Track active user sessions across devices
- **Features**: Session tokens, device info, IP tracking, expiration
- **Security**: Automatic cleanup of expired sessions

#### 3. `user_roles` & `user_role_assignments` - Role-Based Access Control
- **Roles**: Admin, User, Moderator (extensible)
- **Permissions**: JSON-based permission system
- **Assignment Tracking**: Who assigned roles and when

#### 4. `password_reset_tokens` & `email_verification_tokens` - Security
- **Purpose**: Secure password reset and email verification flows
- **Features**: Token expiration, usage tracking

#### 5. `user_preferences` - User Settings
- **Purpose**: Store user-specific preferences and settings
- **Structure**: Key-value pairs per user

#### 6. `user_activity_log` - Activity Tracking
- **Purpose**: Comprehensive audit trail of user actions
- **Data**: Activity type, IP address, user agent, metadata

#### 7. `oauth_providers` & `user_oauth_connections` - Social Login
- **Purpose**: Support for OAuth-based authentication (Google, GitHub, Facebook)
- **Features**: Token management, provider configuration

## 🚀 Quick Start

### 1. Initialize Database

```bash
# Copy environment configuration
cp .env.example .env

# Edit .env with your database credentials
nano .env

# Initialize database with schema
python scripts/init_database.py
```

### 2. Environment Configuration

Set `NODE_ENV` to control which database configuration to use:
- `development` - SQLite database (default)
- `test` - In-memory SQLite
- `staging` - PostgreSQL staging database
- `production` - PostgreSQL production database

### 3. Database Connection

```python
from src.database.connection import get_db_connection

# Get connection for current environment
with get_db_connection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users LIMIT 5")
    users = cursor.fetchall()

# Get connection for specific environment
with get_db_connection('production') as conn:
    # Production database operations
    pass
```

### 4. User Management

```python
from src.database.user_manager import UserManager

user_manager = UserManager()

# Create new user
user = user_manager.create_user(
    username="johndoe",
    email="john@example.com",
    password="secure_password",
    first_name="John",
    last_name="Doe"
)

# Authenticate user
authenticated_user = user_manager.authenticate_user("john@example.com", "secure_password")

# Create session
session_token = user_manager.create_session(user['id'], device_info="Web Browser")

# Validate session
session_user = user_manager.validate_session(session_token)
```

## 📊 Database Schema Details

### User Status Values
- `active` - Normal active user
- `inactive` - Temporarily disabled
- `suspended` - Suspended due to violations
- `deleted` - Soft deleted (data retained)

### Default Roles
- **admin** - Full system access (`["*"]`)
- **user** - Basic user permissions (`["read_profile", "update_profile"]`)
- **moderator** - Content moderation permissions (`["read_users", "moderate_content"]`)

### Security Features
- **Password Hashing**: SHA-256 with random salt
- **Session Management**: Secure token-based sessions with expiration
- **Activity Logging**: Comprehensive audit trail
- **Token Security**: Cryptographically secure tokens for resets/verification

## 🔧 Configuration

### Database Configuration (`config/database.json`)
```json
{
  "development": {
    "type": "sqlite",
    "database": "database/blink_user_db.sqlite"
  },
  "production": {
    "type": "postgresql",
    "host": "${DB_HOST}",
    "port": "${DB_PORT}",
    "database": "${DB_NAME}",
    "username": "${DB_USER}",
    "password": "${DB_PASSWORD}"
  }
}
```

### Environment Variables (`.env`)
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blink_user_db
DB_USER=blink_user
DB_PASSWORD=your_password

# Security
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
ENCRYPTION_KEY=your_encryption_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password
```

## 🛠️ Maintenance

### Database Migrations
Migrations are stored in `database/migrations/` and numbered sequentially:
- `001_initial_schema.sql` - Initial database schema

### Backup Recommendations
- **SQLite**: Copy the `.sqlite` file
- **PostgreSQL**: Use `pg_dump` for regular backups

### Performance Optimization
- Indexes are created on frequently queried columns
- Session cleanup should be run periodically
- Activity log may need archiving for high-traffic applications

## 🔒 Security Considerations

1. **Password Security**: Passwords are hashed with salt, never stored in plain text
2. **Session Security**: Sessions expire automatically and can be invalidated
3. **Token Security**: All tokens use cryptographically secure random generation
4. **SQL Injection**: All queries use parameterized statements
5. **Activity Tracking**: All user actions are logged for audit purposes

## 📈 Scalability

The database is designed to scale from development to production:
- **Development**: SQLite for simplicity
- **Production**: PostgreSQL with connection pooling
- **Horizontal Scaling**: Can be extended with read replicas
- **Caching**: Session and user data can be cached externally

## 🤝 Contributing

When adding new features:
1. Create migration files for schema changes
2. Update the schema documentation
3. Add appropriate indexes for new queries
4. Update the UserManager class for new operations
5. Test with both SQLite and PostgreSQL
