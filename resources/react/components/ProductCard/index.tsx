import React, { Dispatch, SetStateAction } from "react"
import { RatingStar } from ".."

import { formatRupiah } from "../../common/utils"

interface ProductProps {
    product: {
        id: string
        name: string
        price: number
        stock: number
        photo: string
    }
    cartItems: {id: string, name: string; price: number; quantity: number, stock: number, photo: string }[]
    addToCart: () => void
    increaseQtyItem: (index: number, product: any) => void
    decreaseQtyItem: (index: number) => void
    sessionUser: {} | null
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

function ProductCard(props: ProductProps) {
    const { product, cartItems, addToCart, increaseQtyItem, decreaseQtyItem, sessionUser, setModalOpen } = props;

    const handleClickAddToCart = () => {
        if (sessionUser) {
            addToCart()
        } else {
            setModalOpen(true)
        }
    }

    const renderButtonCart = () => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id)

        if (existingItemIndex !== -1) {
            const productInCart = cartItems[existingItemIndex]

            return (
                <div className="flex items-center gap-5 mt-3">
                    <button className="p-2 bg-orange-500 text-white rounded-md" onClick={() => decreaseQtyItem(existingItemIndex)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <span className="font-semibold text-sm">{productInCart.quantity}</span>
                    <button className="p-2 bg-orange-500 text-white rounded-md" onClick={() => increaseQtyItem(existingItemIndex, product)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            )
        }

        return (
            <button onClick={handleClickAddToCart} className={`px-3 py-2 bg-orange-500 text-white rounded-md mt-2 font-semibold ${product.stock === 0 ?  'bg-gray-400 text-black' : ''}`} disabled={product.stock === 0}>Add to Cart</button>
        )
    }

    return (
        <div className="flex flex-col border border-[#F4F4F4] shadow-md">
            <div className="w-full h-3/4 bg-red-100">
                <img src={product?.photo ?? 'https://d150u0abw3r906.cloudfront.net/wp-content/uploads/2021/12/image3-33.png'} className="w-full h-full object-cover" alt={product.name} />
            </div>

            <div className="flex items-center justify-center gap-1 w-full py-2 mt-5">
                {
                    Array(5).fill(0).map((_, index) => (
                        <RatingStar key={index} />
                    ))
                }
            </div>

            <div className="flex flex-col items-center w-full text-center gap-2 pb-5">
                <h3 className="font-semibold font-serif text-black text-opacity-50 text-sm px-5">{product.name}</h3>
                <h3 className="font-bold text-red-500">Rp.{formatRupiah(product.price)}</h3>
                <span className="text-sm text-black font-semibold">Stock : {product.stock}</span>
                <div className="">
                    {renderButtonCart()}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
