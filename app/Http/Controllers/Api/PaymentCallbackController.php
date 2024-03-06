<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\Midtrans\Callback;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\Product;

class PaymentCallbackController extends Controller
{
    public function receive(Request $request)
    {
        $callback = new Callback;

        if ($callback->isSignatureKeyVerified()) {
            $notification = $callback->getNotification();
            $order = $callback->getOrder();

            if ($callback->isSuccess()) {
                Order::where('id', $order->id)->update([
                    'status' => 2,
                    'payment_status' => 'success',
                ]);

                $checkOrderDetails = OrderDetails::where('order_id', $order->id)->get();

                if ($checkOrderDetails->count() > 0) {
                    foreach($checkOrderDetails as $orderDetail) {
                        $product = Product::where('id', $orderDetail->product_id)->first();
                        $product->stock = $product->stock - $orderDetail->quantity;
                        $product->save();
                    }
                }
            }

            if ($callback->isExpire()) {
                Order::where('id', $order->id)->update([
                    'status' => 3,
                    'payment_status' => 'expired',
                ]);
            }

            if ($callback->isCancelled()) {
                Order::where('id', $order->id)->update([
                    'status' => 4,
                    'payment_status' => 'cancelled',
                ]);
            }

            return response()
                ->json([
                    'success' => true,
                    'message' => 'Notification successfully processed',
                ]);
        } else {
            return response()
                ->json([
                    'error' => true,
                    'message' => 'Signature key not verified',
                ], 403);
        }
    }
}
