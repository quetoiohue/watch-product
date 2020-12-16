<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Goutte\Client;
use Symfony\Component\HttpClient\HttpClient;

function formatMoney($moneyText) {
    $moneyStr = str_replace(',', '', $moneyText);
    
    return (float)$moneyStr;
}

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
        $product->price = formatMoney($node->filter('#price-preview .pro-price')->text());
        $product->currency = 'VND';

        if ($node->filter('#price-preview del')->count()) {
            // The promotion product 

            $product->price_max = formatMoney($node->filter('#price-preview del')->text());
            $product->discount = ((float)str_replace('%', '', $node->filter('#price-preview .pro-sale')->text())) * -1;
        } else {
            // None of promotion product 

            $product->price_max = $product->price;
            $product->discount = 0;
        }
        $product->inventory_status = $node->filter('#add-to-cart')->text() == "Thêm vào giỏ" ? "available" : "sold out";
    });

    return json_encode($product);
}