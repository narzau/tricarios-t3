// components/Home.tsx

import React from 'react';
import Nav from './Nav';
import Inventario from './Inventario';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Nav functionalities={["Inventario", "Ventas", "Compras"]} />
			<Inventario />
    </div>
  );
};

export default Home;
