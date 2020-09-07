<?php
ini_set('display_errors', 0);
// header('Content-Type: application/json, Api-key: 24hdev');
require "vendor/autoload.php";
// require "index.php";
// echo "hello";
use GuzzleHttp\Client;
$json = GuzzleHttp\RequestOptions::JSON;

$client = new GuzzleHttp\Client();
$response = $client->get('http://127.0.0.1:8000/api/products/urls', [
    'headers' => [
        'Content-Type' => 'application/json',
         'Api-key' => '24hdev'
]]);    
$urls = $response->getBody();
$json_urls = (json_decode($urls))->data;
// $link = 'https://shopee.vn/Điện-Thoại-Xiaomi-Redmi-Note-8-64GB-4GB-Nhập-Khẩu-i.39104237.2738984285';
foreach ($json_urls as $url => $index) {
    $link = $index->url;
    $urlProduct = 'https://watch-scraping.24h.dev/?product_url='.$link ;
    $responseInfo = $client->get($urlProduct, [
        'headers' => [
            'Content-Type' => 'application/json',
             'Api-key' => '24hdev'
    ]]);
    $bodyResponseInfo = $responseInfo->getBody();
    $returnedInfo = json_decode($bodyResponseInfo);
    if (!empty($returnedInfo)) {
        $product->url = $link;
        $product->ids = $index->ids;
        $product->price = $returnedInfo->price;
        $result = $client->post('http://127.0.0.1:8000/api/products/update-crawler', [
            'headers' => [
                'Content-Type' => 'application/json',
                 'Api-key' => '24hdev'
            ],
            'body' => json_encode($product),
            
            'timeout' => 5
        ]);
    }
}
echo "Finished";
// GET
// /products/urls

// dc cai list


// For cai list
// goi function get data 

// co data =>

// POST {{host}}/products/update-crawler


// DONE
?>