-- Seed data for Adora Fashion Database
-- Run this after schema.sql

-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Dresses', 'dresses', 'Gözəl paltarlar və geyimlər'),
  ('Blouses', 'blouses', 'Rahat və zərif bluzlar'),
  ('Suits', 'suits', 'Peşəkar iş kostyumları'),
  ('Coats', 'coats', 'Qış və yaz paltoları'),
  ('Skirts', 'skirts', 'Zərif yubkalar'),
  ('Accessories', 'accessories', 'Aksesuarlar və çantalar')
ON CONFLICT DO NOTHING;

-- Note: Products will be added through the admin panel or API
-- Sample products can be inserted here if needed
