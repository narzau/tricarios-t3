"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';
import { api } from "~/trpc/react";

export const GetInventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
    const [editablePrice, setEditablePrice] = useState<number | null>(null); // State to track editable price
    const [editableDiscount, setEditableDiscount] = useState<number | null>(null); // State to track editable price
    const [editedDiscount, setEditedDiscount] = useState<number | null>(null); // State to track changes to edited price
    const [editedPrice, setEditedPrice] = useState<number | null>(null); // State to track changes to edited price
    const router = useRouter();

    const result = api.product.getPaginatedInventory.useQuery({nameFilter: searchTerm}, {
      enabled: !!searchTerm || true,
    });

    const { data } = result
    const updateStockedProduct = api.product.updateStockedProduct.useMutation({
      onSuccess: () => {
        setEditedPrice(null);
        setEditablePrice(null);
        setEditableDiscount(null);
        setEditedDiscount(null);
        router.refresh();
        result.refetch();
      },
    });

    // Function to handle editing of the list price
    const handleEditPrice = (index: number, price: number) => {
      setEditablePrice(index);
      setEditedPrice(price);
    };

    const handleEditDiscount = (index: number, discount: number) => {
      if (editableDiscount === null) {
        setEditableDiscount(index);
        setEditedDiscount(discount);
      }
    };

    return (
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
        <input
             onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search items"
            autoComplete="off"
          />
        <table className="min-w-full divide-y divide-gray-200 text-center">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                ID
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                Nombre de producto
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                Marca
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                Precio de lista
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                Cantidad en stock
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                Descuento
              </th>
              <th scope="col" className="px-6 py-3  text-xs font-semibold text-gray-500 uppercase">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data ? data.map((sale, index) => (
              <React.Fragment key={index}>
                <tr className="cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.product.displayName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.product.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.product.model}
                  </td>
                  <td onClick={() => handleEditPrice(index, sale.listPrice)} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center justify-center"> 
                      {editablePrice === index ?
                        <div className='flex items-center'>
                        <input
                          type="number"
                          prefix="$"
                          value={editedPrice !== null ? editedPrice : sale.listPrice}
                          onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault(); // Prevent form submission
                              e.target.nextSibling.click(); // Trigger click event of the next sibling (button)
                            }
                          }}
                          className="px-3 w-28 py-1 border rounded-md focus:outline-none"
                        />
                        <button onClick={(e) => {
                          e.preventDefault();
                          editedPrice ? updateStockedProduct.mutate({ id: sale.product.id, listPrice: editedPrice }) : undefined;
                        }} className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                          </svg>                          
                        </button>
                      </div>
                      : 
                        <div className='flex items-center'>
                            <p className="mr-2">$ {sale.listPrice.toLocaleString()}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </div>
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.stock}</td>
                  <td onClick={() => handleEditDiscount(index, sale.discountPercentage)} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center justify-center"> 
                      {editableDiscount === index ?
                        <div className='flex items-center'>
                          <input
                            type="text"

                            value={editedDiscount !== null ? editedDiscount : sale.discountPercentage}
                            onChange={(e) => setEditedDiscount(parseFloat(e.target.value) || 0)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent form submission
                                e.target.nextSibling.click(); // Trigger click event of the next sibling (button)
                              }
                            }}
                            className="px-3 w-12 py-1 border rounded-md focus:outline-none"
                          />
                          <button onClick={(e) => {
                            e.preventDefault();
                            editedDiscount !== null ? updateStockedProduct.mutate({ id: sale.product.id, discountPercentage: editedDiscount }) : undefined;
                          }} className="ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                            </svg>                          
                          </button>
                        </div>
                      : 
                        <div className='flex items-center'>
                          <p className="mr-2">% {sale.discountPercentage}</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </div>
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Editar</td>
                </tr>
              </React.Fragment>
            )) : undefined}
          </tbody>
        </table>
      </div>
    );
};
