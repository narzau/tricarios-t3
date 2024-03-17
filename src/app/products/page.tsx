
import Link from "next/link";
import Homee from "../_components/Home";


export default async function AddProduct() {
    const navigation = {
      add: {
        href: "/products/add",
        label: "Cargar producto",
      },
      sales_history: {
        href: "/products/sales-history",
        label: "Historial de ventas",
      }
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Homee />
      </div>
    </main>
  );
}
