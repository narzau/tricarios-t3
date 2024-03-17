import React from "react";
import Sell from "./Sell";

const Sells: React.FC = () => {
	const sell = [{
		idSell: 12,
		amountItems: 4,
		totalPrice: 12589
	}]
  return (
		<div>
			<div className="flex flex-row justify-around items-center w-[80%] p-6 bg-slate-200 mx-auto">
				<p className="w-[25%] text-center">ID Venta</p>
				<p className="w-[25%] text-center">Cantidad de Items</p>
				<p className="w-[25%] text-center">Precio Total</p>
				<p className="w-[25%] text-center"> Ver Mas</p>
			</div>
			<Sell sell={sell[0]}/>
			<Sell sell={sell[0]}/>
			<Sell sell={sell[0]}/>
			<Sell sell={sell[0]}/>
		</div>
	)
}

export default Sells