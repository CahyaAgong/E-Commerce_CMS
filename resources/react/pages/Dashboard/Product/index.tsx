import React, { useEffect, useState } from "react"

import { useNavigate, useOutletContext } from "react-router-dom";

import { Loading } from "./../../../components";
import Api from "./../../../common/config/http";

import './styles.css'

function Product() {
    const [ sessionUser ]: any = useOutletContext();
    const navigate = useNavigate()

    const [productList, setProductList] = useState([])

    const [isFetching, setIsFetching] = useState<boolean>(true)

    const fetchingProduct = async() => {
        const result = await Api.get('product', {
            headers: {
                    role: sessionUser?.role?.id ?? ''
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

    const handleNavigate = (url: string) => {
        navigate(url)
    }

    const onDisableCheckboxClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent> ) => {
        e.preventDefault();
        return false;
    }

     const handleDelete = async(id: string) => {
        if (id) {

            if (confirm('Are you sure ? ')) {
                const result = await Api.delete(`product/${id}`)

                if (result?.data?.status !== 204) {
                    return alert('delete product failed');
                }

                alert(result?.data?.message)
                navigate(0)
            }
        }
    }

    useEffect(() => {
        fetchingProduct()
    }, [])

    return (
        <div className="flex-1 px-10 py-5 mx-1 bg-[#F8FAFC] rounded-lg pb-10">
            <h1 className="text-xl font-bold text-black">Product List</h1>

            <div className="h-full bg-white rounded-lg p-5 mt-5">
                <div className="flex items-center justify-between my-5">
                    <div>Filter</div>
                    <button type="button" className="px-2 py-1 text-sm font-semibold border border-black rounded-lg hover:bg-black hover:text-white" onClick={() => handleNavigate('/dashboard/product/create')}>Add Product</button>
                </div>

                {isFetching
                    ? <Loading />
                    :
                    <>
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>price</th>
                                <th>stock</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productList.length > 0
                                ? productList.map((product: any, _) => (
                                    <tr key={_}>
                                        <td>{_ + 1}.</td>
                                        <td><img src={product?.photo} className="w-20 h-20 rounded-lg border border-black border-opacity-35" alt={product?.name} /></td>
                                        <td>{product?.name}</td>
                                        <td>{product?.price}</td>
                                        <td>{product?.stock}</td>
                                        <td><input type="checkbox" defaultChecked={product?.is_active} onClick={(e) => onDisableCheckboxClick(e)} /></td>
                                        <td>
                                            <button type="button" onClick={() => handleNavigate(`/dashboard/product/edit/${product?.id}`)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button type="button" onClick={() => handleDelete(product?.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : <tr><td>No Data...</td></tr>
                            }
                        </tbody>
                    </table>

                    </>
                }
            </div>
        </div>
    )
}

export default Product
