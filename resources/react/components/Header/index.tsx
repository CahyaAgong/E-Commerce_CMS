import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Cart, Modal } from "../";
import Api from "../../common/config/http";

import { handleChange } from './../../common/utils'

interface LoginData {
    email_signin: string
    password_signin: string
}

interface RegisterData {
    email_signup: string
    password_signup: string
}

interface HeaderProps{
    sessionUser: {} | null
    handleLogout: () => void
    modalOpen: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>
    showCart: boolean
    setShowCart: Dispatch<SetStateAction<boolean>>

    cartItems: {id: string, name: string; price: number; quantity: number; stock: number; photo: string}[]
    setCartItems: Dispatch<SetStateAction<{id: string, name: string; price: number; quantity: number; stock: number; photo: string}[]>>

    increaseQtyItem: (index: number, stock: number) => void
    decreaseQtyItem: (index: number) => void
}

function Header(props: HeaderProps) {
    const { sessionUser, handleLogout, modalOpen, setModalOpen, showCart, setShowCart, cartItems, setCartItems, increaseQtyItem, decreaseQtyItem } = props
    const navigate = useNavigate()

    const [showDropDown, setShowDropDown] = useState(false)

    const [formMode, setFormMode] = useState<string>('signin')
    const [formLogin, setFormLogin] = useState<LoginData>({
        email_signin: '',
        password_signin: ''
    })
    const [formRegister, setFormRegister] = useState<RegisterData>({
        email_signup: '',
        password_signup: ''
    })

    const [showAlert, setShowAlert] = useState<boolean>(false)

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleSignIn = async(e: React.SyntheticEvent) => {
        e.preventDefault()

        const payload = {
            email: formLogin.email_signin,
            password: formLogin.password_signin
        }

        try {
            const result = await Api.post('login', payload);

            setShowAlert(false)
            const dataUser = result?.data?.data;
            localStorage.setItem("session", JSON.stringify(dataUser));

            if (dataUser?.role?.name === 'customer') {
                navigate(0)
            } else {
                navigate('/dashboard')
                navigate(0)
            }

        } catch (error) {
            setShowAlert(true)
            console.error(error)
        }

    }

    const calculateTotalItems = () => {
        return cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0);
      };

    return (
        <div className="flex flex-row justify-between items-center w-full py-5 global-p">
            <div className="flex gap-10 items-center">
                <div>
                    <a href="/">
                        <h1 className="text-2xl font-bold text-orange-500">Tri GernoMart</h1>
                    </a>
                </div>
            </div>

            <div>
                <ul className="inline-flex m-0 p-0 gap-10">
                    <li><a href="/">Home</a></li>
                    <li><a href="/product">Product</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            </div>

            <div className="flex items-center gap-5">
                <div className="relative bg-[#F5F5F5] rounded-lg overflow-hidden">
                    <input type="input" className="bg-transparent outline-none border-none text-sm px-3 py-2"  placeholder="Search" />
                    <span className="p-0 absolute z-10 right-2 top-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </span>
                </div>

                <div>
                    {sessionUser
                        ?
                        <div className="flex items-center gap-4">
                            <span className="cursor-pointer p-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </span>

                            <span className="relative cursor-pointer p-0" onClick={() => setShowCart(!showCart)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span className="px-1 flex rounded-full bg-red-600 text-white absolute -bottom-1 -right-1 text-xs">{calculateTotalItems() > 9 ? '9+' : calculateTotalItems()}</span>
                            </span>

                            <span className="flex items-center cursor-pointer p-0 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>

                                <button className="" onClick={() => setShowDropDown(!showDropDown)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {showDropDown &&
                                    <div className="w-24 shadow-lg rounded-md px-3 py-2 bg-white absolute z-10 -bottom-12 right-0">
                                        <ul className="text-sm font-semibold text-center">
                                            <li onClick={handleLogout} className="cursor-pointer">Logout</li>
                                        </ul>
                                    </div>
                                }
                            </span>
                        </div>
                        :
                        <button className="border border-white px-4 py-1 rounded-md font-semibold bg-orange-500 text-white hover:bg-black hover:text-white" onClick={() => setModalOpen(true)}>Sign In</button>
                    }
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={handleModalClose}>
                <div className="flex flex-col">
                    {formMode === 'signin'
                        ?
                            <>
                                <form onSubmit={handleSignIn} className="flex flex-col mt-5 gap-5">
                                    <h1 className="text-xl font-semibold text-black">Sign In</h1>
                                    {showAlert && <Alert message="Email or password incorrect" type="error" />}
                                    <div>
                                        <input type="email" name="email_signin" placeholder="Enter your email" className="text-sm px-3 py-2 w-full outline-none border border-black border-opacity-50 rounded-md" onChange={(e) => handleChange(e, setFormLogin)} />
                                    </div>

                                    <div>
                                        <input type="password" name="password_signin" placeholder="Enter your Password" className="text-sm px-3 py-2 w-full outline-none border border-black border-opacity-50 rounded-md" onChange={(e) => handleChange(e, setFormLogin)} />
                                    </div>

                                    <button type="submit" className="bg-black text-white font-semibold rounded-lg py-2">Sign In</button>
                                </form>

                                <p className="text-sm font-normal mt-5 text-center">Don't have an account yet? <span className="font-semibold text-black cursor-pointer" onClick={() => setFormMode('signup')}>Sign Up now!</span></p>
                            </>
                        :
                            <>
                                <form action="" className="flex flex-col mt-5 gap-5">
                                    <h1 className="text-xl font-semibold text-black">Sign Up</h1>
                                    <div>
                                        <input type="email" name="email_signup" placeholder="Enter your email" className="text-sm px-3 py-2 w-full outline-none border border-black border-opacity-50 rounded-md" onChange={(e) => handleChange(e, setFormRegister)} />
                                    </div>

                                    <div>
                                        <input type="password" name="password_signup" placeholder="Enter your Password" className="text-sm px-3 py-2 w-full outline-none border border-black border-opacity-50 rounded-md" onChange={(e) => handleChange(e, setFormRegister)} />
                                    </div>
                                    <div>
                                        <select name="role_option">
                                            <option value=""></option>
                                        </select>
                                    </div>

                                    <button type="submit" className="bg-black text-white font-semibold rounded-lg py-2">Sign Up</button>
                                </form>

                                <p className="text-sm font-normal mt-5 text-center">Already have an account ? <span className="font-semibold text-black cursor-pointer" onClick={() => setFormMode('signin')}>Sign In now!</span></p>
                            </>
                    }



                </div>
            </Modal>

            <Modal isOpen={showCart} onClose={() => setShowCart(!showCart)}>
                <Cart items={cartItems} onRemoveItem={decreaseQtyItem} onAddItem={increaseQtyItem} sessionUser={sessionUser} />
            </Modal>
        </div>
    )
}

export default Header;
