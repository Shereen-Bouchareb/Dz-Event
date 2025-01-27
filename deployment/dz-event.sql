-- PostgreSQL dump (compatible with PostgreSQL 15)
-- Start a transaction
BEGIN;

-- Set the time zone
SET TIMEZONE='UTC';

-- Create custom types for enums
CREATE TYPE availability_status AS ENUM ('Available', 'Unavailable');
CREATE TYPE prestataire_role AS ENUM ('Photographer', 'Caterer', 'Venue Manager', 'DJ', 'Florist', 'Event Planner', 'Videographer', 'Makeup Artist', 'Hair Stylist', 'Security', 'Waiter', 'Decorator', 'Lighting Technician', 'Sound Engineer', 'Transporter', 'Other');
CREATE TYPE wilaya_type AS ENUM ('Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M''sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane');

-- Create the prestataire table first since other tables reference it
CREATE TABLE prestataire (
    Prestataire_id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    familyname VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    Gmail_ad VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userBio TEXT,
    job_description TEXT,
    role prestataire_role,
    profile_pic_url VARCHAR(255),
    wilaya wilaya_type NOT NULL
);

-- Create the availability table
CREATE TABLE availability (
    Dispo_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    status availability_status NOT NULL,
    Prestataire_id INT NOT NULL,
    FOREIGN KEY (Prestataire_id) REFERENCES prestataire(Prestataire_id)
);

-- Create the checklisttasks table
CREATE TABLE checklisttasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    Prestataire_id INT NOT NULL,
    FOREIGN KEY (Prestataire_id) REFERENCES prestataire(Prestataire_id)
);

-- Create the client table
CREATE TABLE client (
    client_id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    familyName VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    GmailAd VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the commentaire table
CREATE TABLE commentaire (
    comment_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    rating FLOAT,
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(client_id)
);

-- Create the eventdate table
CREATE TABLE eventdate (
    event_date_id SERIAL PRIMARY KEY,
    event_date DATE NOT NULL
);

-- Create the pictures table
CREATE TABLE pictures (
    picture_id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Prestataire_id INT NOT NULL,
    FOREIGN KEY (Prestataire_id) REFERENCES prestataire(Prestataire_id)
);

-- Create the reservationfrom table
CREATE TABLE reservationfrom (
    from_id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    wilaya wilaya_type NOT NULL,
    num_tel VARCHAR(10) NOT NULL UNIQUE,
    client_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client(client_id)
);

-- Create the services table
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    ser_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    Prestataire_id INT NOT NULL,
    FOREIGN KEY (Prestataire_id) REFERENCES prestataire(Prestataire_id)
);

-- Create the reserver table
CREATE TABLE reserver (
    service_id INT NOT NULL,
    client_id INT NOT NULL,
    event_date_id INT NOT NULL,
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reservation_status VARCHAR(50) CHECK (reservation_status IN ('pending', 'accepted', 'rejected')),
    PRIMARY KEY (service_id, client_id, event_date_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id),
    FOREIGN KEY (client_id) REFERENCES client(client_id),
    FOREIGN KEY (event_date_id) REFERENCES eventdate(event_date_id)
);

-- Insert initial data
INSERT INTO prestataire (firstname, familyname, password, Gmail_ad, created_at, userBio, role, wilaya)
VALUES (
    'chirine',
    'bouchareb',
    '$2a$10$QkdfMoqDpLiuHYvfGn8.uenAa/2XtncplNBHfG0ANJRrM13RSgGV.',
    'chirine@gmail.com',
    '2025-01-04 19:47:55',
    'professional photographer with over 10 years of experience in capturing life''s most precious moments. Specializing in portrait, event, and commercial photography',
    'Photographer',
    'Adrar'
);

-- Commit the transaction
COMMIT;