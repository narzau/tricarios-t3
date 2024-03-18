"use client";
import { useEffect, useState } from "react"; // Import useState hook
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,

} from "@heroicons/react/24/solid";
import { GetInventory } from "~/app/_components/get-inventory";
import { SalesCart } from "~/app/_components/sales-cart";
import { CreateProduct } from "~/app/_components/create-product";

export default function FetchInventory() {
  const [selectedOption, setSelectedOption] = useState("inventory"); // Initialize state for selected option

  // Function to handle selection change
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  // Function to render component based on selected option
  const renderComponent = () => {
    switch (selectedOption) {
      case "inventory":
        return <GetInventory />;
      case "sales_cart":
        return <SalesCart />;
      case "add_product":
        return <CreateProduct />;
      case "sales_history":
        return <CreateProduct />;
      default:
        return null;
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Shift + number key combinations
      switch (event.key) {
        case "!":
          handleSelectOption("inventory");
          break;
        case "@":
          handleSelectOption("sales_cart");
          break;
        case "#":
          handleSelectOption("add_product");
          break;
        case "$":
          handleSelectOption("sales_history");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="flex max-h-screen overflow-hidden">
      <Card className="sticky left-0 h-screen w-40 p-0 shadow-xl shadow-blue-gray-900/5 text-md"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Tricarios Growshop
          </Typography>
        </div>
        <List  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItem className="gap-3" onClick={() => handleSelectOption("inventory")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inventario
          </ListItem>
          <ListItem className="gap-3" onClick={() => handleSelectOption("sales_cart")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Caja
          </ListItem>
          <ListItem className="gap-3" onClick={() => handleSelectOption("add_product")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cargar
          </ListItem>
          <ListItem className="gap-3" onClick={() => handleSelectOption("add_product")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Ventas
          </ListItem>
        </List>
      </Card>
      <div className="flex flex-col h-screen w-full">{renderComponent()}</div>
    </div>
  );
}
