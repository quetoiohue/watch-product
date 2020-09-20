<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth api
Route::prefix('auth')->group(function() {
    Route::post('login/{provider}', 'API\AuthController@login');
});

// Guest api
Route::prefix('guest')->group(function() {
    Route::post('crawler', 'API\ProductsController@productCrawlerForGuest');
});

Route::middleware(['auth:api'])->group(function () {

    // User api
    Route::prefix('users')->group(function() {
        Route::get('sms','API\UserController@sendSms');
        Route::get('whoami', 'API\UserController@whoami');
        Route::put('change-telephone', 'API\UserController@changeUserTelephone');
        Route::get('payment', 'API\UserController@stripePayment');
    });

    // Product api
    Route::prefix('products')->group(function() {
        Route::get('user/{userId}', 'API\ProductsController@index');
        Route::post('/', 'API\ProductsController@create');
        Route::get('/{productId}', 'API\ProductsController@detail');
        Route::delete('/{productId}', 'API\ProductsController@delete');
        Route::put('/{productId}', 'API\ProductsController@updateAlerts');
    });
    
    // Payment 
    Route::prefix('transaction')->group(function() {
        Route::post('/stripePayment', 'API\TransactionController@stripePayment');
    });
});


