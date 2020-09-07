<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

function getProductByURL($product_url) {
    $log = new Logger($product_url);
    $log->pushHandler(new StreamHandler('logs/'.date('m-d-Y', time()).'.log', Logger::INFO));

    $url_detail_product = get_url_detail_product($product_url);
    // https://shopee.vn/api/v2/item/get?itemid=7314696849&shopid=50644

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

    $product_json = json_decode($result, true);
    $product_item = $product_json["item"];

    $product = new stdClass();
    $product->title = $product_item["name"];
    $product->price = $product_item["price"] / 100000;
    $product->price_max = $product_item["price_max"] / 100000;
    $product->currency = $product_item["currency"];
    $product->imageURL = get_url_image($product_item["image"]);

    return json_encode($product);
}

function get_url_detail_product($product_url) {
	$temp = explode('/product/', $product_url);
	if ($temp[1]) {
    	list($shopid, $itemid) = explode('/', $temp[1]);
    } else {
      $temp = explode('?', $product_url);
      $temp = explode('.', $temp[0]);
      $itemid = $temp[sizeOf($temp) - 1];
      $shopid = $temp[sizeOf($temp) - 2];
    }
    $url_detail_product = sprintf('https://shopee.vn/api/v2/item/get?itemid=%s&shopid=%s', $itemid, $shopid);
    return $url_detail_product;
}

function get_url_image($id_image) {
    return sprintf("https://cf.shopee.vn/file/%s", $id_image);
}