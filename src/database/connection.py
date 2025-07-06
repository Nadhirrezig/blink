"""
Database connection utilities for Blink User Database
"""

import sqlite3
import json
import os
from pathlib import Path
from contextlib import contextmanager
from typing import Dict, Any, Optional, Generator

class DatabaseConnection:
    """Database connection manager for blink_user_db."""
    
    def __init__(self, config_path: Optional[str] = None):
        """Initialize database connection manager."""
        self.config_path = config_path or self._get_default_config_path()
        self.config = self._load_config()
        self.environment = os.getenv('NODE_ENV', 'development')
        
    def _get_default_config_path(self) -> str:
        """Get default configuration file path."""
        project_root = Path(__file__).parent.parent.parent
        return str(project_root / "config" / "database.json")
    
    def _load_config(self) -> Dict[str, Any]:
        """Load database configuration from JSON file."""
        try:
            with open(self.config_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Database configuration file not found: {self.config_path}")
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in database configuration: {e}")
    
    def get_config(self, environment: Optional[str] = None) -> Dict[str, Any]:
        """Get configuration for specific environment."""
        env = environment or self.environment
        if env not in self.config:
            raise ValueError(f"Environment '{env}' not found in database configuration")
        return self.config[env]
    
    @contextmanager
    def get_connection(self, environment: Optional[str] = None) -> Generator[Any, None, None]:
        """Get database connection context manager."""
        config = self.get_config(environment)

        if config['type'] == 'sqlite':
            with self._get_sqlite_connection(config) as conn:
                yield conn
        elif config['type'] == 'postgresql':
            with self._get_postgresql_connection(config) as conn:
                yield conn
        else:
            raise ValueError(f"Unsupported database type: {config['type']}")
    
    @contextmanager
    def _get_sqlite_connection(self, config: Dict[str, Any]) -> Generator[sqlite3.Connection, None, None]:
        """Get SQLite connection."""
        db_path = config['database']
        
        # Create directory if it doesn't exist
        if db_path != ':memory:':
            os.makedirs(os.path.dirname(db_path), exist_ok=True)
        
        conn = sqlite3.connect(db_path)
        
        # Configure SQLite options
        if 'options' in config:
            options = config['options']
            if options.get('foreign_keys'):
                conn.execute('PRAGMA foreign_keys = ON')
            if options.get('journal_mode'):
                conn.execute(f'PRAGMA journal_mode = {options["journal_mode"]}')
            if options.get('synchronous'):
                conn.execute(f'PRAGMA synchronous = {options["synchronous"]}')
            if options.get('cache_size'):
                conn.execute(f'PRAGMA cache_size = {options["cache_size"]}')
            if options.get('temp_store'):
                conn.execute(f'PRAGMA temp_store = {options["temp_store"]}')
        
        # Enable row factory for dict-like access
        conn.row_factory = sqlite3.Row
        
        try:
            yield conn
        finally:
            conn.close()
    
    @contextmanager
    def _get_postgresql_connection(self, config: Dict[str, Any]) -> Generator[Any, None, None]:
        """Get PostgreSQL connection."""
        try:
            import psycopg2
            from psycopg2.extras import RealDictCursor
        except ImportError:
            raise ImportError("psycopg2 not installed. Install with: pip install psycopg2-binary")
        
        # Expand environment variables in config
        expanded_config = {}
        for key, value in config.items():
            if isinstance(value, str) and value.startswith('${') and value.endswith('}'):
                env_var = value[2:-1]
                expanded_config[key] = os.getenv(env_var, value)
            else:
                expanded_config[key] = value
        
        conn = psycopg2.connect(
            host=expanded_config['host'],
            port=expanded_config['port'],
            database=expanded_config['database'],
            user=expanded_config['username'],
            password=expanded_config['password'],
            cursor_factory=RealDictCursor
        )
        
        try:
            yield conn
        finally:
            conn.close()

# Global database connection instance
db = DatabaseConnection()

@contextmanager
def get_db_connection(environment: Optional[str] = None) -> Generator[Any, None, None]:
    """Convenience function to get database connection."""
    with db.get_connection(environment) as conn:
        yield conn

def execute_query(query: str, params: Optional[tuple] = None, environment: Optional[str] = None) -> list:
    """Execute a SELECT query and return results."""
    with get_db_connection(environment) as conn:
        cursor = conn.cursor()
        cursor.execute(query, params or ())
        return cursor.fetchall()

def execute_update(query: str, params: Optional[tuple] = None, environment: Optional[str] = None) -> int:
    """Execute an INSERT/UPDATE/DELETE query and return affected rows."""
    with get_db_connection(environment) as conn:
        cursor = conn.cursor()
        cursor.execute(query, params or ())
        conn.commit()
        return cursor.rowcount

def execute_transaction(queries: list, environment: Optional[str] = None) -> bool:
    """Execute multiple queries in a transaction."""
    try:
        with get_db_connection(environment) as conn:
            cursor = conn.cursor()
            for query, params in queries:
                cursor.execute(query, params or ())
            conn.commit()
            return True
    except Exception:
        return False
