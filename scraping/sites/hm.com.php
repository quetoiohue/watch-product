<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Goutte\Client;
// use Symfony\Component\HttpClient\HttpClient;

function getProductByURL($product_url) {
    // create a log channel
    $log = new Logger($product_url);
    $log->pushHandler(new StreamHandler('logs/'.date('m-d-Y', time()).'.log', Logger::INFO));

    // // add records to the log
    // $log->info('New URL:', [$product_url]);
    // $log->warning('Foo');
    // $log->error('Bar');


    $client = new Client(HttpClient::create([
        'timeout' => 60,
    ]));

    // Go to the website
    $crawler = $client->request('GET', 'http://127.0.0.1:8000/products/urls');


    // $log->info('Data:', [$crawler->html("")]);

    $product = new stdClass();

    $crawler->filter('.product-item-headline')->each(function ($node) use($product) {
        $product->title = $node->text();
    });

    $crawler->filter('.price-value')->each(function ($node) use($product) {
        $text_price = $node->text();
        $moneyFormated = formatMoney($text_price);
        $product->price = $moneyFormated[0];
        $product->currency = $moneyFormated[1];
    });

    // $crawler->filter('.price-value-original')->each(function ($node) use($product) {
    //     $text_price = $node->text();
    //     $moneyFormated = formatMoney($text_price);
    //     $product->onSale = true;
    //     $product->originPrice = $moneyFormated[0];
    // });

    $crawler->filter('.product-detail-main-image-container img')->each(function ($node) use($product) {
        $product->imageURL = 'http:'.$node->attr('src');
    });

    return json_encode($product);
}

function formatMoney($strMoney) {
    // TODO: Fix for different currency
    $ar_price_currency = explode(' ', $strMoney);
    if (sizeof($ar_price_currency) === 1) {
        $currency = substr($strMoney, 0, 1);
        $price = substr($strMoney, 1);

        switch ($currency) {
            case '$':
                $currency = "USD";
                break;
            default:
                // $log->warning('Unknow currency', [$currency]);
                break;
        }
    } else {
        list($price, $currency) = explode(' ', $strMoney);
    }
    return array($price, $currency);
}