<?php
ini_set('display_errors', 0);
header('Content-Type: application/json');
require "vendor/autoload.php";

if(isset($_GET['product_url'])) {
    $product_url = $_GET["product_url"];
} else {
    $product_url = '';
}

// echo $product_url;

$regexHmCom = '/hm\.com\//mi';
$regexShopeeVN = '/shopee\.vn\//mi';
$regexTiki = '/tiki\.vn\//mi';

if (preg_match($regexHmCom, $product_url)) {
    require "./sites/hm.com.php";
    echo getProductByURL($product_url);
}

if (preg_match($regexShopeeVN, $product_url)) {
    require "./sites/shopee.vn.php";
    echo getProductByURL($product_url);
}

if (preg_match($regexTiki, $product_url)) {
    require "./sites/tiki.vn.php";
    echo getProductByURL($product_url);
}