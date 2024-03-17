import React from "react";

type PurchaseProps = {
	purchase: {
			idPurchase: number;
			amountItems: number;
			totalPrice: number;
		};
	setOpenDetailPurchase: React.Dispatch<React.SetStateAction<boolean>>;
};

const Purchase: React.FC<PurchaseProps> = ({setOpenDetailPurchase, purchase }) => {
    return(
			<div className="flex flex-row justify-around items-center w-[80%] p-6 bg-slate-200 mx-auto">
				<p className="w-[25%] text-center">{purchase.idPurchase}</p>
				<p className="w-[25%] text-center">{purchase.amountItems}</p>
				<p className="w-[25%] text-center">$ {purchase.totalPrice}</p>
				<p className="w-[25%] text-center" onClick={() => setOpenDetailPurchase(true)}> Ver Detalle</p>
			</div>
    )
}

export default Purchase