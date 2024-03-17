import React from "react";

type SellProps = {
	sell: {
			idSell: number;
			amountItems: number;
			totalPrice: number;
		};
	setOpenAmountAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sell: React.FC<SellProps> = ({ sell }) => {
    return(
			<div className="flex flex-row justify-around items-center w-[80%] p-6 bg-slate-200 mx-auto">
				<p className="w-[25%] text-center">{sell.idSell}</p>
				<p className="w-[25%] text-center">{sell.amountItems}</p>
				<p className="w-[25%] text-center">$ {sell.totalPrice}</p>
				<p className="w-[25%] text-center"> Ver Detalle</p>
			</div>
    )
}

export default Sell