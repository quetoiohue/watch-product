<?php

namespace App\Jobs;

use App\Events\NewPrice;
use App\Http\Controllers\API\ProductsController;
use App\Mail\TriggerMail;
use App\Notifications;
use App\ProductAlerts;
use App\ProductHistories;
use App\Products;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Nexmo\Laravel\Facade\Nexmo;
use Illuminate\Support\Facades\Log;

class TriggerProduct implements ShouldQueue 
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $product;
    public $retryAfter = 3;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Products $product)
    {
        $this->product = $product;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        DB::beginTransaction();
            try {
                // get link info
                $productLink = $this->product->link;

                $productInfo = app('App\Http\Controllers\API\ProductsController')->getProductInfoByLink($productLink);
                 
                // Trigger price                
                if ($productInfo['price'] != $this->product->actual_price) {
                    // Add product history
                    $productHistory = new ProductHistories;
                    $productHistory->product_id = $this->product->id;
                    $productHistory->price = $this->product->actual_price;
                    $productHistory->created_at = $this->product->created_at;
        
                    $productHistory->save();
        
                    // Update product price
                    $this->product->actual_price = $productInfo['price'];
                    $this->product->old_price = $productInfo['price_max'];
                    $this->product->discount = $productInfo['discount'];
                    $this->product->inventory_status = $productInfo['inventory_status'];
        
                    $this->product->save();

                    $newNotification = new Notifications();
                    $newNotification->product_id = $this->product->id;
                    $newNotification->text = "<p>Price made change from <strong>" . $productHistory->price . " " .$this->product->currency .
                     "</strong> to <strong>" . $this->product->actual_price . " " . $this->product->currency . "</strong></p>" ;

                    $newNotification->save();
                 
                    event(new NewPrice($newNotification, $this->product));

                    // Handle Alert
                    $productAlerts = $this->product->productAlerts;
                    foreach($productAlerts as $productAlert) {
                        $checkAlertStatus = $productAlert->alert_type_id * $productAlert->status;

                        if ($checkAlertStatus == 1) {
                            Mail::to("quang123@yopmail.com")->send(new TriggerMail($this->product, $productHistory->price));
                            echo "Email has been sent";
                        }

                        if($checkAlertStatus == 2) {
                            // $this->sendSms($this->product->user->telephone, $this->product);
                            echo "Sms has been sent";
                        }

                        if($checkAlertStatus == 3) {
                            echo "Phone call has been made";
                        }
                    }
                    
                }

                DB::commit();

            } catch (\Exception $th) {
                DB::rollBack();
                echo $this->product->name . " Error" . "\n";
                echo $th;
            }               
    }

    public function sendSms($phone, $product) {
        try {
            $message = Nexmo::message()->send([
                'to'   => '84378249933',
                'from' => 'Vonage APIs',
                'text' => "Product " . $product->link . " has changed from " . $product->old_price . " to " . $product->actual_price
            ]);
    
            return ([
                'message' => 'Sms was sent successfully.',
                'result' => $message
            ]);
        } catch (\Exception $th) {
            return ([
                'error' => 'There is something wrong.',
                'message' => $th
            ]);
        }
    }
}
