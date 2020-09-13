<?php

namespace App\Jobs; 

use App\Http\Controllers\API\ProductsController;
use App\Mail\TriggerMail;
use App\ProductHistories;
use App\Products;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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
        $productLink = $this->product->link;
        $productInfo = (new ProductsController)->getProductInfoByLink($productLink);

        DB::beginTransaction();
            try {
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

                    // Send Mail
                    // var_dump("send mail");
                    Mail::to("quang123@yopmail.com")->send(new TriggerMail($this->product, $productHistory->price));
                    echo "Email has been sent.".$productInfo['price'];
                }

                DB::commit();

            } catch (\Exception $th) {
                DB::rollBack();
                echo $th;
            }               
    }
}
