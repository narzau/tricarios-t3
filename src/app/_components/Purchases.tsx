import React, { useState } from "react";
import Purchase from "./Purchase";

const Purchases: React.FC = () => {
    const [openDetailPurchase, setOpenDetailPurchase] = useState(false)
	const purchase = [{
		idPurchase: 12,
		amountItems: 4,
		totalPrice: 12589
	}]
  return (
		<div>
            <div className="flex flex-row justify-around items-center w-[80%] p-6 bg-slate-200 mx-auto">
				<p className="w-[25%] text-center">ID Compra</p>
				<p className="w-[25%] text-center">Cantidad de Items</p>
				<p className="w-[25%] text-center">Precio Total</p>
				<p className="w-[25%] text-center"> Ver Mas</p>
			</div>
			<Purchase setOpenDetailPurchase={setOpenDetailPurchase} purchase={purchase[0]}/>
			<Purchase setOpenDetailPurchase={setOpenDetailPurchase} purchase={purchase[0]}/>
			<Purchase setOpenDetailPurchase={setOpenDetailPurchase} purchase={purchase[0]}/>
			<Purchase setOpenDetailPurchase={setOpenDetailPurchase} purchase={purchase[0]}/>
            {openDetailPurchase && 
			<div className="fixed inset-0 z-50 flex flex-col gap-3 items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-50">
				<p className='bg-red-200 p-2 rounded-lg shadow-lg cursor-pointer' onClick={() =>setOpenDetailPurchase(false)}>X</p>
				<div className="bg-slate-300 p-8 rounded-lg shadow-lg">

					<p>DETALLE DE COMPRA</p>
                    <div className="flex flex-row gap-5">
                        <p>Items Totales: </p>
                        <p>Precio Total: </p>
                        <p>Ganancia Total: </p>
                    </div>
					
				</div>
			</div>}
		</div>
	)
}

export default Purchases