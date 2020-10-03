<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\PackageTypes;
use App\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function stripePayment(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'token' => 'required',
            'package_type_id' => 'required'
        ]);

        if ($validatedData->fails()) {
            return $this->responseBadRequest(400);
        }

        $token = $request->token;
        $packageTypeId = $request->package_type_id;
        $user = Auth::user();
        $packageType = PackageTypes::find($packageTypeId);
        
        $stripe = new \Stripe\StripeClient(
            env('SECRET_STRIPE_KEY')
        );

        try {
            // create charge
            $stripe->charges->create([
                'amount' => $packageType->amount * 100, // Unit: cents
                'currency' => $packageType->currency,
                'source' => $token['id'],
                'description' => 'Purchase ' . ' package '. $packageType->name,
            ]);
            
            $transaction = new Transaction;

            $transaction->user_id = $user->id;
            $transaction->payment_token = $token['id'];
            $transaction->card_type = $token['type'];
            $transaction->card_brand = $token['card']['brand'];
            $transaction->package_type_id = $packageTypeId;
            $transaction->description = 'Purchase ' . ' package ' . $packageType->name;

            $transaction->save();
            // return response 
            return $this->responseSuccess(200, "Make payment successfully.");

        } catch(\Stripe\Exception\CardException $e) {
            // Since it's a decline, \Stripe\Exception\CardException will be caught
            echo 'Status is:' . $e->getHttpStatus() . '\n';
            echo 'Type is:' . $e->getError()->type . '\n';
            echo 'Code is:' . $e->getError()->code . '\n';
            // param is '' in this case
            echo 'Param is:' . $e->getError()->param . '\n';
            echo 'Message is:' . $e->getError()->message . '\n';

            return $this->responseServerError(500, $e);
        }
        
    }
}
