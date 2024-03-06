import React from "react";

function Breadcrumb() {
    return (
        <div className="bg-[#F4F4F4] w-full px-1 py-10">
            <div className="global-p">
                <ul className="inline-flex m-0 p-0 gap-3 font-normal">
                    <li className="cursor-pointer">Home</li>
                    <li>/</li>
                    <li className="cursor-pointer text-orange-500">Product</li>
                </ul>
            </div>
        </div>
    )
}

export default Breadcrumb;
