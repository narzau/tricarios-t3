
import Link from "next/link";

import { CreateProduct } from "~/app/_components/create-product";

export default async function AddProduct() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {

  
  return (
    <div>
      <Link href={"/products"} className="rounded-full bg-white/10  py-3 font-semibold transition hover:bg-white/20 my-10 w-36 text-center content-center self-center">
          Volver
      </Link>
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold py-10 text-center">Cargar producto a inventario</h1>
        <CreateProduct />
      </div>
    </div>

  );
}
