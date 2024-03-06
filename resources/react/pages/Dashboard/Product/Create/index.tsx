import React, { useState } from "react";

import Api from "./../../../../common/config/http";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../../../components";

function CreateProduct() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        product_price: 0,
        product_stock: 0,
        product_photo: ''
    })

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [photoList, setPhotoList] = useState([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = async(e: React.SyntheticEvent) => {
        e.preventDefault();

        const payload = {
            name: formData.product_name,
            description: formData.product_description,
            price: formData.product_price,
            stock: formData.product_stock,
            photo: formData.product_photo
        }

        const result = await Api.post('product', payload)

        if (result?.data?.status !== 201) {
            return setShowAlert(true)
        }
        setShowAlert(false)
        navigate('/dashboard/product')
    }

    return(
        <div className="flex-1 px-10 py-5 mx-1 bg-[#F8FAFC] rounded-lg pb-10">
            <h1 className="text-xl font-bold text-black">Create Product</h1>

            <div className="h-full bg-white rounded-lg p-5 mt-5">
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="flex flex-col gap-5">
                        {showAlert && <Alert message="Error when add product" type="error" />}
                        <div className="flex w-full">
                            <label htmlFor="product_name" className="text-normal text-black font-semibold w-[25%]">Product Name</label>
                            <input type="text" name="product_name" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" onChange={handleChange} />
                        </div>
                        <div className="flex w-full">
                            <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Description</label>
                            <input type="text" name="product_description" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" onChange={handleChange} />
                        </div>
                        <div className="flex w-full">
                            <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Price</label>
                            <input type="text" name="product_price" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" onChange={handleChange} />
                        </div>
                        <div className="flex w-full">
                            <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Product Stock</label>
                            <input type="number" name="product_stock" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" onChange={handleChange} />
                        </div>
                        <div className="flex w-full">
                            <label htmlFor="product_description" className="text-normal text-black font-semibold w-[25%]">Photo Url</label>
                            <input type="text" name="product_photo" className="px-3 py-2 outline-none border border-black rounded-md w-[75%] text-sm" onChange={handleChange} />
                        </div>

                        <div>
                            {/* {photoList.length > 0 ? :} */}
                        </div>

                        <button type="submit" className="w-1/4 py-2 bg-black text-white rounded-lg text-sm font-semibold self-end">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateProduct;
