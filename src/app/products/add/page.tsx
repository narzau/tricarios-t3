
import Link from "next/link";

import { CreateProduct } from "~/app/_components/create-product";

export default async function AddProduct() {

  return (
    <main className="text-gray-100 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
      <div className="container flex flex-col items-center justify-center px-4 ">
        <div className='gap-4 flex flex-col'>
          <Link href={"/products"} className=" bg-white/10 py-3 font-semibold transition hover:bg-white/20 rounded-xl text-center w-20">
              Volver
          </Link>
          <div className="w-full max-w-xs">
            <h1 className="text-3xl font-bold  text-center">Actualizar Inventario</h1>
            <CreateProduct />
          </div>
        </div>
      </div>
    </main>
  );
}
