import React from 'react';
export const Producto = ({product, setOpenAmountAdd}) => {
    const amountToAdd = () => {
        setOpenAmountAdd(true) 
    }

	return (
		<div className='bg-slate-200 w-[80%] mx-auto p-6 text-center  flex items-center  justify-around '>
			<p className='w-[20%]'>{product.title}</p>
            <p className='w-[20%]'>{product.id}</p>
            <p className='w-[20%]'>{product.stock}</p>
            <p className='w-[20%]'>${product.price}</p>
            <p className='w-[20%] cursor-pointer' onClick={amountToAdd}>Agregar</p>

		</div>
	)
}