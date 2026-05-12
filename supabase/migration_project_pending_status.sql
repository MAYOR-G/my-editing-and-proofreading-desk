-- Add an explicit Pending status for admin project tracking.
ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'Pending' BEFORE 'In Progress';
