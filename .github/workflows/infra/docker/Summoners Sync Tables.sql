-- Summoners Sync schema and tables creation and roles initial data

-- Create the SS schema
CREATE schema summonerssync;

-- Create the users table
CREATE TABLE summonerssync.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the roles table
CREATE TABLE summonerssync.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Create the user_roles table to associate users with roles (many-to-many)
CREATE TABLE summonerssync.user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES summonerssync.users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES summonerssync.roles(id) ON DELETE CASCADE
);

-- Add default roles
INSERT INTO summonerssync.roles (name, description) VALUES 
('ADMIN', 'Full access to the system'),
('USER', 'Limited access to the system'),
('DEVELOPER', 'External contributor with restricted access');
