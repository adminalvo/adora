-- Helper Functions for Adora Fashion Database
-- Note: order_number_seq is created in schema.sql, so this file should be run after schema.sql

-- Function to generate order number (already in schema.sql, but kept here for reference)
-- CREATE OR REPLACE FUNCTION generate_order_number()
-- RETURNS TEXT AS $$
-- DECLARE
--   new_order_number TEXT;
-- BEGIN
--   new_order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
--   RETURN new_order_number;
-- END;
-- $$ LANGUAGE plpgsql;

-- Function to get user cart total
CREATE OR REPLACE FUNCTION get_cart_total(p_user_id UUID)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
  total DECIMAL(10, 2);
BEGIN
  SELECT COALESCE(SUM(p.price * ci.quantity), 0)
  INTO total
  FROM public.cart_items ci
  JOIN public.products p ON ci.product_id = p.id
  WHERE ci.user_id = p_user_id;
  
  RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Function to get cart item count
CREATE OR REPLACE FUNCTION get_cart_item_count(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  item_count INTEGER;
BEGIN
  SELECT COALESCE(SUM(quantity), 0)
  INTO item_count
  FROM public.cart_items
  WHERE user_id = p_user_id;
  
  RETURN item_count;
END;
$$ LANGUAGE plpgsql;
