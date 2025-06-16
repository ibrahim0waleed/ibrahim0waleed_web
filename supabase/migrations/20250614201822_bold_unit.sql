/*
  # Create projects table for portfolio management

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title_en` (text, English title)
      - `title_ar` (text, Arabic title)
      - `description_en` (text, English description)
      - `description_ar` (text, Arabic description)
      - `image` (text, image URL)
      - `technologies` (text array, list of technologies used)
      - `live_url` (text, optional live demo URL)
      - `github_url` (text, optional GitHub repository URL)
      - `category` (text, project category)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
    - Add policy for authenticated admin users to manage projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  image text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  live_url text,
  github_url text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can read projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated users to manage projects
-- Note: You'll need to replace 'your-admin-user-id' with your actual user ID
CREATE POLICY "Admin can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = 'your-admin-user-id');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();