import React, { useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom'

import Api from './../../common/config/http'
import { Cart, CategoryAccordion, ColorPallete, Loading, Modal, ProductCard, ProductCardHorizontal, Tags } from "../../components";

function Home() {
    const [ sessionUser, modalOpen, setModalOpen, cartItems, setCartItems, increaseQtyItem, decreaseQtyItem ]: any = useOutletContext();

    const [snapToken, setSnapToken] = useState('')
    const [productList, setProductList] = useState([])

    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [isSubmit, setIsSubmit] = useState(false);

    const fetchingProduct = async() => {
        const result = await Api.get('product', {
            headers: {
                    role: sessionUser?.role?.id ?? null
                }
            }
        );

        if (result?.data?.status !== 200) {
            setIsFetching(false)
            return
        }

        setProductList(result?.data?.data)
        setIsFetching(false)
    }

    const addItemToCart = (product: {id: number, name: string; price: number; quantity: number, stock: number, photo: string }) => {
        if (product.stock <= 0) return alert('stock unavailable...')

        const newItem = { id: product.id, name: product.name, price: product.price, quantity: 1, photo: product.photo };
        const existingItemIndex = cartItems.findIndex((item: any) => item.id === newItem.id);

        if (existingItemIndex !== -1) {
            if (product.quantity > product.stock) return
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity++;
            setCartItems(updatedCart);
            alert('add product qty success')
          } else {
            setCartItems([...cartItems, newItem]);
            alert('add product to cart success')
          }
      };

    useEffect(() => {
        fetchingProduct()

        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;

        const myMidtransClientKey = 'your_client_key';
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
          document.body.removeChild(scriptTag);
        }

    }, [])

    return (
        <div className="p-10 mt-10 flex gap-14 global-p w-full">
            <div className="w-1/4 flex flex-col gap-4">
                <div className="flex flex-col gap-3 px-5 pt-8 pb-10 bg-[#F4F4F4] rounded-sm shadow-sm">
                    <h1 className="text-black font-semibold text-xl">Search</h1>
                    <div className="relative bg-white rounded-2xl overflow-hidden">
                        <input type="input" className="bg-transparent outline-none border-none text-sm px-3 py-2"  placeholder="Search" />
                        <span className="p-0 absolute z-10 right-2 top-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-5 px-5 py-4 bg-[#F4F4F4] rounded-sm shadow-sm">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-normal text-black text-opacity-80 font-bold">Top Rated products</h1>

                        {isFetching ? <Loading /> :
                        productList.length > 0
                        ? productList.map((product, index) => (
                            <ProductCardHorizontal key={index} product={product}  />
                        ))
                        : <span>No Data...</span>
                    }

                    </div>

                    <div>
                        <h1 className="text-normal text-black text-opacity-80 font-bold">Categories</h1>

                        <CategoryAccordion title={`Accessories`} qty="10" />
                        <CategoryAccordion title={`Electronics`} qty="5" />
                    </div>
                </div>

                <div className="flex flex-col gap-5 px-5 py-4 bg-[#F4F4F4] rounded-sm shadow-sm">
                    <div className="flex flex-col">
                        <h1 className="text-normal text-black text-opacity-80 font-bold">Size</h1>

                        <div className="flex items-center flex-wrap gap-3 mt-2">
                            <Tags text="S" />
                            <Tags text="M" />
                            <Tags text="L" />
                            <Tags text="XL" />
                            <Tags text="XXL" />
                            <Tags text="XXXL" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 px-5 py-4 bg-[#F4F4F4] rounded-sm shadow-sm">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-normal text-black text-opacity-80 font-bold">Tags</h1>
                        <div className="flex items-center flex-wrap gap-3 mt-2">
                            <Tags text="Black" />
                            <Tags text="Blue" />
                            <Tags text="Fiber" />
                            <Tags text="Gold" />
                            <Tags text="Gray" />
                            <Tags text="Green" />
                            <Tags text="Leather" />
                            <Tags text="Magenta" />
                            <Tags text="Maroon" />
                            <Tags text="Metal" />
                            <Tags text="Navy" />
                            <Tags text="Orange" />
                            <Tags text="Pink" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-normal text-black text-opacity-80 font-bold">Color</h1>
                        <div className="flex items-center flex-wrap gap-3 max-w-[75%] mt-2">
                            <ColorPallete colorHex="#EB0405" />
                            <ColorPallete colorHex="#1F740A" />
                            <ColorPallete colorHex="#050DE2" />
                            <ColorPallete colorHex="#F9F61F" />
                            <ColorPallete colorHex="#FFF" />
                            <ColorPallete colorHex="#FAD60A" />
                            <ColorPallete colorHex="#838486" />
                            <ColorPallete colorHex="#E215EF" />
                            <ColorPallete colorHex="#741208" />
                            <ColorPallete colorHex="#020874" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-3/4">
                <div className="flex items-center justify-between w-full px-4 py-5 border-2 rounded-sm border-[#F4F4F4]">
                    <div className="flex items-center gap-2">
                        <span className="cursor-pointer p-0 m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-orange-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                        </span>

                        <span className="cursor-pointer p-0 m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </span>
                    </div>

                    <div className="font-semibold text-sm">
                        <h5 className=" text-black text-opacity-50">Showing 1 - 9 of 11 result</h5>
                    </div>

                    <div className="flex gap-2 items-center">
                        <h3 className="font-semibold text-sm">Sort By:</h3>

                        <div className="flex px-3 py-2 border-2 font-semibold text-black text-opacity-50 border-[#F4F4F4] rounded-sm text-sm">
                            <span>Alphabetically, A - Z</span>
                        </div>
                    </div>
                </div>

                <div className="inline-grid grid-cols-3 auto-rows-max mt-10 gap-x-5 gap-y-10">
                    {isFetching ? <Loading /> :
                        productList.length > 0
                        ? productList.map((product, index) => (
                            <ProductCard key={index} product={product} addToCart={() => addItemToCart(product)} increaseQtyItem={increaseQtyItem} cartItems={cartItems} decreaseQtyItem={decreaseQtyItem} sessionUser={sessionUser} setModalOpen={setModalOpen} />
                        ))
                        : <span>No Data...</span>
                    }
                </div>
            </div>

        </div>
    )
}

export default Home;
