import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom";

import { Header, Breadcrumb, Footer, Sidebar, DashboardHeader } from './../components';


export default function RootLayout(props: { children?: ReactNode }) {
    const navigate = useNavigate()
    const location = useLocation()
    const isDashboardPage = location.pathname.startsWith('/dashboard');

    const [sessionUser, setSessionUser] = useState<{} | null>(null)

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [cartItems, setCartItems] = useState<{id: string, name: string; price: number; quantity: number; stock: number; photo: string }[]>([]);
    const [showCart, setShowCart] = useState(false)

    const increaseQtyItem = (index: number, product: any) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity == product?.stock) return alert('stock limit reached...')
        updatedCart[index].quantity++;
        setCartItems(updatedCart);
    }

    const decreaseQtyItem = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity--;

        if (updatedCart[index].quantity === 0) {
        updatedCart.splice(index, 1);
        }

        setCartItems(updatedCart);
    };

    const handleLogout = () => {
        localStorage.removeItem('session')
        setSessionUser(null)
        if (isDashboardPage) {
            navigate('/')
            navigate(0)
        } else {
            navigate(0)
        }
    }

    useEffect(() => {
        const session = localStorage.getItem('session')
        if (session !== null) {
            setSessionUser(JSON.parse(session))
        }
    }, [location])

    return(
        <main className="flex flex-col items-center">
            {!isDashboardPage && <Header sessionUser={sessionUser} handleLogout={handleLogout} modalOpen={modalOpen} setModalOpen={setModalOpen} showCart={showCart} setShowCart={setShowCart} cartItems={cartItems} setCartItems={setCartItems} increaseQtyItem={increaseQtyItem} decreaseQtyItem={decreaseQtyItem} />}

            {!isDashboardPage && <Breadcrumb />}
            {/* {props.children} */}
            {isDashboardPage
            ? (
                <div className="w-full flex flex-col">
                    <DashboardHeader sessionUser={sessionUser} setSessionUser={setSessionUser} handleLogout={handleLogout} />
                    <div className="flex gap-5 min-h-[850px] max-h-[900px]">
                        <Sidebar />
                        <Outlet context={[sessionUser, modalOpen, setModalOpen, cartItems, setCartItems, increaseQtyItem, decreaseQtyItem]} />
                    </div>
                </div>
            )
            :
                <Outlet context={[sessionUser, modalOpen, setModalOpen, cartItems, setCartItems, increaseQtyItem, decreaseQtyItem]} />
            }


            {!isDashboardPage && <Footer />}

        </main>
    )
}
