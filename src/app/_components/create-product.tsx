"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [code, setCode] = useState("");

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createProduct.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <div>
        Nombre
      </div>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <div>
        Stock
      </div>
      <input
        type="text"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <div>
        Codigo
      </div>
      <input
        type="text"
        placeholder="Codigo"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10  py-3 font-semibold transition hover:bg-white/20 my-10 w-36 text-center content-center self-center"
        disabled={createProduct.isPending}
      >
        {createProduct.isPending ? "Cargando..." : "Cargar"}
      </button>
    </form>
  );
}
