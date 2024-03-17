"use client"
import React, { useState } from 'react';

const YourPage: React.FC = async () => {
  const sales: Sale[] = [
    { 
      productsSold: [
        { name: 'Product A', quantity: 2 },
        { name: 'Product B', quantity: 3 },
      ],
      totalIncome: '$100',
      date: '2024-03-15' 
    },
    { 
      productsSold: [
        { name: 'Product C', quantity: 4 },
        { name: 'Product D', quantity: 4 },
      ],
      totalIncome: '$150',
      date: '2024-03-14' 
    },
    // Add more sales data as needed
  ];

    
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sales History</h1>
      <div className="p-4">
        <SalesHistory sales={sales} />
      </div>
    </div>
  );
};

interface Product {
  name: string;
  quantity: number;
}

interface Sale {
  productsSold: Product[];
  totalIncome: string;
  date: string;
}

interface SalesHistoryProps {
  sales: Sale[];
}

const SalesHistory: React.FC<SalesHistoryProps> = ({ sales }) => {
  const [expandedSaleIndex, setExpandedSaleIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedSaleIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              Total Products Sold
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              Total Income
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleRow(index)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sale.productsSold.reduce((total, product) => total + product.quantity, 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.totalIncome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.date}</td>
              </tr>
              {expandedSaleIndex === index && (
                <tr className="bg-gray-100">
                  <td colSpan={3} className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      Products Sold:
                      <ul className="list-disc list-inside">
                        {sale.productsSold.map((product, i) => (
                          <li key={i}>{`${product.name}: ${product.quantity}`}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourPage;
