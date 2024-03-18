"use client"
import { GetInventory } from "~/app/_components/get-inventory";
import { SalesCart } from "~/app/_components/sales-cart";
import { useSalesCartStore } from "../../store/global";

export default function FetchInventory() {
  const showSalesCart = useSalesCartStore((state) => state.showSalesCart);
  const setShowSalesCart = useSalesCartStore((state) => state.setShowSalesCart);

  return (
    <div className='flex flex-col items-center justify-center min-w-full gap-4'>
      <div className="p-4 px-20 w-full">
        <GetInventory />
      </div>
      <div 
        onClick={() => setShowSalesCart(!showSalesCart)}
        className="px-6 py-3 rounded-md border bg-gray-300/80 border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors duration-300 font-medium tracking-wide"
      >
        {showSalesCart ? 'Cerrar caja' : 'Abrir caja'}
      </div>
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