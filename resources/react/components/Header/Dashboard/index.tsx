import React, { useState, Dispatch, SetStateAction } from "react"

interface DashboardHeader {
    sessionUser: {} | null
    setSessionUser: Dispatch<SetStateAction<any>>
    handleLogout: () => void
}

function DashboardHeader(props: DashboardHeader) {

    const { handleLogout } = props;

    const [showDropDown, setShowDropDown] = useState(false)


    return (
        <div className="flex items-center justify-between px-7 py-5">
            <div>
                <h1 className="text-xl font-bold text-black">Tri Gerno Dashboard</h1>
            </div>

            <div className="relative bg-[#F5F5F5] rounded-lg overflow-hidden w-1/4">
                <input type="input" className="bg-transparent outline-none border-none text-sm pl-8 pr-3 py-2"  placeholder="Search" />
                <span className="p-0 absolute z-10 left-2 top-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </span>
            </div>

            <div className="flex items-center gap-5">
                <div className="p-1 rounded-full flex justify-center bg-slate-100 relative">
                    <span className="m-0 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </span>

                    <span className="absolute right-1 w-2 h-2 rounded-full bg-red-500">&nbsp;</span>
                </div>

                <div className="flex items-center gap-1 relative">
                    <span className="rounded-full bg-slate-100 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </span>
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
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
