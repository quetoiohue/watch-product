<?php

namespace App\Http\Controllers\API;

use App\AlertTypes;
use App\Http\Controllers\Controller;
use App\Products;
use App\ProductAlerts;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

class ProductsController extends Controller {

    public function __construct()
    {
        $this->client = new Client();
    }

    public function index($userId) {
        // $user = Auth::user();
        
        $products = Products::where('user_id', $userId)->with(['productAlerts'])->get();
        
        return $this->responseSuccess(200, $products);
    }

    public function create(Request $request) {
        $validatedData = Validator::make($request->all(), [
            'links' => 'required',
        ]);

        if($validatedData->fails()) {
            return $this->responseBadRequest("links field is required.", 400);
        }
        $user = Auth::user();
        $productLinks = $request->links;
        $productsInfo = array();
        foreach ($productLinks as $productLink) {
            $productInfo = $this->getProductInfoByLink($productLink);
            
            if ($productInfo) {
                $newProduct = Products::updateOrInsert(
                    [
                        'user_id' => $user->id,
                        'image' => $productInfo['imageURL']
                    ],
                    [
                        'link' => $productLink,
                        'name' => $productInfo['title'],
                        'currency' => $productInfo['currency'],
                        'actual_price' => $productInfo['price'],
                        'old_price' => $productInfo['price_max'],
                        'discount' => $productInfo['discount'],
                        'inventory_status' => $productInfo['inventory_status'],
                    ]
                    )->first();
                
                $newProduct->productAlerts;
                array_push($productsInfo, $newProduct);
            }
        }

        return $this->responseSuccess(200, $productsInfo);
    }

    public function getProductInfoByLink($productLink, $retry = 1) {
        $url = env('SCRAPING_URL').'?product_url='.$productLink; 
        $scrapingRequest = $this->client->get($url);
        $scrapingResponse = json_decode($scrapingRequest->getBody()->getContents(), true);

        if ($retry < 4 && !$scrapingResponse['price_max']) {
            return $this->getProductInfoByLink($productLink, $retry+1);
        } else {
            return $scrapingResponse;
        }
    }

    public function detail($productId) {
        $product = Products::where([
            'id' => $productId
        ])->get();

        if (!$product) {
            return $this->responseBadRequest(400, "Product not found");
        }

        return $this->responseSuccess(200, $product);
    }

    public function updateAlerts(Request $request, $productId) {
        $validatedData = Validator::make($request->all(), [
            'alertTypes' => 'required'
        ]);

        if ($validatedData->fails()) {
            return $this->responseBadRequest(400, "alertTypes is required");
        }

        $product = Products::find($productId);

        if (!$product) {
            return $this->responseBadRequest(400, "Product not found");
        }

        $user = Auth::user();
        $alertTypes = $request->alertTypes;
         
        foreach($alertTypes as $alertType) {
            $defaultAlertType = AlertTypes::find($alertType['id']);

            $productAlertType = ProductAlerts::where([
                'product_id' => $product->id,
                'alert_type_id' => $alertType['id']
            ])->first();
            // decrement point
            if ($productAlertType && $alertType['value'] && !$productAlertType->status) {
                
                if ($user->total_point < $defaultAlertType->point_charge) {
                    return $this->responseBadRequest(400, "Not enough point");
                }

                $user->total_point = $user->total_point - $defaultAlertType->point_charge;
                $user->save();
            }

            ProductAlerts::updateOrInsert([
                'product_id' => $product->id,
                'alert_type_id' => $alertType['id']
            ], ['status' => $alertType['value'] ]); 
        }

        $product->productAlerts;
        return $this->responseSuccess(200, $product);
    }

    public function delete($productId) {
        $result = Products::destroy($productId);

        if ($result > 0) {
            return $this->responseSuccess(200, "Product has been deleted");
        } else {
            return $this->responseBadRequest(400, "Product not found");
        }
    }
    
    public function productCrawlerForGuest(Request $request) {
        $validatedData = Validator::make($request->all(), [
            'links' => 'required',
        ]);

        if($validatedData->fails()) {
            return $this->responseBadRequest("links field is required.", 400);
        }

        if(count($request->links) > 5) {
            return $this->responseBadRequest("You need login to add more.");
        }

        $productLinks = $request->links;
        $productsInfo = array();

        foreach ($productLinks as $productLink) {
            $productInfo = $this->getProductInfoByLink($productLink);
            
            if ($productInfo) {
                array_push($productsInfo, $productInfo);
            }
        }

        return $this->responseSuccess(200, $productsInfo);
    }
}