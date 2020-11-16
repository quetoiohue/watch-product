<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Goutte\Client;
use Symfony\Component\HttpClient\HttpClient;

function getProductByURL($product_url) {
    // create a log channel
    $log = new Logger($product_url);
    $log->pushHandler(new StreamHandler('logs/'.date('m-d-Y', time()).'.log', Logger::INFO));

    $client = new Client(HttpClient::create([
        'timeout' => 60,
    ]));

    // Go to the website
    $crawler = $client->request('GET', $product_url);

    $product = new stdClass();

    $crawler->filter('.product-detail-main .product-image-feature')->each(function ($node) use($product) {
        $imgSrc = $node->attr('src');
        $product->imageURL = substr($imgSrc, 2);
        $product->imageURL = 'http://'.str_replace("//", "/", $product->imageURL);
    });

    $crawler->filter('#detail-product')->each(function ($node) use($product) {
        $product->title = $node->filter('.product-title h1')->text();
        $product->price = (float)$node->filter('#price-preview .pro-price')->text() * 1000;
        $product->price_max = (float)$node->filter('#price-preview del')->text() * 1000;
        $product->currency = 'VND';
        $product->discount = (float)$node->filter('#price-preview .pro-sale')->text() * -1;
        $product->inventory_status = $node->filter('#add-to-cart')->text() == "Thêm vào giỏ" ? "available" : "sold out";
    });

    return json_encode($product);
}