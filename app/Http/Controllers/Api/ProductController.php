<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\ProductImages;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Auth;

use App\Models\Role;

class ProductController extends Controller
{
    public function index(Request $request) {
        $role_id = $request->header('role');
        $role = Role::where('id', $role_id)->value('name');

        $status = 200;
        $message = 'Products retrieved successfully...';
        $products = null;

        if ($role === null || $role === 'customer') {
            $product = Product::with('productImages')->where('ecm_products.is_active', true)->get();
        } else {
            $product = Product::with('productImages')->get();
        }

        $productResource = new ProductResource($status, $message, $product);

        return response()->json($productResource);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|not_in:',
            'description' => 'required|string|not_in:',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'photo' => 'required|url',
            'photos.*.name' => 'nullable|string',
            'photos.*.caption' => 'nullable|string',
            'photos.*.url' => 'nullable|url'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'photo' => $request->input('photo'),
        ]);


        if ($request->has('photos')) {
            $productId = $product->value('id');

            foreach ($request->input('photos') as $photoData) {
                if (!empty($photoData['url'])) {
                    // $product->productImages()->create([
                    //     'name' => $photoData['name'],
                    //     'caption' => $photoData['caption'],
                    //     'url' => $photoData['url'],
                    // ]);

                    ProductImages::create([
                        'product_id' => $productId,
                        'name' => $photoData['name'],
                        'caption' => $photoData['caption'],
                        'url' => $photoData['url']
                    ]);
                }
            }
        }

        $status = 201;
        $message = 'Product created successfully...';

        $productResource = new ProductResource($status, $message, $product);

        return response()->json($productResource);
    }

    public function show($id) {
        $status = 200;
        $message = 'Product Found...';
        $product = Product::find($id);

        $productResource = new ProductResource($status, $message, $product);

        return response()->json($productResource);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'photo' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::findOrFail($id);

        $product->fill($request->all());

        if ($product->isDirty()) {
            $product->save();

            $productResource = new ProductResource(200, 'Product updated successfully...', $product);
            return response()->json($productResource);
        }
    }

    public function remove(Request $request, $productId) {
        $validator = Validator::make($request->all(), [
            'is_active' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::findOrFail($productId);

        $isActive = $request->input('is_active');

        $product->is_active = $isActive;

        $product->save();

        $productResource = new ProductResource(200, 'Product non active...', $product);
        return response()->json($productResource);

    }

    public function destroy($productId) {
        $product = Product::findOrFail($productId);

        $product->delete();

        $productResource = new ProductResource(204, 'Product deleted permanent successfully...', null);
        return response()->json($productResource);
    }
}
