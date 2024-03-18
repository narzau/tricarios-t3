
import Link from "next/link";
import React from "react";

import { CreateProduct } from "~/app/_components/create-product";

interface AddProductProps {
  setOpenModalAdd: React.Dispatch<React.SetStateAction<boolean>>;
}


const AddProduct:React.FC<AddProductProps> = ({ setOpenModalAdd }) => {

  return (
    <main className="text-white flex flex-col justify-center items-center absolute top-0 left-0 w-screen h-screen">
      <div className="backdrop-filter backdrop-blur-lg bg-opacity-30 absolute w-full h-full flex flex-col items-center justify-center px-4 z-10">
        <p onClick={() => setOpenModalAdd(false)} className="absolute top-5 left-5 bg-black text-white py-3 font-semibold transition hover:bg-slate-300 hover:text-slate-900 rounded-xl text-center w-20">
              Volver
          </p>
        <div className='p-5 bg-black gap-4 flex flex-col border-solid border-black border-2 rounded-xl'>          
          <div className="w-full max-w-xs">
            <h1 className="text-3xl font-bold  text-center">Actualizar Inventario</h1>
            <CreateProduct />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddProduct
