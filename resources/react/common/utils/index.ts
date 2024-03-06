import React, { Dispatch, SetStateAction } from 'react'

export const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setData: Dispatch<SetStateAction<any>>) => {
    const { name, value, type, checked } = e.target;

    setData((prevState: any) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
    }));
};

export const formatRupiah = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
