<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

function getProductByURL($product_url) {
    $log = new Logger($product_url);
    $log->pushHandler(new StreamHandler('logs/'.date('m-d-Y', time()).'.log', Logger::INFO));

    $url_detail_product = get_url_detail_product($product_url);
    // https://api.tiki.vn/v2/products/21682413

    //  Initiate curl
    $ch = curl_init();
    // Will return the response, if false it print the response
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Set the url
    curl_setopt($ch, CURLOPT_URL, $url_detail_product);
    // Execute
    $result=curl_exec($ch);
    // Closing
    curl_close($ch);

    $product_item = json_decode($result, true);

    $spid_product = get_spid_product($product_url);

    $product = new stdClass();

    $product->currency = "VND"; // TODO: check currency

    $product->title = $product_item["name"];
    $product->price = $product_item["price"];
    $product->price_max = $product_item["list_price"];
    $product->imageURL = $product_item["thumbnail_url"];
    $product->discount = $product_item['discount_rate'];
    $product->inventory_status = $product_item['inventory_status'];
    if (array_key_exists("configurable_products", $product_item)) {
        $product->imageURL = $product_item["configurable_products"][0]["images"][0]["large_url"];
    }
    if (!empty($spid_product)) {
        foreach($product_item["configurable_products"] as $item) {
            if ($item["id"] == $spid_product) {
                $product->title = $item["name"];
                $product->price = $item["price"];
                $product->imageURL = $item["images"][0]["large_url"];
            }
        }
    }

    return json_encode($product);
}

function get_url_detail_product($product_url) {
    $temp = explode('.html', $product_url);
    $temp = explode('-p', $temp[0]);
    $itemid = $temp[sizeOf($temp) - 1];
    $url_detail_product = sprintf('https://api.tiki.vn/v2/products/%s', $itemid);
    return $url_detail_product;
}

function get_spid_product($product_url) {
    $url_components = parse_url($product_url);
    if (array_key_exists("query", $url_components)) {
        parse_str($url_components['query'], $params);
        if (array_key_exists("spid", $params)) {
            return $params["spid"];
        }
        return NULL;
    }
    return NULL;
}

function get_url_image($id_image) {
    return sprintf("https://cf.shopee.vn/file/%s", $id_image);
}