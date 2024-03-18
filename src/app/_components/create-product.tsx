"use client"
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { BaseProduct } from "@prisma/client";

export function CreateProduct() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [isSelected, setIsSelected] = useState<boolean>(false); // State for checkbox
  const [selectedValue, setSelectedValue] = useState<BaseProduct | null>(null);

  const handleSelectOption = (selectedProduct: BaseProduct) => {
    setDisplayName(selectedProduct.displayName);
    setBrand(selectedProduct.brand ?? "");
    setModel(selectedProduct.model ?? "");
    setCode(selectedProduct.code ?? "");
    setProductId(selectedProduct.id);
    setIsSelected(true);
  };

  const handleCheckboxChange = () => {
    if (isSelected) {
      setIsSelected(false);
      setSelectedValue(null); // Reset selectedValue when checkbox is unchecked
      setDisplayName("");
      setBrand("");
      setModel("");
      setCode("");
      setPrice(0);
      setQuantity(1);
    }
  };

  const createProduct = api.product.addProductToInventory.useMutation({
    onSuccess: () => {
      router.refresh();
      setDisplayName("");
      setBrand("");
      setModel( "");
      setCode("");
      setProductId(undefined);
      setIsSelected(false);
      setPrice(0);
      setQuantity(1);
    },
  });

  return (
    <div className="flex flex-col h-screen overflow-x-hidden overflow-y-scroll">

        <div className="container mx-auto mt-8">
          <Dropdown
            onSelect={handleSelectOption}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="ml-2"
          />
        </div>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProduct.mutate({ displayName, brand, model, code, quantity, price, productId });
        }}
        className="flex flex-col gap-2  text-gray-700 px-36 rounded-lg self-center shadow-2xl"
      >
        <InputField label="Nombre" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={isSelected} />
        <InputField label="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={isSelected} />
        <InputField label="Modelo" value={model} onChange={(e) => setModel(e.target.value)} disabled={isSelected} />
        <InputField label="Codigo" value={code} onChange={(e) => setCode(e.target.value)} disabled={isSelected} />
        <InputField label="Cantidad" value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 0)} />
        <InputField label="Precio" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <button
          type="submit"
          className="rounded-md bg-gray-300/80  py-3 font-semibold uppercase tracking-wide transition hover:bg-gray-500/80 my-10 w-36 text-center content-center self-center"
          disabled={createProduct.isPending}
        >
          {createProduct.isPending ? "Cargando..." : "Cargar"}
        </button>
      </form>
    </div>
  );
}
interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, disabled = false }) => {
  return (
    <div className="flex center content-center items-center py-4 flex-col">
      <div className="uppercase tracking-normal">{label}</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`rounded-md shadow-lg border-2 border-gray-100  bg-white/10 p-3 ${disabled ? "bg-white/5 text-gray-400" : ""}`}
        disabled={disabled}
      />
    </div>
  );
};



interface DropdownProps {
  onSelect: (option: BaseProduct) => void;
  selectedValue: BaseProduct | null;
  setSelectedValue: (value: BaseProduct | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect, selectedValue, setSelectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = api.product.getPaginatedBaseProducts.useQuery({nameFilter: searchTerm}, {
    enabled: !!searchTerm || true,
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option: BaseProduct) => {
    onSelect(option);
    setIsOpen(false);
    setSelectedValue(option);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative group w-80  z-10" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer inline-flex justify-center w-full px-4 py-2 text-sm font-medium  bg-gray-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          <span className="mr-2 text-black/80">{selectedValue ? selectedValue.displayName : 'Seleccionar producto existente'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className={`${isOpen ? '' : 'hidden'} absolute right-0 mt-2 rounded-md shadow-lg w-80 bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
        >
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search items"
            autoComplete="off"
          />
          {data ? data.map((option, index) => (
            <a
              key={index}
              href="#"
              onClick={() => handleSelectOption(option)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              {option.displayName}
            </a>
          )) : null}
          {!data || data.length === 0 && (
            <p className="px-4 py-2 text-gray-700">No se encontraron productos con este nombre</p>
          )}
        </div>
      </div>
    </div>
  );
};