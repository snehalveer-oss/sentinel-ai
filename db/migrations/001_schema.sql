-- Sentinel-AI Relational PostgreSQL Database Schema

CREATE TABLE IF NOT EXISTS plans (
    plan_id VARCHAR(50) PRIMARY KEY,
    plan_name VARCHAR(100) NOT NULL,
    monthly_rate NUMERIC(10, 2) NOT NULL,
    data_limit_gb INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscribers (
    subscriber_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACTIVE', 'SUSPENDED')),
    plan_id VARCHAR(50) REFERENCES plans(plan_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(50) PRIMARY KEY,
    subscriber_id VARCHAR(50) REFERENCES subscribers(subscriber_id),
    total_amount NUMERIC(10, 2) NOT NULL,
    order_status VARCHAR(20) DEFAULT 'SUBMITTED' CHECK (order_status IN ('SUBMITTED', 'PROCESSING', 'COMPLETED', 'FAILED')),
    idempotency_key VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS billing_ledgers (
    ledger_id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(order_id),
    subscriber_id VARCHAR(50) REFERENCES subscribers(subscriber_id),
    amount_charged NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'SETTLED' CHECK (payment_status IN ('PENDING', 'SETTLED', 'FAILED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Baseline Plan Data
INSERT INTO plans (plan_id, plan_name, monthly_rate, data_limit_gb) 
VALUES 
    ('PLAN_5G_BASIC', '5G Unlimited Basic', 49.99, 50),
    ('PLAN_5G_PREMIUM', '5G Ultra Unlimited Premium', 79.99, 200)
ON CONFLICT (plan_id) DO NOTHING;
