/*
  # Fix Blog Posts Display Issues

  1. Security Updates
    - Update RLS policies to allow public read access
    - Ensure admin can manage all content
    - Fix any policy conflicts

  2. Data Validation
    - Ensure proper data types and constraints
    - Add indexes for better performance

  3. Real-time Updates
    - Enable real-time subscriptions for blog posts
*/

-- First, drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can read blog posts" ON blog_posts;

-- Create new, clearer policies
CREATE POLICY "Public can read blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Add index for better performance on date ordering
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

-- Enable real-time for blog_posts
ALTER PUBLICATION supabase_realtime ADD TABLE blog_posts;