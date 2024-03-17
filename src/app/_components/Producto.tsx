import React from 'react';

type ProductProps = {
    product: {
        title: string;
        id: number;
        stock: number;
        price: number;
      };
    setOpenAmountAdd: React.Dispatch<React.SetStateAction<boolean>>;
  };

export const Producto: React.FC<ProductProps> = ({product, setOpenAmountAdd}) => {
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