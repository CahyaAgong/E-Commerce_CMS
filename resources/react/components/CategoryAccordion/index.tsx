import React from "react"

interface CategoryAccordionProps {
    title: string
    qty: string
}

function CategoryAccordion(props: CategoryAccordionProps) {
    const { title, qty } = props;

    return (
        <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 cursor-pointer">
                <span className="p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </span>

                <span className="text-xs text-black font-semibold">{title}</span>
            </div>

            <span className="text-xs text-black">({qty})</span>
        </div>
    )
}

export default CategoryAccordion
