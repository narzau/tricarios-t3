"use client"
import React, { useEffect, useState } from 'react';
import { api } from '~/trpc/react';

export const SalesHistory: React.FC = () => {

  
    const salesResult = api.product.querySales.useQuery({
      
    });
    let sales = salesResult.data;
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
                    {sales ? sales.map((sale) => (
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
        </div>
    );
};
