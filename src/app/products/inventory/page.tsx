'use client'

import { useState } from "react";
import { GetInventory } from "~/app/_components/get-inventory";
import AddProduct from "../add/page";

export default function FetchInventory() {
  const [openModalAdd, setOpenModalAdd] = useState(false)
 

    
  return (
    <div>
      <div className="p-4">
        <GetInventory />
        <p onClick={() => setOpenModalAdd(true)} className="bg-green-400 text-black font-bold p-5 fixed bottom-10 left-1/2 rounded-xl hover:scale-100 scale-90 transition-all shadow-none hover:shadow-xl cursor-pointer">Boton</p>
        {openModalAdd && <AddProduct setOpenModalAdd={setOpenModalAdd}/>}

      </div>
    </div>
  );
};



