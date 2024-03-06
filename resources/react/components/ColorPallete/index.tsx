import React, { useState } from "react";

interface ColorPalleteProps {
    colorHex: string;
}

function ColorPallete(props: ColorPalleteProps) {
    const { colorHex } = props

    const [isActive, setIsActive] = useState(false)

    return (
        <div className={`${isActive ? 'border-2' : 'border'} border-black w-6 h-6 rounded-full ${colorHex ? `bg-[${colorHex}]` : 'bg-white' } cursor-pointer`} onClick={() => setIsActive(!isActive)}>&nbsp;</div>
    )
}

export default ColorPallete;
