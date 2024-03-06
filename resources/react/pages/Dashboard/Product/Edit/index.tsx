import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { handleChange } from "../../../../common/utils"
import Api from "../../../../common/config/http"
import { Alert, Loading } from "../../../../components"

import './styles.css'
interface productDetailProps {
    product_name: string
    product_description: string
    product_price: number
    product_stock: number
    product_photo: string
    product_isActive: boolean
}

function EditProduct() {
    const params = useParams()
    const navigate = useNavigate()

    const [productDetail, setProductDetail] = useState({})

    const [formData, setFormData] = useState<productDetailProps>({
        product_name: '',
        product_description: '',
        product_price: 0,
        product_stock: 0,
        product_photo: '',
        product_isActive: false
    })

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState(true)

    const fetchingProductDetail = async(id: string) => {
        const result = await Api.get(`product/${id}`)

        if (result?.data?.status !== 200) {
            return setIsFetching(false)
        }

        setProductDetail(result?.data?.data)
        setFormData({
            product_name: result?.data?.data?.name,
            product_description: result?.data?.data?.description,
            product_price: result?.data?.data?.price,
            product_stock: result?.data?.data?.stock,
            product_photo: result?.data?.data?.photo,
            product_isActive: result?.data?.data?.is_active === 1 ? true : false
        })
        setIsFetching(false)
    }

    const handleUpdate = async(e: React.SyntheticEvent) => {
        e.preventDefault()
        const id = params.id

        if (id) {

            const payload = {
                name: formData.product_name,
                description: formData.product_description,
                price: formData.product_price,
                stock: formData.product_stock,
                photo: formData.product_photo,
                is_active: formData.product_isActive,
            }

            const result = await Api.put(`product/${id}`, payload)

            if (result?.data?.status !== 200) {
                return setShowAlert(true)
            }

            setShowAlert(false)
            navigate('/dashboard/product')
        }

    }

    useEffect(() => {
        const id = params.id
        if (id) fetchingProductDetail(id)
    }, [params])

    return(
        <div className="flex-1 px-10 py-5 mx-1 bg-[#F8FAFC] rounded-lg pb-10">
            <h1 className="text-xl font-bold text-black">Edit Product</h1>

            <div className="h-full bg-white rounded-lg p-5 mt-5">
                {isFetching ? <Loading /> :
                    <>
                        <form onSubmit={handleUpdate} className="mt-10">
                            <div className="flex flex-col gap-5">
                                {showAlert && <Alert message="Error when edit product" type="error" />}
                                <div className="flex w-full">
                                    <label htmlFor="product_name" className="text-normal text-black font-semibold w-[25%]">Product Name</label>
                                    <input type="text" name="product_name" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" value={formData?.product_name} onChange={(e) => handleChange(e, setFormData)} />
                                </div>
                                <div className="flex w-full">
                                    <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Description</label>
                                    <input type="text" name="product_description" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" value={formData?.product_description} onChange={(e) => handleChange(e, setFormData)} />
                                </div>
                                <div className="flex w-full">
                                    <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Price</label>
                                    <input type="text" name="product_price" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" value={formData?.product_price} onChange={(e) => handleChange(e, setFormData)} />
                                </div>
                                <div className="flex w-full">
                                    <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Stock</label>
                                    <input type="number" name="product_stock" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" value={formData?.product_stock} onChange={(e) => handleChange(e, setFormData)} />
                                </div>
                                <div className="flex w-full">
                                    <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Photo Url</label>
                                    <input type="text" name="product_photo" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" value={formData?.product_photo} onChange={(e) => handleChange(e, setFormData)} />
                                </div>

                                <div className="flex w-full">
                                    <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Active</label>
                                    <label className="switch">
                                        <input type="checkbox" name="product_isActive" defaultChecked={formData?.product_isActive} onChange={(e) => handleChange(e, setFormData)} />
                                        <span className="slider">
                                            <svg className="slider-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                                                <path fill="none" d="m4 16.5 8 8 16-16"></path>
                                            </svg>
                                        </span>
                                    </label>
                                </div>

                                <div>
                                    {/* {photoList.length > 0 ? :} */}
                                </div>

                                <button type="submit" className="w-1/4 py-2 bg-black text-white rounded-lg text-sm font-semibold self-end">Edit</button>
                            </div>

                        </form>
                    </>
                }
            </div>
        </div>
    )
}

export default EditProduct
