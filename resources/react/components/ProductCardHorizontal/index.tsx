import React from "react"
import RatingStar from "../RatingStar"

import { formatRupiah } from "../../common/utils"

interface ProductProps {
    product: {
        name: string
        price: number
        stock: number
        photo: string
    }
}

function ProductCardHorizontal(props: ProductProps) {
    const { product} = props
    return (
        <div className="flex items-center gap-3 px-3 py-2 w-full">
            <div className=" w-[60px] h-[60px] rounded-sm overflow-hidden">
                <img src={product?.photo ?? 'https://i.pinimg.com/236x/df/c8/5d/dfc85d4ac8ae81f52a2ee75ad9399663.jpg'} className="w-full h-full object-contain" alt={`${product.name} Horizontal`} />
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-xs text-black font-semibold truncate max-w-[120px] 2xl:max-w-[200px]">{product.name}</h3>

                <div className="flex items-center justify-center gap-1 w-full">
                    {Array(5).fill(0).map((_, index) => (
                        <RatingStar key={index} width="w-5" height="h-5" />
                    ))}
                </div>

                <h3 className="font-bold text-black text-xs">Rp. {formatRupiah(product.price)}</h3>
            </div>
        </div>
    )
}

export default ProductCardHorizontal
