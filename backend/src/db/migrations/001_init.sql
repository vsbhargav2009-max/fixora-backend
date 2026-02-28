CREATE TYPE user_role AS ENUM ('client', 'freelancer', 'admin');
CREATE TYPE kyc_state AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE project_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled', 'disputed');
CREATE TYPE bid_status AS ENUM ('submitted', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE payment_status AS ENUM ('initiated', 'escrow_held', 'released', 'failed', 'refunded');

CREATE TABLE Users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  rating NUMERIC(3,2) DEFAULT 0,
  completed_projects INT DEFAULT 0,
  kyc_status kyc_state DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES Users(id),
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  budget NUMERIC(12,2) NOT NULL,
  status project_status DEFAULT 'open',
  deadline DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES Projects(id),
  freelancer_id UUID NOT NULL REFERENCES Users(id),
  bid_amount NUMERIC(12,2) NOT NULL,
  message TEXT NOT NULL,
  status bid_status DEFAULT 'submitted'
);

CREATE TABLE Payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID UNIQUE NOT NULL REFERENCES Projects(id),
  total_paid_by_client NUMERIC(12,2) NOT NULL,
  commission NUMERIC(12,2) NOT NULL,
  gst NUMERIC(12,2) NOT NULL,
  gateway_fee NUMERIC(12,2) NOT NULL,
  freelancer_payout NUMERIC(12,2) NOT NULL,
  status payment_status DEFAULT 'initiated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES Projects(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE Payment_Transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES Payments(id),
  step VARCHAR(60) NOT NULL,
  gateway_reference VARCHAR(255),
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
