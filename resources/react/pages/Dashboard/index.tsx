import React,  { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import './styles.css'

function Dashboard() {
    const navigate = useNavigate()
    const [ sessionUser ]: any = useOutletContext();

    useEffect(() => {
        if (sessionUser?.role?.name !== 'admin') {
            navigate('/')
            navigate(0)
        }
    }, [])

    return (
        <div className="flex-1 px-10 py-5 mx-1 bg-[#F8FAFC] rounded-lg pb-10">
            <h1 className="text-xl font-bold text-black">Home</h1>

            <div className="h-full bg-white rounded-lg p-5 mt-5">

                <h1>Welcome Admin...</h1>
            </div>
        </div>
    )
}

export default Dashboard;
