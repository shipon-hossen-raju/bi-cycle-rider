import Button from "@/components/Button";
import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductShow from "./ProductShow.admin";

export default function Products() {
  const [isProduct, setIsProduct] = useState(true);
  const handleProduct = () => {
    console.log("coming");
    setIsProduct(!isProduct);
  };

  return (
    <div className="space-y-4">
      {/* title bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {isProduct ? "Products Lists" : "Add Product"}
        </h2>
        <div>
          {isProduct ? (
            <Button
              onClick={handleProduct}
              className="!py-1.5 !px-1 text-semibold"
              variant="outline"
            >
              Add Product
            </Button>
          ) : null}
        </div>
      </div>

      {/* product lists */}
      <div className="bg-white/50 rounded space-y-0 p-5 max-h-[calc(100vh-140px)] overflow-y-scroll">
        {isProduct ? (
          <ProductShow setIsProduct={setIsProduct} />
        ) : (
          <AddProduct setIsProduct={setIsProduct} />
        )}
      </div>
    </div>
  );
}
