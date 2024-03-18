"use client"
import { GetInventory } from "~/app/_components/get-inventory";
import { SalesCart } from "~/app/_components/sales-cart";
import { useSalesCartStore } from "../../store/global";

export default function FetchInventory() {
  const showSalesCart = useSalesCartStore((state) => state.showSalesCart);
  const setShowSalesCart = useSalesCartStore((state) => state.setShowSalesCart);

  return (
    <div className='flex flex-col items-center justify-center min-w-full'>
      <div className="p-4 px-20 w-full">
        <GetInventory />
      </div>
      <div 
        onClick={() => setShowSalesCart(!showSalesCart)}
        className='p-3 bg-red-400 rounded-md w-32 text-center cursor-pointer'
      > Abrir caja</div>
      {
        showSalesCart ?
          <div>
            <SalesCart />
          </div> 
        : undefined
      }

    </div>
  );
};