"use client"
import React, { useState } from 'react';
import { api } from '~/trpc/react';

export const SalesHistory: React.FC = () => {
    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const salesResult = api.product.querySales.useQuery({
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });
      
      

  

    const sales = salesResult.data;
    console.log(sales)
    function formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${day}/${month}/${year}, ${hours}:${minutes} ${amPm}`;
    }
  


    return (
        <div className="overflow-y-scroll border border-gray-200 rounded-lg shadow-lg h-screen max-h-screen overflox-x-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-gray-50 text-md">
                    <tr>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            ID de Venta
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Cantidad de productos
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Precio bruto
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Descuento
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Precio neto
                        </th>
                        <th scope="col" className="px-6 py-3  font-semibold text-gray-500 uppercase">
                            Fecha de venta
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-lg">
                    {sales ? sales.sales.map((sale) => (
                        <tr key={sale.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">{sale.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">{sale.soldProducts.length}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">$ {sale.price}</div>
                            </td><td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">% {sale.discountPercentage}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">
                                    $ {sale.price - (sale.price * sale.discountPercentage / 100)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className=" text-gray-900">
                                    {formatDate(sale.createdAt)}
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
            <div className='flex fixed bottom-5 mx-auto items-center justify-center w-full'>
                <div className="flex justify-center mt-4">
                    <button
                        className="px-3 py-1 mx-1 rounded-md bg-green-500/80 text-gray-700"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        Primera
                    </button>
                    {Array.from({ length: Math.ceil(salesResult.data?.totalCount / PAGE_SIZE) }, (_, index) => (
                        <button
                        key={index}
                        className={`px-3 py-1 mx-1 rounded-md ${
                            currentPage === index + 1 ? "bg-green-500/80 text-gray-700" : "bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                        >
                        {index + 1}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 mx-1 rounded-md bg-green-500/80 text-gray-700"
                        disabled={currentPage === Math.ceil(salesResult.data?.totalCount / PAGE_SIZE)}
                        onClick={() => setCurrentPage(Math.ceil(salesResult.data?.totalCount / PAGE_SIZE))}
                    >
                        Última
                    </button>
                </div>

            </div>

        </div>
    );
};
