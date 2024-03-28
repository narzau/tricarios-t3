"use client"
import React, { useState } from 'react';
import { api } from '~/trpc/react';

export const SalesHistory: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

  
    const salesResult = api.product.querySales.useQuery({
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
    });
    const sales = salesResult.data;
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
            <div className="flex justify-between px-4 py-2">
                <div className="flex items-center">
                    <label htmlFor="startDate" className="mr-2">Fecha de Inicio:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate ? startDate.toISOString().substr(0, 10) : ''}
                        onChange={e => handleStartDateChange(new Date(e.target.value))}
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="endDate" className="mr-2">Fecha de Término:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate ? endDate.toISOString().substr(0, 10) : ''}
                        onChange={e => handleEndDateChange(new Date(e.target.value))}
                    />
                </div>
            </div>
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
