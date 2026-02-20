<?php
// ================================================
// Public API - Returns all active data
// ================================================
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$db = getDB();

// Branches
$branches = $db->query("
    SELECT id, name_ar, name_en, city_ar, city_en, address_ar, address_en, phone, map_url, sort_order
    FROM branches WHERE is_active = 1 ORDER BY sort_order ASC, city_ar ASC
")->fetchAll();

// Brands
$brands = $db->query("
    SELECT id, name_ar, name_en, logo_url, website_url, sort_order
    FROM brands WHERE is_active = 1 ORDER BY sort_order ASC, name_en ASC
")->fetchAll();

// Social media
$social = $db->query("
    SELECT id, platform, platform_ar, url, username, icon, color, sort_order
    FROM social_media WHERE is_active = 1 ORDER BY sort_order ASC
")->fetchAll();

// Contact info
$contact = $db->query("
    SELECT id, type, value, label_ar
    FROM contact_info WHERE is_active = 1 ORDER BY sort_order ASC
")->fetchAll();

echo json_encode([
    'success'  => true,
    'branches' => $branches,
    'brands'   => $brands,
    'social'   => $social,
    'contact'  => $contact,
], JSON_UNESCAPED_UNICODE);
