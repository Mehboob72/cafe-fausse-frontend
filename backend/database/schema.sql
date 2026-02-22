-- ============================================
-- CAFÉ FAUSSE - COMPLETE DATABASE SCHEMA
-- PostgreSQL Database Setup
-- ============================================

-- Step 1: Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Step 2: Create Customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create Reservations table
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL CHECK (table_number >= 1 AND table_number <= 30),
    number_of_guests INTEGER NOT NULL CHECK (number_of_guests >= 1 AND number_of_guests <= 12),
    special_requests TEXT,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    UNIQUE (table_number, time_slot)
);

-- Step 4: Create indexes for better query performance
CREATE INDEX idx_reservations_time_slot ON reservations(time_slot);
CREATE INDEX idx_reservations_customer_id ON reservations(customer_id);
CREATE INDEX idx_customers_email ON customers(customer_email);
CREATE INDEX idx_customers_newsletter ON customers(newsletter_signup);

-- Step 5: Create a function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 6: Create triggers to automatically update updated_at
CREATE TRIGGER update_customers_updated_at 
    BEFORE UPDATE ON customers
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at 
    BEFORE UPDATE ON reservations
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Insert sample data for testing (OPTIONAL)
INSERT INTO customers (customer_name, customer_email, phone_number, newsletter_signup)
VALUES 
    ('John Doe', 'john.doe@example.com', '+1-555-0101', true),
    ('Jane Smith', 'jane.smith@example.com', '+1-555-0102', true),
    ('Robert Johnson', 'robert.j@example.com', '+1-555-0103', false);

-- Step 8: Insert sample reservations (OPTIONAL)
INSERT INTO reservations (customer_id, time_slot, table_number, number_of_guests, special_requests)
VALUES 
    (1, CURRENT_TIMESTAMP + INTERVAL '2 days', 5, 2, 'Window seat preferred'),
    (2, CURRENT_TIMESTAMP + INTERVAL '3 days', 12, 4, 'Birthday celebration'),
    (3, CURRENT_TIMESTAMP + INTERVAL '4 days', 8, 6, 'Vegetarian options needed');

-- Step 9: Verify tables were created
SELECT 'Database setup complete!' as message;
SELECT COUNT(*) as total_customers FROM customers;
SELECT COUNT(*) as total_reservations FROM reservations;
