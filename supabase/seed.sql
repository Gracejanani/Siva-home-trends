-- ============================================================
-- SJ Sri Jananin Saree - Seed Data
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================
-- Parent categories
-- Jewellery: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
-- Sarees:    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'

-- Child categories (Jewellery)
-- Bangles:   'cccccccc-cccc-cccc-cccc-cccccccccccc'
-- Earrings:  'dddddddd-dddd-dddd-dddd-dddddddddddd'
-- Haram:     'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'
-- Necklace:  'ffffffff-ffff-ffff-ffff-ffffffffffff'
-- Pendent:   '11111111-1111-1111-1111-111111111111'

-- Child categories (Sarees)
-- Kanchi Cotton Saree: '22222222-2222-2222-2222-222222222222'
-- Pure Silk Saree:     '33333333-3333-3333-3333-333333333333'
-- Semi Silk Saree:     '44444444-4444-4444-4444-444444444444'

INSERT INTO categories (id, name, slug, parent_id, image_url, description, sort_order, is_active) VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Jewellery',
    'jewellery',
    NULL,
    'https://picsum.photos/seed/jewellery/600/400',
    'Exquisite traditional and modern jewellery crafted with precision and elegance.',
    1,
    true
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Sarees',
    'sarees',
    NULL,
    'https://picsum.photos/seed/sarees/600/400',
    'A stunning collection of traditional Indian sarees in silk, cotton, and blended fabrics.',
    2,
    true
  ),
  -- Jewellery sub-categories
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Bangles',
    'bangles',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'https://picsum.photos/seed/bangles/600/400',
    'Traditional gold, silver and stone-studded bangles for every occasion.',
    1,
    true
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'Earrings',
    'earrings',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'https://picsum.photos/seed/earrings/600/400',
    'Beautiful earrings from jhumkas to chandbalis in various styles.',
    2,
    true
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'Haram',
    'haram',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'https://picsum.photos/seed/haram/600/400',
    'Long traditional necklaces (haram) in gold and temple jewellery styles.',
    3,
    true
  ),
  (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    'Necklace',
    'necklace',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'https://picsum.photos/seed/necklace/600/400',
    'Elegant necklaces for weddings, festivals and daily wear.',
    4,
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Pendent',
    'pendent',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'https://picsum.photos/seed/pendent/600/400',
    'Delicate pendants in gold, silver and stone designs.',
    5,
    true
  ),
  -- Sarees sub-categories
  (
    '22222222-2222-2222-2222-222222222222',
    'Kanchi Cotton Saree',
    'kanchi-cotton-saree',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'https://picsum.photos/seed/kanchi/600/400',
    'Authentic Kanchipuram cotton sarees with rich borders and vibrant colours.',
    1,
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Pure Silk Saree',
    'pure-silk-saree',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'https://picsum.photos/seed/silk/600/400',
    'Pure silk sarees from the finest looms — perfect for weddings and special occasions.',
    2,
    true
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Semi Silk Saree',
    'semi-silk-saree',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'https://picsum.photos/seed/semsilk/600/400',
    'Lightweight semi-silk sarees that combine comfort with elegance.',
    3,
    true
  );

-- ============================================================
-- PRODUCTS
-- ============================================================
-- Product UUIDs
-- Chudi Material:        'p1111111-1111-1111-1111-111111111111'
-- Cotton Sarees:         'p2222222-2222-2222-2222-222222222222'
-- Fancy Sarees:          'p3333333-3333-3333-3333-333333333333'
-- Kids Wear:             'p4444444-4444-4444-4444-444444444444'
-- Silk Sarees:           'p5555555-5555-5555-5555-555555555555'
-- Soft Silk Sarees:      'p6666666-6666-6666-6666-666666666666'
-- Tissue Sarees 1:       'p7777777-7777-7777-7777-777777777777'
-- Tissue Sarees 2:       'p8888888-8888-8888-8888-888888888888'
-- Trending Dupattas:     'p9999999-9999-9999-9999-999999999999'
-- Trending Salwars:      'paaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
-- Wedding Sarees 1:      'pbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' -- note: too long, use below
-- Wedding Sarees 1:      'pb111111-1111-1111-1111-111111111111'
-- Wedding Sarees 2:      'pb222222-2222-2222-2222-222222222222'

INSERT INTO products (
  id, name, slug, description, short_description, sku,
  price, sale_price, category_id,
  stock_quantity, is_variable, is_featured, is_new_arrival, is_best_seller,
  is_active, total_sales, images, tags,
  meta_title, meta_description
) VALUES
  -- 1. Chudi Material
  (
    'p1111111-1111-1111-1111-111111111111',
    'Chudi Material',
    'chudi-material',
    'Beautiful chudi (churidar) material in a variety of prints and weaves. Made from premium cotton-blend fabric ideal for stitching salwar kameez sets. Available in traditional block prints and contemporary designs. Each piece is 2.5 metres for the top and comes with matching dupatta fabric.',
    'Premium churidar material in vibrant prints — 2.5 m top fabric with dupatta.',
    'CM0001',
    599.00,
    499.00,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    85,
    false,
    true,
    true,
    false,
    true,
    42,
    '[
      {"url": "https://picsum.photos/seed/chudi1/600/800", "alt": "Chudi Material front view"},
      {"url": "https://picsum.photos/seed/chudi2/600/800", "alt": "Chudi Material design closeup"}
    ]'::jsonb,
    ARRAY['chudi', 'churidar', 'material', 'cotton', 'salwar'],
    'Chudi Material - Premium Churidar Fabric | SJ Sri Jananin Saree',
    'Buy beautiful chudi material online at SJ Sri Jananin Saree. Premium cotton-blend churidar fabric in vibrant prints.'
  ),

  -- 2. Cotton Sarees (variable — has colour variations)
  (
    'p2222222-2222-2222-2222-222222222222',
    'Cotton Sarees',
    'cotton-sarees',
    'Comfortable and breathable pure cotton sarees handwoven by skilled artisans. Features zari borders and temple motifs. Perfect for daily wear and casual occasions. Each saree is 5.5 metres with an unstitched blouse piece of 0.8 metres. Machine washable and colour-fast.',
    'Handwoven pure cotton sarees with zari borders — ideal for daily wear.',
    'TC0008',
    850.00,
    699.00,
    '22222222-2222-2222-2222-222222222222',
    120,
    true,
    true,
    false,
    true,
    true,
    198,
    '[
      {"url": "https://picsum.photos/seed/cotton1/600/800", "alt": "Cotton Saree blue"},
      {"url": "https://picsum.photos/seed/cotton2/600/800", "alt": "Cotton Saree green"},
      {"url": "https://picsum.photos/seed/cotton3/600/800", "alt": "Cotton Saree yellow"}
    ]'::jsonb,
    ARRAY['cotton', 'saree', 'handwoven', 'zari', 'daily wear', 'kanchi'],
    'Cotton Sarees - Handwoven Pure Cotton | SJ Sri Jananin Saree',
    'Shop handwoven pure cotton sarees with zari borders at SJ Sri Jananin Saree. Available in multiple colours.'
  ),

  -- 3. Fancy Sarees
  (
    'p3333333-3333-3333-3333-333333333333',
    'Fancy Sarees',
    'fancy-sarees',
    'Dazzling fancy sarees adorned with sequins, embroidery, and decorative borders. Perfect for parties, receptions and festive occasions. These sarees combine modern fashion sensibilities with traditional Indian aesthetics. Available in georgette, net and chiffon base fabrics.',
    'Sequin-embellished fancy sarees in georgette and net — party and festive wear.',
    'FS0012',
    1299.00,
    999.00,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    60,
    false,
    true,
    true,
    false,
    true,
    75,
    '[
      {"url": "https://picsum.photos/seed/fancy1/600/800", "alt": "Fancy Saree front"},
      {"url": "https://picsum.photos/seed/fancy2/600/800", "alt": "Fancy Saree border detail"}
    ]'::jsonb,
    ARRAY['fancy', 'saree', 'sequin', 'party wear', 'festive', 'georgette'],
    'Fancy Sarees - Party & Festive Wear | SJ Sri Jananin Saree',
    'Buy fancy sarees online at SJ Sri Jananin Saree. Sequin and embroidered sarees in georgette, net and chiffon.'
  ),

  -- 4. Kids Wear
  (
    'p4444444-4444-4444-4444-444444444444',
    'Kids Wear',
    'kids-wear',
    'Adorable traditional Indian kids wear including pattu pavadai, lehenga choli sets and mini sarees. Made from soft, skin-friendly fabrics suitable for children. Vibrant colours and attractive embroidery make these perfect for festivals, weddings and special occasions. Available in sizes 1–12 years.',
    'Traditional Indian kids ethnic wear — pattu pavadai, lehenga sets. Sizes 1–12 yrs.',
    'KW0021',
    749.00,
    599.00,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    95,
    false,
    false,
    true,
    false,
    true,
    53,
    '[
      {"url": "https://picsum.photos/seed/kids1/600/800", "alt": "Kids Wear pattu pavadai"},
      {"url": "https://picsum.photos/seed/kids2/600/800", "alt": "Kids lehenga choli set"}
    ]'::jsonb,
    ARRAY['kids', 'children', 'pattu pavadai', 'lehenga', 'ethnic', 'festive'],
    'Kids Wear - Traditional Indian Ethnic Wear for Children | SJ Sri Jananin Saree',
    'Shop cute traditional kids wear at SJ Sri Jananin Saree. Pattu pavadai, lehenga choli sets in sizes 1-12 years.'
  ),

  -- 5. Silk Sarees
  (
    'p5555555-5555-5555-5555-555555555555',
    'Silk Sarees',
    'silk-sarees',
    'Opulent Kanchipuram silk sarees crafted with real zari (gold thread) work. Each saree is a masterpiece featuring intricate temple motifs, checks and floral patterns. The rich lustre and heavy texture of these sarees make them a prized possession for every woman. 5.5 m saree with 0.8 m blouse piece.',
    'Authentic Kanchipuram silk sarees with real zari work — a wardrobe treasure.',
    'SS0034',
    4999.00,
    3999.00,
    '33333333-3333-3333-3333-333333333333',
    40,
    false,
    true,
    false,
    true,
    true,
    312,
    '[
      {"url": "https://picsum.photos/seed/silk1/600/800", "alt": "Kanchipuram Silk Saree"},
      {"url": "https://picsum.photos/seed/silk2/600/800", "alt": "Silk Saree zari border"},
      {"url": "https://picsum.photos/seed/silk3/600/800", "alt": "Silk Saree pallu detail"}
    ]'::jsonb,
    ARRAY['silk', 'saree', 'kanchipuram', 'zari', 'wedding', 'traditional'],
    'Silk Sarees - Authentic Kanchipuram Silk | SJ Sri Jananin Saree',
    'Buy authentic Kanchipuram silk sarees with real zari work at SJ Sri Jananin Saree. Perfect for weddings and ceremonies.'
  ),

  -- 6. Soft Silk Sarees
  (
    'p6666666-6666-6666-6666-666666666666',
    'Soft Silk Sarees',
    'soft-silk-sarees',
    'Lightweight soft silk sarees that offer the richness of silk with added comfort. Woven with premium mulberry silk threads, these sarees drape beautifully and are perfect for long events. Features elegant woven borders and contemporary designs. Available in pastel and bold colour palettes.',
    'Lightweight mulberry soft-silk sarees — elegant drape for long occasions.',
    'SSS0041',
    2499.00,
    1999.00,
    '33333333-3333-3333-3333-333333333333',
    55,
    false,
    true,
    true,
    true,
    true,
    189,
    '[
      {"url": "https://picsum.photos/seed/softsilk1/600/800", "alt": "Soft Silk Saree drape"},
      {"url": "https://picsum.photos/seed/softsilk2/600/800", "alt": "Soft Silk Saree border"}
    ]'::jsonb,
    ARRAY['soft silk', 'saree', 'mulberry', 'lightweight', 'elegant', 'festive'],
    'Soft Silk Sarees - Lightweight Elegance | SJ Sri Jananin Saree',
    'Shop soft silk sarees online. Lightweight mulberry silk sarees with elegant borders at SJ Sri Jananin Saree.'
  ),

  -- 7. Tissue Sarees (1)
  (
    'p7777777-7777-7777-7777-777777777777',
    'Tissue Sarees',
    'tissue-sarees',
    'Shimmering tissue sarees woven with metallic threads that give a golden or silver sheen. The translucent texture of tissue fabric creates a stunning effect in light. These sarees are ideal for evening events, receptions and sangeet ceremonies. Comes with a matching tissue blouse piece.',
    'Shimmering tissue sarees with metallic thread — perfect for evenings and receptions.',
    'TS0051',
    1799.00,
    1399.00,
    '44444444-4444-4444-4444-444444444444',
    70,
    false,
    false,
    true,
    false,
    true,
    88,
    '[
      {"url": "https://picsum.photos/seed/tissue1/600/800", "alt": "Tissue Saree shimmer"},
      {"url": "https://picsum.photos/seed/tissue2/600/800", "alt": "Tissue Saree metallic border"}
    ]'::jsonb,
    ARRAY['tissue', 'saree', 'metallic', 'shimmer', 'evening wear', 'reception'],
    'Tissue Sarees - Shimmering Metallic Weave | SJ Sri Jananin Saree',
    'Buy tissue sarees with metallic shimmer at SJ Sri Jananin Saree. Perfect for evening events and receptions.'
  ),

  -- 8. Tissue Sarees (2)
  (
    'p8888888-8888-8888-8888-888888888888',
    'Tissue Sarees - Designer Collection',
    'tissue-sarees-designer',
    'Exclusive designer tissue sarees with embroidered motifs and printed pallu. This special collection blends traditional tissue weaving with modern embroidery techniques. The sarees feature intricate peacock, lotus and geometric motifs on the border and pallu. Limited edition pieces for the discerning shopper.',
    'Designer tissue sarees with embroidered peacock and lotus motifs — limited edition.',
    'TS0058',
    2199.00,
    1799.00,
    '44444444-4444-4444-4444-444444444444',
    35,
    false,
    true,
    true,
    false,
    true,
    47,
    '[
      {"url": "https://picsum.photos/seed/tissue3/600/800", "alt": "Designer Tissue Saree front"},
      {"url": "https://picsum.photos/seed/tissue4/600/800", "alt": "Designer Tissue Saree pallu"}
    ]'::jsonb,
    ARRAY['tissue', 'saree', 'designer', 'embroidered', 'peacock', 'limited edition'],
    'Designer Tissue Sarees - Embroidered Collection | SJ Sri Jananin Saree',
    'Shop exclusive designer tissue sarees with embroidered motifs at SJ Sri Jananin Saree. Limited edition collection.'
  ),

  -- 9. Trending Dupattas
  (
    'p9999999-9999-9999-9999-999999999999',
    'Trending Dupattas',
    'trending-dupattas',
    'Stylish dupattas in trending prints and fabrics. Our dupatta collection features phulkari embroidery, block prints, mirror work and digital prints on chiffon, georgette and cotton base fabrics. The perfect accessory to elevate any ethnic outfit — works beautifully with both salwar suits and sarees.',
    'Trendy dupattas in phulkari, block print and mirror work — multiple fabrics.',
    'TD0062',
    399.00,
    299.00,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    150,
    false,
    false,
    true,
    true,
    true,
    267,
    '[
      {"url": "https://picsum.photos/seed/dupatta1/600/800", "alt": "Trending Dupatta phulkari"},
      {"url": "https://picsum.photos/seed/dupatta2/600/800", "alt": "Dupatta mirror work"}
    ]'::jsonb,
    ARRAY['dupatta', 'trending', 'phulkari', 'block print', 'mirror work', 'accessories'],
    'Trending Dupattas - Phulkari, Block Print & Mirror Work | SJ Sri Jananin Saree',
    'Buy trending dupattas online at SJ Sri Jananin Saree. Phulkari, block print and mirror work dupattas in chiffon and georgette.'
  ),

  -- 10. Trending Salwars
  (
    'paaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Trending Salwars',
    'trending-salwars',
    'Fashion-forward salwar kameez sets in the latest trending styles. Our collection includes Anarkali suits, straight-cut kurtas and palazzo sets in vibrant prints and embroidered fabrics. Each set comes with matching dupatta. Available in sizes S to 3XL. Perfect for festivals, college and casual outings.',
    'Latest trend salwar kameez sets — Anarkali, straight-cut and palazzo. S to 3XL.',
    'TRS0071',
    999.00,
    799.00,
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    110,
    false,
    true,
    true,
    false,
    true,
    143,
    '[
      {"url": "https://picsum.photos/seed/salwar1/600/800", "alt": "Trending Salwar Anarkali"},
      {"url": "https://picsum.photos/seed/salwar2/600/800", "alt": "Palazzo set with dupatta"}
    ]'::jsonb,
    ARRAY['salwar', 'kameez', 'anarkali', 'palazzo', 'trending', 'ethnic'],
    'Trending Salwars - Anarkali & Palazzo Sets | SJ Sri Jananin Saree',
    'Shop trending salwar kameez sets online at SJ Sri Jananin Saree. Anarkali, straight-cut and palazzo styles in sizes S-3XL.'
  ),

  -- 11. Wedding Sarees (1)
  (
    'pb111111-1111-1111-1111-111111111111',
    'Wedding Sarees',
    'wedding-sarees',
    'Magnificent wedding sarees crafted for the most special day of your life. Our bridal collection features heavily embroidered silk and satin sarees with intricate zardosi, cutdana and stone work. Available in auspicious colours like red, maroon, gold and pink. Each saree is a hand-finished masterpiece that will be treasured forever.',
    'Heavily embroidered bridal sarees with zardosi and stone work — in red, maroon, gold.',
    'WS0081',
    7999.00,
    6499.00,
    '33333333-3333-3333-3333-333333333333',
    25,
    false,
    true,
    false,
    true,
    true,
    421,
    '[
      {"url": "https://picsum.photos/seed/wedding1/600/800", "alt": "Wedding Saree bridal red"},
      {"url": "https://picsum.photos/seed/wedding2/600/800", "alt": "Wedding Saree zardosi border"},
      {"url": "https://picsum.photos/seed/wedding3/600/800", "alt": "Wedding Saree full drape"}
    ]'::jsonb,
    ARRAY['wedding', 'saree', 'bridal', 'zardosi', 'embroidered', 'silk', 'red'],
    'Wedding Sarees - Bridal Silk & Embroidered Collection | SJ Sri Jananin Saree',
    'Buy exquisite wedding sarees at SJ Sri Jananin Saree. Heavily embroidered bridal silk sarees with zardosi and stone work.'
  ),

  -- 12. Wedding Sarees (2)
  (
    'pb222222-2222-2222-2222-222222222222',
    'Wedding Sarees - Pastel Collection',
    'wedding-sarees-pastel',
    'Contemporary wedding sarees in soft pastel hues for the modern bride. This collection reimagines bridal fashion with blush pink, mint green, lilac and peach tones. Features delicate floral embroidery, sequin work and shimmer borders. Lightweight fabrics ensure comfort throughout the wedding day ceremonies.',
    'Modern bridal sarees in pastel hues with floral embroidery — blush pink, lilac, peach.',
    'WS0089',
    6499.00,
    5299.00,
    '33333333-3333-3333-3333-333333333333',
    20,
    false,
    true,
    true,
    false,
    true,
    178,
    '[
      {"url": "https://picsum.photos/seed/wedding4/600/800", "alt": "Pastel Wedding Saree blush pink"},
      {"url": "https://picsum.photos/seed/wedding5/600/800", "alt": "Pastel Wedding Saree floral embroidery"}
    ]'::jsonb,
    ARRAY['wedding', 'saree', 'bridal', 'pastel', 'floral', 'modern', 'sequin'],
    'Wedding Sarees Pastel Collection - Modern Bridal | SJ Sri Jananin Saree',
    'Shop pastel wedding sarees at SJ Sri Jananin Saree. Contemporary bridal sarees in blush pink, lilac and peach tones.'
  );

-- ============================================================
-- PRODUCT VARIATIONS (Cotton Sarees — TC0008)
-- ============================================================
INSERT INTO product_variations (
  id, product_id, sku, price, sale_price, stock_quantity,
  color, color_hex, image_url, is_active
) VALUES
  (
    'v1111111-1111-1111-1111-111111111111',
    'p2222222-2222-2222-2222-222222222222',
    'TC0008-B',
    850.00,
    699.00,
    30,
    'Blue',
    '#1565C0',
    'https://picsum.photos/seed/cotton-blue/600/800',
    true
  ),
  (
    'v2222222-2222-2222-2222-222222222222',
    'p2222222-2222-2222-2222-222222222222',
    'TC0008-BR',
    850.00,
    699.00,
    20,
    'Brown',
    '#6D4C41',
    'https://picsum.photos/seed/cotton-brown/600/800',
    true
  ),
  (
    'v3333333-3333-3333-3333-333333333333',
    'p2222222-2222-2222-2222-222222222222',
    'TC0008-G',
    850.00,
    699.00,
    25,
    'Green',
    '#2E7D32',
    'https://picsum.photos/seed/cotton-green/600/800',
    true
  ),
  (
    'v4444444-4444-4444-4444-444444444444',
    'p2222222-2222-2222-2222-222222222222',
    'TC0008-P',
    850.00,
    699.00,
    15,
    'Purple',
    '#6A1B9A',
    'https://picsum.photos/seed/cotton-purple/600/800',
    true
  ),
  (
    'v5555555-5555-5555-5555-555555555555',
    'p2222222-2222-2222-2222-222222222222',
    'TC0008-Y',
    850.00,
    699.00,
    30,
    'Yellow',
    '#F9A825',
    'https://picsum.photos/seed/cotton-yellow/600/800',
    true
  );

-- ============================================================
-- REVIEWS (pre-approved sample reviews)
-- ============================================================
INSERT INTO reviews (
  id, product_id, user_id, reviewer_name, reviewer_email,
  rating, title, content,
  is_verified_purchase, is_approved, helpful_count
) VALUES
  -- Cotton Sarees reviews
  (
    'r1111111-1111-1111-1111-111111111111',
    'p2222222-2222-2222-2222-222222222222',
    NULL,
    'Meena Krishnaswamy',
    'meena.k@example.com',
    5,
    'Excellent quality, very happy!',
    'I ordered the blue cotton saree and I am absolutely thrilled. The fabric is so soft and breathable, perfect for Chennai summers. The zari border is beautiful and the colour has not faded even after three washes. Will definitely order again!',
    true,
    true,
    12
  ),
  (
    'r2222222-2222-2222-2222-222222222222',
    'p2222222-2222-2222-2222-222222222222',
    NULL,
    'Priya Sundaram',
    'priya.s@example.com',
    4,
    'Great value for money',
    'The saree is lovely and the purple colour is very rich. Delivery was quick. The only reason I am not giving 5 stars is that the blouse piece was slightly shorter than expected. Otherwise a great purchase.',
    true,
    true,
    8
  ),
  (
    'r3333333-3333-3333-3333-333333333333',
    'p2222222-2222-2222-2222-222222222222',
    NULL,
    'Lakshmi Rajan',
    'lakshmi.r@example.com',
    5,
    'Superb cotton saree!',
    'Bought the green and yellow variants both. Very pleased with both. The weave quality is authentic handloom and the saree drapes beautifully. Highly recommend to anyone looking for quality cotton sarees at an affordable price.',
    true,
    true,
    15
  ),
  -- Silk Sarees review
  (
    'r4444444-4444-4444-4444-444444444444',
    'p5555555-5555-5555-5555-555555555555',
    NULL,
    'Saroja Venkataraman',
    'saroja.v@example.com',
    5,
    'Genuine Kanchipuram silk, worth every rupee',
    'I was sceptical about buying a silk saree online but this exceeded my expectations. The zari is real and the silk is thick and lustrous. Got many compliments at my daughter''s wedding. Packaging was excellent with a beautiful gift box. Will definitely shop here again.',
    true,
    true,
    22
  ),
  (
    'r5555555-5555-5555-5555-555555555555',
    'p5555555-5555-5555-5555-555555555555',
    NULL,
    'Bharathi Nair',
    'bharathi.n@example.com',
    4,
    'Beautiful saree, slightly delayed delivery',
    'The saree is stunning and absolutely genuine silk. I wish the delivery was a bit faster — it took 6 days to arrive — but the product itself is perfect. The colour is exactly as shown in the photo.',
    false,
    true,
    6
  ),
  -- Wedding Sarees review
  (
    'r6666666-6666-6666-6666-666666666666',
    'pb111111-1111-1111-1111-111111111111',
    NULL,
    'Deepa Murugesan',
    'deepa.m@example.com',
    5,
    'My dream wedding saree!',
    'This was my wedding saree and it was absolutely perfect. The red with gold zardosi work is stunning and I received so many compliments on my wedding day. The saree is heavy but beautifully crafted. Worth every rupee for such a special occasion.',
    true,
    true,
    34
  ),
  (
    'r7777777-7777-7777-7777-777777777777',
    'pb111111-1111-1111-1111-111111111111',
    NULL,
    'Kavitha Balaji',
    'kavitha.b@example.com',
    5,
    'Gorgeous bridal saree!',
    'Bought this for my sister''s wedding and she looked absolutely radiant. The stone work and cutdana embroidery are breathtaking. The maroon colour saree is so vibrant in person. Superb craftsmanship!',
    true,
    true,
    19
  ),
  -- Soft Silk review
  (
    'r8888888-8888-8888-8888-888888888888',
    'p6666666-6666-6666-6666-666666666666',
    NULL,
    'Anitha Raghunathan',
    'anitha.rr@example.com',
    5,
    'So comfortable and elegant!',
    'I wore this soft silk saree for a reception and it was perfect. Light enough to wear all evening without feeling heavy but still looks very graceful and rich. The border design is very pretty. Highly recommended!',
    true,
    true,
    11
  ),
  -- Fancy Sarees review
  (
    'r9999999-9999-9999-9999-999999999999',
    'p3333333-3333-3333-3333-333333333333',
    NULL,
    'Nithya Subramaniam',
    'nithya.sub@example.com',
    4,
    'Great for parties!',
    'Wore this for a family function and it was a head-turner. The sequin work is lovely and the georgette fabric drapes nicely. I styled it with statement earrings and got loads of compliments. Good value for a party saree.',
    false,
    true,
    7
  ),
  -- Trending Dupattas review
  (
    'raaaaaa00-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'p9999999-9999-9999-9999-999999999999',
    NULL,
    'Sindhu Prakash',
    'sindhu.p@example.com',
    5,
    'Beautiful dupattas at great price!',
    'Ordered three dupattas — the phulkari, the block print and the mirror work ones. All three are gorgeous and the colours are very vibrant. Shipping was fast and the packaging was neat. Will be ordering more soon!',
    true,
    true,
    9
  );

-- ============================================================
-- NEWSLETTER SUBSCRIBERS (sample)
-- ============================================================
INSERT INTO newsletter_subscribers (email, name, is_active) VALUES
  ('sample1@example.com', 'Meena K', true),
  ('sample2@example.com', 'Priya S', true),
  ('sample3@example.com', 'Lakshmi R', true),
  ('sample4@example.com', 'Saroja V', true),
  ('sample5@example.com', 'Deepa M', true);
