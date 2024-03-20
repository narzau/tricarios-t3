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
import { SalesHistory } from "~/app/_components/sales-history";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  
  const { data, status, update} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [selectedOption, setSelectedOption] = useState("inventory"); // Initialize state for selected option
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };
  
  const renderComponent = () => {
    switch (selectedOption) {
      case "inventory":
        return <GetInventory />;
      case "sales_cart":
        return <SalesCart />;
      case "add_product":
        return <CreateProduct />;
      case "sales_history":
        return <SalesHistory />;
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

  const handleLogout = async () => {
    await signOut();
  }
  return (
    <div className="flex max-h-screen overflow-hidden">
{      status == 'authenticated' ? <div className="flex max-h-screen overflow-hidden w-full">
      <Card className="sticky left-0 h-screen w-42 shadow-xl shadow-blue-gray-900/5 text-xl "  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Tricarios Growshop
          </Typography>
        </div>
        <List className="gap-2 " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <ListItem className={`gap-3 p-2 ${selectedOption === "inventory" ? "bg-blue-100" : ""}`} onClick={() => handleSelectOption("inventory")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inventario
          </ListItem>
          <ListItem className={`gap-3  p-2 ${selectedOption === "sales_cart" ? "bg-blue-100" : ""}`} onClick={() => handleSelectOption("sales_cart")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Caja
          </ListItem>
          <ListItem className={`gap-3  p-2 ${selectedOption === "add_product" ? "bg-blue-100" : ""}`} onClick={() => handleSelectOption("add_product")}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cargar
          </ListItem>
          <ListItem className={`gap-3  p-2 ${selectedOption === "sales_history" ? "bg-blue-100" : ""}`} onClick={() => handleSelectOption("sales_history")} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Ventas
          </ListItem>
          <ListItem className={` p-2 text-sm w-42 text-red-500/80 items-center justify-center self-center fixed bottom-4 gap-3`} onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cerrar sesion
          </ListItem>
        </List>
      </Card>
      <div className="flex flex-col h-screen w-full overflow-x-hidden overflow-y-scroll">{renderComponent()}</div>
      </div> : null}
    </div>
  );
}
