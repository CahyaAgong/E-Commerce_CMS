<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\User;

use App\Services\Midtrans\SnapTokenGenerator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index() {}

    public function processPayment(Request $request) {
        $user = User::find($request->input('user_id'));

        if (!$user) {
            return response()->json([
                'status'  => 404,
                'message' => 'User not found...',
            ]);
        }

        $order = [
            'order_id' => (string) Str::uuid(),
            'amount' => $request->input('amount'),
            'items' => $request->input('item_details')
        ];

        $midtrans = new SnapTokenGenerator($order, $user);
        $snapToken = $midtrans->generateSnapToken();

        $checkOrder = Order::where([
            ['snap_token', $snapToken],
            ['status', 1],
        ])->get()->count();

        if ($checkOrder > 0) {
            return response()->json([
                'status'  => 403,
                'message' => 'Invalid snap token...',
            ]);
        }

        $orderInput = Order::create([
            'id' => $order['order_id'],
            'user_id' => $user->id,
            'code' => 'ORDER-' . mt_rand(100000, 999999),
            'order_date' => now(),
            'amount' => $order['amount'],
            'note' => $request->input('notes'),
            'snap_token' => $snapToken,
            'status' => 1,
        ]);

        $items = $request->input('item_details');

        foreach ($items as $item) {
            OrderDetails::create([
                'order_id' => $order['order_id'],
                'product_id' => $item['product_id'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
            ]);
        }


        return response()->json([
            'status'     => 'success',
            'snap_token' => $snapToken
        ]);
    }
}
