<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\PackageTypes;
use App\PaymentMethod;
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
            // 'card_id' => 'required',
            'package_type_id' => 'required',
            'payment_method_id' => 'required'
        ]);

        if ($validatedData->fails()) {
            return $this->responseBadRequest(400);
        }

        $user = Auth::user();
        $packageType = PackageTypes::find($request->package_type_id);
        $paymentMethod = PaymentMethod::find($request->payment_method_id);

        $stripe = new \Stripe\StripeClient(
            env('PUBLIC_STRIPE_KEY')
        );

        try {
            // create Token
            $paymentToken =  $stripe->tokens->create([
                'card' => [
                'number' => '4242424242424242',
                'exp_month' => 9,
                'exp_year' => 2021,
                'cvc' => '314',
                ],
            ]);
            
            // create customer
            $customer = $stripe->customers->create([
                'email' => $user->email,
                'description' => 'My First Test Customer (created for API docs)',
                'source' => $paymentToken->id
              ]);

            echo is_integer($packageType->amount);
            // create charge
            $charge = $stripe->charges->create([
                'amount' => $packageType->amount * 100, // Unit: cents
                'currency' => $packageType->currency,
                'customer' => $customer->id,
                'source' => $customer->default_source,
                'description' => 'Test payment',
            ]);
            
            $transaction = new Transaction;

            $transaction->user_id = $user->id;
            $transaction->card_id = $customer->id;
            $transaction->package_type_id = $packageType->id;
            $transaction->payment_method_id = $paymentMethod->id;
            $transaction->description = '';

            $transaction->save();
            // return response 
            return $this->responseSuccess(200, $transaction);

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
