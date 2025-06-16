/*
  # Create blog_posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title_en` (text, not null)
      - `title_ar` (text, not null)
      - `excerpt_en` (text, not null)
      - `excerpt_ar` (text, not null)
      - `image` (text, not null)
      - `date` (text, not null)
      - `category` (text, not null)
      - `read_time` (integer, not null)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access to all blog posts
    - Add policy for authenticated admin users to manage blog posts

  3. Changes
    - Create trigger for automatic updated_at timestamp updates
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  excerpt_en text NOT NULL,
  excerpt_ar text NOT NULL,
  image text NOT NULL,
  date text NOT NULL,
  category text NOT NULL,
  read_time integer NOT NULL DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated admin users to manage blog posts
CREATE POLICY "Admin can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = 'your-admin-user-id');

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();