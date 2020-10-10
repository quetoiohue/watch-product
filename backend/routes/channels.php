<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\Products;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('product.*', function ($user, $productId) {
    return true;
});
