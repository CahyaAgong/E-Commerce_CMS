<?php

namespace App\Services\Midtrans;

use Midtrans\Snap;

class SnapTokenGenerator extends Midtrans {

    protected $order;
    protected $user;

    public function __construct($order, $user)
    {
        parent::__construct();

        $this->order = $order;
        $this->user = $user;
    }

    public function generateSnapToken()
    {
        $orderId = $this->order['order_id'];
        $amount = $this->order['amount'];
        $items = $this->order['items'];

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $amount,
            ],
            'item_details' => $items,
            'customer_details' => [
                'first_name' => $this->user->name,
                'email' => $this->user->email,
            ],
            'callbacks' => [
                'finish' => 'http://localhost:8000/payment/success',
                'error' => 'http://localhost:8000/payment/error',
                'pending' => 'http://localhost:8000/payment/pending',
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        return $snapToken;
    }
}
