<?php

namespace App\Mail;

use App\Products;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TriggerMail extends Mailable
{
    use Queueable, SerializesModels;
    public $product;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Products $product, $old_price)
    {
        $this->product = $product;
        $this->product->lastCheckedPrice = $old_price;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('TriggerMail');
    }
}
