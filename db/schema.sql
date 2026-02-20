-- ================================================
-- Makhazen Alenayah - Database Schema
-- ================================================

CREATE DATABASE IF NOT EXISTS makhazen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE makhazen_db;

-- ------------------------------------------------
-- Admins table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------
-- Branches table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_ar VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    city_ar VARCHAR(100),
    city_en VARCHAR(100),
    address_ar TEXT,
    address_en TEXT,
    phone VARCHAR(30),
    map_url TEXT,
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------
-- Brands table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_ar VARCHAR(255),
    name_en VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------
-- Social media table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS social_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    platform_ar VARCHAR(50),
    url VARCHAR(500) NOT NULL,
    username VARCHAR(100),
    icon VARCHAR(50),
    color VARCHAR(20),
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------
-- Contact info table
-- ------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    value VARCHAR(255) NOT NULL,
    label_ar VARCHAR(100),
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- ================================================
-- SEED DATA
-- ================================================

-- Admin: username=admin | password=admin123
INSERT INTO admins (username, password, name) VALUES
('admin', SHA2('admin123', 256), 'مدير النظام');

-- ------------------------------------------------
-- 25 Branches
-- ------------------------------------------------
INSERT INTO branches (name_ar, name_en, city_ar, city_en, address_ar, phone, map_url, sort_order) VALUES
('فرع العليا', 'Olaya Branch', 'الرياض', 'Riyadh', 'حي العليا، طريق الملك فهد، الرياض', '0112345601', 'https://maps.google.com/?q=24.6921,46.6872', 1),
('فرع النخيل مول', 'Nakheel Mall Branch', 'الرياض', 'Riyadh', 'نخيل مول، طريق الملك فهد، الرياض', '0112345602', 'https://maps.google.com/?q=24.7593,46.6382', 2),
('فرع مول الرياض', 'Riyadh Mall Branch', 'الرياض', 'Riyadh', 'مول الرياض، طريق الملك عبدالله، الرياض', '0112345603', 'https://maps.google.com/?q=24.7519,46.7185', 3),
('فرع حي طويق', 'Tuwaiq Branch', 'الرياض', 'Riyadh', 'حي طويق، شارع الأمير محمد بن سعد، الرياض', '0112345604', 'https://maps.google.com/?q=24.6201,46.5771', 4),
('فرع حي الياسمين', 'Yasmin Branch', 'الرياض', 'Riyadh', 'حي الياسمين، طريق أنس بن مالك، الرياض', '0112345605', 'https://maps.google.com/?q=24.8154,46.6781', 5),
('فرع البلد', 'Old Town Branch', 'جدة', 'Jeddah', 'البلد التاريخي، شارع الهندية، جدة', '0122345601', 'https://maps.google.com/?q=21.4858,39.1879', 6),
('فرع الحمرا', 'Hamra Branch', 'جدة', 'Jeddah', 'حي الحمرا، شارع فلسطين، جدة', '0122345602', 'https://maps.google.com/?q=21.5433,39.1728', 7),
('فرع النزهة', 'Nuzha Branch', 'جدة', 'Jeddah', 'حي النزهة، جدة', '0122345603', 'https://maps.google.com/?q=21.5590,39.1854', 8),
('فرع جوهرة مول', 'Jawharah Mall Branch', 'جدة', 'Jeddah', 'جوهرة مول، طريق الملك عبدالعزيز، جدة', '0122345604', 'https://maps.google.com/?q=21.4925,39.1929', 9),
('فرع كورنيش الدمام', 'Dammam Corniche Branch', 'الدمام', 'Dammam', 'كورنيش الدمام، شارع الأمير محمد، الدمام', '0132345601', 'https://maps.google.com/?q=26.4207,50.0888', 10),
('فرع حي الفيصلية', 'Faisaliyah Branch', 'الدمام', 'Dammam', 'حي الفيصلية، الدمام', '0132345602', 'https://maps.google.com/?q=26.4367,50.1028', 11),
('فرع حي العنود', 'Anoud Branch', 'الدمام', 'Dammam', 'حي العنود، الدمام', '0132345603', 'https://maps.google.com/?q=26.4058,50.1198', 12),
('فرع حي الراكة', 'Rakah Branch', 'الخبر', 'Khobar', 'حي الراكة الشمالية، الخبر', '0132345604', 'https://maps.google.com/?q=26.2794,50.2083', 13),
('فرع شارع الأمير فهد', 'Prince Fahd St Branch', 'الخبر', 'Khobar', 'شارع الأمير محمد بن فهد، الخبر', '0132345605', 'https://maps.google.com/?q=26.2976,50.1984', 14),
('فرع العزيزية', 'Aziziyah Branch', 'مكة المكرمة', 'Makkah', 'حي العزيزية، مكة المكرمة', '0122345610', 'https://maps.google.com/?q=21.3891,39.8579', 15),
('فرع النسيم', 'Naseem Branch', 'مكة المكرمة', 'Makkah', 'حي النسيم، مكة المكرمة', '0122345611', 'https://maps.google.com/?q=21.4225,39.8255', 16),
('فرع حي العوالي', 'Awali Branch', 'المدينة المنورة', 'Madinah', 'حي العوالي، المدينة المنورة', '0148345601', 'https://maps.google.com/?q=24.5247,39.5692', 17),
('فرع بني حارثة', 'Bani Haritha Branch', 'المدينة المنورة', 'Madinah', 'حي بني حارثة، المدينة المنورة', '0148345602', 'https://maps.google.com/?q=24.5020,39.5894', 18),
('فرع المنهل - أبها', 'Manhal Branch', 'أبها', 'Abha', 'حي المنهل، أبها', '0172345601', 'https://maps.google.com/?q=18.2164,42.5053', 19),
('فرع حي الشهداء - الطائف', 'Shuhadaa Branch', 'الطائف', 'Taif', 'حي الشهداء، الطائف', '0122345620', 'https://maps.google.com/?q=21.2854,40.4149', 20),
('فرع الفناتير - الجبيل', 'Fanateer Branch', 'الجبيل', 'Jubail', 'حي الفناتير، الجبيل الصناعية', '0133345601', 'https://maps.google.com/?q=27.0174,49.6580', 21),
('فرع حي المروة - تبوك', 'Marwah Branch', 'تبوك', 'Tabuk', 'حي المروة، تبوك', '0144345601', 'https://maps.google.com/?q=28.3998,36.5662', 22),
('فرع حي الحمر - حائل', 'Hamr Branch', 'حائل', 'Hail', 'حي الحمر، حائل', '0163345601', 'https://maps.google.com/?q=27.5114,41.6900', 23),
('فرع وسط المدينة - بريدة', 'Central Buraidah Branch', 'بريدة', 'Buraidah', 'وسط مدينة بريدة، القصيم', '0163345602', 'https://maps.google.com/?q=26.3292,43.9750', 24),
('فرع حي الشرفية - ينبع', 'Sharafiya Branch', 'ينبع', 'Yanbu', 'حي الشرفية، ينبع البحر', '0144345602', 'https://maps.google.com/?q=24.0875,38.0580', 25);

-- ------------------------------------------------
-- 25 Brands
-- ------------------------------------------------
INSERT INTO brands (name_ar, name_en, sort_order) VALUES
('لوريال باريس', 'L\'Oréal Paris', 1),
('ميبيلين نيويورك', 'Maybelline New York', 2),
('ناكس برو ميك أب', 'NYX Professional Makeup', 3),
('ماك كوزمتيكس', 'MAC Cosmetics', 4),
('فينتي بيوتي', 'Fenty Beauty', 5),
('شارلوت تيلبيري', 'Charlotte Tilbury', 6),
('أربان ديكاي', 'Urban Decay', 7),
('نارس كوزمتيكس', 'NARS Cosmetics', 8),
('لانكوم باريس', 'Lancôme', 9),
('إيف سان لوران بيوتي', 'YSL Beauty', 10),
('ديور بيوتي', 'Dior Beauty', 11),
('شانيل بيوتي', 'Chanel Beauty', 12),
('جيفنشي بيوتي', 'Givenchy Beauty', 13),
('أرماني بيوتي', 'Armani Beauty', 14),
('توم فورد بيوتي', 'Tom Ford Beauty', 15),
('فالنتينو بيوتي', 'Valentino Beauty', 16),
('باربيري بيوتي', 'Burberry Beauty', 17),
('جو مالون لندن', 'Jo Malone London', 18),
('بارفانز دي مارلي', 'Parfums de Marly', 19),
('كيليان باريس', 'Kilian Paris', 20),
('برادا بيوتي', 'Prada Beauty', 21),
('كارولينا هيريرا', 'Carolina Herrera', 22),
('فيكتور آند رولف', 'Viktor&Rolf', 23),
('ناركيسو رودريغيز', 'Narciso Rodriguez', 24),
('ميمو باريس', 'Memo Paris', 25);

-- ------------------------------------------------
-- Social Media
-- ------------------------------------------------
INSERT INTO social_media (platform, platform_ar, url, username, icon, color, sort_order) VALUES
('Instagram', 'انستقرام', 'https://instagram.com/makhazen_alenayah', '@makhazen_alenayah', 'fa-instagram', '#E1306C', 1),
('TikTok', 'تيك توك', 'https://tiktok.com/@makhazen_alenayah', '@makhazen_alenayah', 'fa-tiktok', '#ffffff', 2),
('Snapchat', 'سناب شات', 'https://snapchat.com/add/makhazen_care', 'makhazen_care', 'fa-snapchat', '#FFFC00', 3),
('Twitter', 'تويتر / X', 'https://twitter.com/makhazen_care', '@makhazen_care', 'fa-x-twitter', '#ffffff', 4),
('WhatsApp', 'واتساب', 'https://wa.me/966500000000', '0500000000', 'fa-whatsapp', '#25D366', 5),
('YouTube', 'يوتيوب', 'https://youtube.com/@makhazen_alenayah', '@makhazen_alenayah', 'fa-youtube', '#FF0000', 6);

-- ------------------------------------------------
-- Contact Info
-- ------------------------------------------------
INSERT INTO contact_info (type, value, label_ar, sort_order) VALUES
('phone', '920000000', 'خدمة العملاء', 1),
('whatsapp', '+966500000000', 'واتساب', 2),
('email', 'info@makhazen-alenayah.com', 'البريد الإلكتروني', 3);
