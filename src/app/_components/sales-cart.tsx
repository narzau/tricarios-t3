import React, { useState } from 'react';
import { type StoreProduct, useSalesCartStore } from "../store/global";
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';

export const SalesCart: React.FC = () => {
    const router = useRouter();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const products = useSalesCartStore((state) => state.products);
    const addQuantity = useSalesCartStore((state) => state.addQuantityToProduct)
    const removeQuantity = useSalesCartStore((state) => state.removeQuantityFromProduct);
    const emptyCart = useSalesCartStore((state) => state.emptyProducts);
    const calculateMaxQuantity = (product: StoreProduct) => Math.min(product.stock, product.quantity);

    const calculateTotal = () => {
      let total = products.reduce((acc, product) => {
          const discountedPrice = product.listPrice * (1 - product.discountPercentage / 100);
          return acc + discountedPrice * product.quantity;
      }, 0);
      const discountAmount = total * (discountPercentage / 100);
     ;
      return {
        rawTotal: total,
        netTotal: total -= discountAmount
      };
    };
    const saleSubmit = api.product.saleSubmit.useMutation({
        onSuccess: () => {
          router.refresh();
        },
      });


    const handleSaleSubmit = () => {
        const { rawTotal } = calculateTotal()
        const sale = {
            products: products.map((product) => ({
                productId: product.product.id,
                quantity: product.quantity,
                discountPercentage: product.discountPercentage,
                price: product.listPrice
            })),
            discountPercentage,
            totalSalePrice: rawTotal,
        };
        saleSubmit.mutate(sale);
        emptyCart();
    }

    return (
        <div className="overflow-y-scroll border border-gray-200 rounded-lg shadow-lg h-screen max-h-screen overflox-x-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-gray-50 text-md">
                    <tr>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Nombre de producto
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Precio por unidad
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Descuento
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-lg">
                    {products.length ? products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">{product.product.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">{product.product.displayName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">{product.listPrice}</div>
                            </td><td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">% {product.discountPercentage}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">
                                    {calculateMaxQuantity(product)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex">
                                {product.stock !== 0 && (
                                    <div onClick={() => addQuantity(product.id, product.stock)} className='select-none cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`  w-8 h-8 ${product.stock - product.quantity === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-green-400'}`}>
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                <div onClick={() => product.quantity !== 0 && removeQuantity(product.id)} className='select none cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={` w-8 h-8 ${product.quantity === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-red-400'}`}>
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    )) : 
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap" colSpan={6}>
                            <div className="text-gray-900 text-center">No hay productos en la caja</div>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
            <div className={`p-4 ${products.length ? 'flex' : 'hidden'} flex-col items-center justify-center w-full gap-4`}>
                Porcentajde de descuento sobre el total
                <div>
                %
                <input
                    type="number"
                    prefix='%'
                    className="px-4 py-2 w-20 border border-gray-300 rounded-md"
                    value={discountPercentage === 0 ? '' : discountPercentage}
                    min={0}
                    max={100}
                    onFocus={() => {
                        if (discountPercentage === 0) setDiscountPercentage(0);
                    }}
                    onChange={(e) => {
                        let value = parseFloat(e.target.value);
                        value = isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
                        setDiscountPercentage(value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' && discountPercentage === 0) {
                            e.preventDefault();
                        }
                    }}
                />
                </div>
                <div className='font-bold'>
                    Total: ${calculateTotal().netTotal}
                </div>
                <div>
                    <button className="px-4 py-2 bg-red-500/80 text-white rounded-md" onClick={emptyCart}>
                        Vaciar caja
                    </button>
                    <button className="ml-2 px-4 py-2 bg-green-500/80 text-white rounded-md" onClick={handleSaleSubmit}>
                        Finalizar venta
                    </button>
                </div>
            </div>
        </div>
    );
};
