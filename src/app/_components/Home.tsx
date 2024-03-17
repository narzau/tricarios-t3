// components/Home.tsx
'use client'

import React, { useState } from 'react';
import Nav from './Nav';
import Inventory from './Inventory';
import Sells from './Sells';
import Purchases from './Purchases';

const Homee: React.FC = () => {
  const [whyView, setWhyView] = useState('Inventario')
  let content;

  switch (whyView) {
    case 'Inventario':
      content = <Inventory />;
      break;
    case 'Ventas':
      content = <Sells />;
      break;
    default:
      content = <Purchases />;
      break;
  }
  return (
    <div className='text-black'>
      <Nav setWhyView={setWhyView} functionalities={["Inventario", "Ventas", "Compras"]} />
      {content}
    </div>
  );
};

export default Homee;
