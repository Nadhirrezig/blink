#!/usr/bin/env python3
"""
Blink User Database Initialization Script
This script initializes the blink_user_db database with the required schema.
"""

import sqlite3
import os
import json
import sys
from pathlib import Path

def get_project_root():
    """Get the project root directory."""
    return Path(__file__).parent.parent

def load_database_config():
    """Load database configuration from config file."""
    config_path = get_project_root() / "config" / "database.json"
    try:
        with open(config_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Database configuration file not found at {config_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in database configuration: {e}")
        sys.exit(1)

def read_schema_file():
    """Read the database schema from the SQL file."""
    schema_path = get_project_root() / "database" / "schema.sql"
    try:
        with open(schema_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: Schema file not found at {schema_path}")
        sys.exit(1)

def init_sqlite_database(db_path, schema_sql):
    """Initialize SQLite database with the given schema."""
    try:
        # Create database directory if it doesn't exist
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        
        # Connect to database (creates file if it doesn't exist)
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Execute schema
        cursor.executescript(schema_sql)
        
        # Commit changes
        conn.commit()
        
        print(f"✅ SQLite database initialized successfully at: {db_path}")
        
        # Verify tables were created
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"📋 Created {len(tables)} tables:")
        for table in tables:
            print(f"   - {table[0]}")
        
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"❌ SQLite error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def init_postgresql_database(config, schema_sql):
    """Initialize PostgreSQL database with the given schema."""
    try:
        import psycopg2
        from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
        
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            host=config['host'],
            port=config['port'],
            user=config['username'],
            password=config['password'],
            database='postgres'  # Connect to default database first
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Create database if it doesn't exist
        cursor.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{config['database']}'")
        exists = cursor.fetchone()
        if not exists:
            cursor.execute(f"CREATE DATABASE {config['database']}")
            print(f"✅ Created PostgreSQL database: {config['database']}")
        
        conn.close()
        
        # Connect to the actual database
        conn = psycopg2.connect(
            host=config['host'],
            port=config['port'],
            user=config['username'],
            password=config['password'],
            database=config['database']
        )
        cursor = conn.cursor()
        
        # Execute schema (convert SQLite-specific syntax to PostgreSQL)
        pg_schema = convert_sqlite_to_postgresql(schema_sql)
        cursor.execute(pg_schema)
        
        conn.commit()
        print(f"✅ PostgreSQL database schema initialized successfully")
        
        conn.close()
        return True
        
    except ImportError:
        print("❌ psycopg2 not installed. Install with: pip install psycopg2-binary")
        return False
    except Exception as e:
        print(f"❌ PostgreSQL error: {e}")
        return False

def convert_sqlite_to_postgresql(sqlite_sql):
    """Convert SQLite-specific SQL to PostgreSQL-compatible SQL."""
    # Basic conversions - this is a simplified version
    pg_sql = sqlite_sql.replace("INTEGER PRIMARY KEY AUTOINCREMENT", "SERIAL PRIMARY KEY")
    pg_sql = pg_sql.replace("AUTOINCREMENT", "")
    pg_sql = pg_sql.replace("PRAGMA foreign_keys = ON;", "")
    
    # Convert SQLite UUID generation to PostgreSQL
    pg_sql = pg_sql.replace(
        "DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))",
        "DEFAULT gen_random_uuid()"
    )
    
    return pg_sql

def main():
    """Main function to initialize the database."""
    print("🚀 Initializing Blink User Database...")
    
    # Load configuration
    config = load_database_config()
    
    # Read schema
    schema_sql = read_schema_file()
    
    # Get environment (default to development)
    env = os.getenv('NODE_ENV', 'development')
    
    if env not in config:
        print(f"❌ Environment '{env}' not found in database configuration")
        sys.exit(1)
    
    db_config = config[env]
    
    # Initialize database based on type
    if db_config['type'] == 'sqlite':
        db_path = get_project_root() / db_config['database']
        success = init_sqlite_database(str(db_path), schema_sql)
    elif db_config['type'] == 'postgresql':
        success = init_postgresql_database(db_config, schema_sql)
    else:
        print(f"❌ Unsupported database type: {db_config['type']}")
        sys.exit(1)
    
    if success:
        print("🎉 Database initialization completed successfully!")
    else:
        print("💥 Database initialization failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
