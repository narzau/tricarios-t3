// components/Home.tsx

import React from 'react';

type NavProps = {
    functionalities: string[];
  };

const Nav: React.FC<NavProps> = ({ functionalities }) => {
  return (
    <nav className='w-screen flex items-center justify-center'>
      <ul className='flex flex-row w-4/6 justify-between shadow-xl bg-slate-400 p-2 rounded-xl'>
        {functionalities.map((functionality) => (
          <li className='font-semibold tracking-wide hover:bg-slate-300 p-4 rounded-lg w-1/3 text-center transition-all cursor-pointer scale-90 hover:scale-100' key={functionality}>{functionality}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
