import React, {useState, useEffect} from "react";
import Api from "../../common/config/http";
import { formatRupiah } from "../../common/utils";

declare global {
    interface Window {
        snap: any;
    }
}

interface ItemProps {
    id: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    photo: string;
}

interface CartProps {
    items: ItemProps[];
    onRemoveItem: (index: number) => void;
    onAddItem: (index: number, product: any) => void;
    sessionUser: any;
}

interface CartItemProps {
    product: ItemProps
    onAdd: () => void;
    onRemove: () => void;
    totalPrice: number
}


function Cart(props: CartProps) {
    const {items, onRemoveItem, onAddItem, sessionUser} = props

    const [productList, setProductList] = useState([])

    const [isSubmit, setIsSubmit] = useState(false);

    const calculateTotalPrice = () => {
        return items.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0);
    };

    const handleCheckout = async() => {
        setIsSubmit(true)
        if (items.length < 1) {
            return alert('nothing to checkout..')
        }

        const items_details = items.map((item, index) => ({
                product_id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }))

        const payload = {
            "user_id": sessionUser?.id,
            "amount": calculateTotalPrice(),
            "note": "...",
            "item_details": items_details
        }

        const result = await Api.post('order/payment', payload)

        if (result.data?.status !== 'success') {
            setIsSubmit(false)
            return
        }
        const snapToken = result.data?.snap_token

            window.snap.pay(snapToken, {
                // Optional
                onSuccess: function(result) {
                    console.log('onSuccess', result)
                },
                // Optional
                onPending: function(result) {
                    console.log('onPending', result)
                },
                // Optional
                onError: function(result) {
                    console.log('onError', result)
                }
            });

        setIsSubmit(false)
    }

    const filterProductList = (id: string) => {
        if (productList.length > 0) {
            const filteredArray = productList.filter((item: any) => item.id === id);
            const result = Object.assign({}, ...filteredArray);

            return result
        }
    }

    useEffect(() => {
        async function fetchingData() {
            const result = await Api.get('product');

            if (result?.data?.status !== 200) {
                return
            }

            setProductList(result?.data?.data)
        }

        fetchingData()
    }, [])

    return(
        <div>
            <h5 className="text-5xl font-semibold text-[#333333]">My Cart</h5>
            <table className="mt-4 w-full text-[$333333]">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <CartItem
                            key={index}
                            product={item}
                            onRemove={() => onRemoveItem(index)}
                            onAdd={() => onAddItem(index, filterProductList(item.id))}
                            totalPrice={calculateTotalPrice()}
                        />
                    ))}
                </tbody>
            </table>

            <div className="bg-[#EDF0F3] px-8 py-2 rounded-xl shadow-lg mt-10 flex items-center justify-between">
                <div className="flex flex-col justify-stretch gap-14">
                    <h1 className="text-2xl text-[#333333] font-bold">Choose Shipping mode :</h1>
                    <div className="flex items-center gap-5">
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="html">
                                    <input name="type" type="radio"
                                        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-400 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FC3E47] checked:before:bg-[#FC3E47] hover:before:opacity-10"
                                        id="html" checked />
                                    <span
                                        className="absolute text-[#FC3E47] transition-opacity opacity-0 pointer-events-none top-2/4 left-[6%] -translate-y-2/4 -translate-x-[6%] peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                        </svg>
                                    </span>

                                    <label className="mx-5 mt-px text-gray-700 text-sm font-normal cursor-pointer select-none peer-checked:font-bold" htmlFor="html">
                                        Store Pickup (In 20 min) - <span className=" font-bold text-black">Free</span>
                                    </label>
                                </label>
                            </div>

                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="react">
                                    <input name="type" type="radio"
                                        className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-400 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FC3E47] checked:before:bg-[#FC3E47] hover:before:opacity-10"
                                        id="react" />
                                    <span
                                        className="absolute text-[#FC3E47] transition-opacity opacity-0 pointer-events-none top-2/4 left-[6%] -translate-y-2/4 -translate-x-[6%] peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                        </svg>
                                    </span>

                                    <label className="ml-5 mt-px text-gray-700 text-sm font-normal cursor-pointer select-none peer-checked:font-bold" htmlFor="react">
                                        Delivery at Home (Under 2 - 4 day)
                                    </label>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-5 py-2 text-sm">
                        <div className="flex items-center justify-between px-3">
                            <span className="text-black text-opacity-50">SUBTOTAL ITC</span>
                            <span className="text-black font-semibold">Rp.{formatRupiah(calculateTotalPrice())}.00</span>
                        </div>

                        <div className="flex items-center justify-between px-3">
                            <span className="text-black text-opacity-50">Shipping</span>
                            <span className="text-black font-semibold">Free</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-black border-opacity-10 px-3 py-2">
                            <span className="text-black text-opacity-50">TOTAL</span>
                            <span className="text-black font-semibold">Rp.{formatRupiah(calculateTotalPrice())}.00</span>
                        </div>

                    </div>
                    <button type="button" className="bg-[#FC3D46] mt-10 w-full gap-20 rounded-xl px-4 py-3 text-white flex items-center justify-between font-semibold" onClick={handleCheckout}>
                        {isSubmit ?
                            <>
                                <span>Paying...</span>
                                <span>&nbsp;</span>
                            </>
                        : <>
                            <span>Checkout</span>
                            <span>Rp.{formatRupiah(calculateTotalPrice())}.00</span>
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

const CartItem = (props: CartItemProps) => {
    const {product, onRemove, onAdd } = props

    return (
        <tr className="text-center">
            <td>
                <img src={product.photo} className="w-24 h-24 mx-auto shadow-lg rounded-lg" alt={product.name} />
            </td>
            <td>{product.name}</td>
            <td>Rp.{formatRupiah(product.price)}</td>
            <td>
                <div className="flex items-center gap-3 mx-auto w-fit">
                    <button onClick={onRemove}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={onAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </td>
            <td>
                Rp.{formatRupiah(product.quantity * product.price)}.00
            </td>
        </tr>
      );
}

export default Cart;
