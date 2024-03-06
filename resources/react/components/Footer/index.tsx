import React from "react";

function Footer() {
    return(
        <div className="w-full global-p py-10 mt-10 flex justify-between">
            <div className="flex flex-col">
                <h1 className="text-normal text-black text-opacity-80 font-bold">Contact Us</h1>

                <ul className="mx-0 mt-3 text-sm text-black text-opacity-70 font-semibold flex flex-col gap-2">
                    <li>Tri Gerno Store</li>
                    <li>No. 459672 Mahameru, Lumajang</li>
                    <li>Indonesia</li>
                    <li>+62-81393158813</li>
                    <li>trigerno@store.com</li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h1 className="text-normal text-black text-opacity-80 font-bold">Information</h1>

                <ul className="mx-0 mt-3 text-sm text-black text-opacity-70 font-semibold flex flex-col gap-2">
                    <li>Product Support</li>
                    <li>Checkout</li>
                    <li>License key</li>
                    <li>Affiliate</li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h1 className="text-normal text-black text-opacity-80 font-bold">Customer Service</h1>

                <ul className="mx-0 mt-3 text-sm text-black text-opacity-70 font-semibold flex flex-col gap-2">
                    <li>Help Center</li>
                    <li>Redeem Voucher</li>
                    <li>Contact Us</li>
                    <li>Policies & Rules</li>
                </ul>
            </div>

            <div className="flex flex-col">
                <h1 className="text-normal text-black text-opacity-80 font-bold">Download Our App</h1>
                <p className="text-xs text-black text-opacity-70 font-semibold max-w-[320px] mt-2">Download our App and get extra 15% Discount on your first Order..!</p>

                <div className="flex items-center gap-5 mt-4">
                    <div className="flex items-center gap-3 px-3 py-2 shadow-lg rounded-md cursor-pointer">
                        <img src="https://www.svgrepo.com/show/69341/apple-logo.svg" width={30} height={30} alt="apple logo" />
                        <div>
                            <h5 className="text-black text-xs font-semibold">Download on the</h5>
                            <h5 className="text-black font-semibold">App Store</h5>
                        </div>
                    </div>

                    <div className="flex items-center px-3 py-2 shadow-lg rounded-md cursor-pointer">
                        <img src="https://static.vecteezy.com/system/resources/previews/013/441/310/non_2x/google-play-modern-logo-icon-free-vector.jpg" width={40} height={40} alt="apple logo" />
                        <div>
                            <h5 className="text-black text-opacity-50 text-normal font-semibold">Google Play</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;
