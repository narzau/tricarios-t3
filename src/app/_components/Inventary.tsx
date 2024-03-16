// components/Home.tsx

import React, { useContext, useState } from 'react';
import { Producto } from './Producto';


const Inventory: React.FC = () => {
	const [openAmountAdd, setOpenAmountAdd] = useState(false)
	const products = [{
		title: 'Sedas ocb - negras',
		id: 1,
		stock: 10,
		price: 400
	}]
  return (
		<div>
			<div className='bg-slate-200 w-[80%] mx-auto p-6 text-center  flex items-center  justify-around '>
				<p className='w-[20%]'>Titulo</p>
        <p className='w-[20%]'>ID</p>
        <p className='w-[20%]'>Cantidad</p>
        <p className='w-[20%]'>Precio</p>
        <p className='w-[20%]'>Agregar al carro</p>

		</div>
			<Producto setOpenAmountAdd={setOpenAmountAdd} product={products[0]}/>
			<Producto setOpenAmountAdd={setOpenAmountAdd} product={products[0]}/>
			<Producto setOpenAmountAdd={setOpenAmountAdd} product={products[0]}/>
			<Producto setOpenAmountAdd={setOpenAmountAdd} product={products[0]}/>

			{openAmountAdd && 
			<div className="fixed inset-0 z-50 flex flex-col gap-3 items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-50">
				<p className='bg-red-200 p-2 rounded-lg shadow-lg cursor-pointer' onClick={() =>setOpenAmountAdd(false)}>X</p>
			<div className="bg-slate-300 p-8 rounded-lg shadow-lg">

				<p>Cantidad de Productos</p>
				<input type="number" />
				
			</div>
		</div>}
		</div>
  );
};

export default Inventory;
