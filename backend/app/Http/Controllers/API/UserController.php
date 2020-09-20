<?php

namespace App\Http\Controllers\API;

use App\CardPayment;
use App\Http\Controllers\Controller;
use App\Jobs\TriggerProduct;
use App\Package;
use App\Transaction;
use App\User;
use App\UserPackage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {

    public function sendSms() {
        $products = Auth::user()->products;
        foreach($products as $product) {
            TriggerProduct::dispatch($product);
            sleep(1);
        }

        return $this->responseSuccess(200, "Done");
    }

    public function whoami() {
        $user = Auth::user();
        $user->products = $user->products()->with(['productAlerts' => 
        function ($query) {
            $query->where('product_id', 51);
        }
        ])->get();

        return $this->responseSuccess(200, $user);
    }

    public function changeUserTelephone(Request $request) {
        $user = Auth::user();
        $telephone = $request->telephone;

        try {
            $updatedUser = User::find($user->id);
            $updatedUser->telephone = $telephone;

            $updatedUser->save();

            return $this->responseSuccess(200, $updatedUser);
        } catch (\Exception $e) {

            return $this->responseServerError(500);
        }
    }

    public function stripePayment() {
        $stripe = new \Stripe\StripeClient('sk_test_51HRJojEAHL6zqfBygevYRzTLfKMR3cyoR2GiS2paSdKjZvYFiN5IPqHOlL8h8hnX4bPRvLXBLS0u1rwTTU5BgbRr00sX2r5HS2');
        $customer = $stripe->customers->create([
            'description' => 'example customer',
            'email' => 'email@example.com',
            'payment_method' => 'pm_card_visa',
        ]);
        echo $customer;
        
        return $this->responseSuccess(200, $customer);
    }
}