import React, {useState} from "react";

interface TagsProps {
    text: string
}

function Tags(props: TagsProps) {
    const { text } = props;

    const [isActive, setIsActive] = useState(false)

    return(
        <div className={`px-2 py-1 rounded-sm min-w-[30px] cursor-pointer text-sm text-center font-semibold text-black border border-black ${isActive ? 'text-opacity-100 border-opacity-100' : 'text-opacity-70 border-opacity-20'} `} onClick={() => setIsActive(!isActive)}>{text}</div>
    )
}

export default Tags;
