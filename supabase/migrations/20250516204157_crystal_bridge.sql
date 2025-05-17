/*
  # Initial Vibe Check Quiz Schema

  1. New Tables
    - `quiz_results` - Stores individual quiz submissions
      - `id` (primary key)
      - `created_at` (timestamp)
      - `vibe_type` (text, the resulting vibe category)
      - `session_id` (text, unique identifier for the session)
    
    - `vibe_stats` - View for aggregate stats on vibe distributions
      - `id` (primary key)
      - `vibe_type` (text, the vibe category)
      - `count` (integer, number of users with this vibe)
      - `percentage` (float, percentage of total users with this vibe)

  2. Security
    - Enable RLS on `quiz_results` table
    - Add policies for INSERT on `quiz_results`
    - Public read access to `vibe_stats`
*/

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  vibe_type TEXT NOT NULL,
  session_id TEXT NOT NULL
);

-- Enable RLS on quiz_results
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Add policy to allow inserts from anyone
CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create view for vibe statistics 
CREATE OR REPLACE VIEW vibe_stats AS
WITH total_results AS (
  SELECT COUNT(*) AS total FROM quiz_results
)
SELECT 
  ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS id,
  vibe_type,
  COUNT(*) AS count,
  ROUND((COUNT(*) * 100.0 / total), 1) AS percentage
FROM 
  quiz_results, total_results
GROUP BY 
  vibe_type, total
ORDER BY 
  count DESC;

-- Grant select access to vibe_stats for anonymous users
GRANT SELECT ON vibe_stats TO anon;

-- Add function to notify on quiz_results changes
CREATE OR REPLACE FUNCTION notify_on_quiz_results_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('vibe_stats_changes', 'updated');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to fire notification when quiz_results changes
CREATE TRIGGER quiz_results_changed
AFTER INSERT OR UPDATE OR DELETE ON quiz_results
FOR EACH STATEMENT
EXECUTE FUNCTION notify_on_quiz_results_change();