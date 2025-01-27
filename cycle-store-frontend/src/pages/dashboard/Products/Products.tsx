import Button from "@/components/Button";
import { useState } from "react";
import AddProduct from "./AddProduct";

export default function Products() {
  const [isProduct, setIsProduct] = useState(false);
  const handleProduct = () => {
    console.log("coming");
    setIsProduct(!isProduct);
  };

  return (
    <div className="space-y-4">
      {/* title bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {isProduct ? "Products Lists" : "Add Product"}{" "}
        </h2>
        <div>
          <Button
            onClick={handleProduct}
            className="!py-1.5 !px-1 text-semibold"
            variant="outline"
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* product lists */}
      <div className="bg-white/50 rounded p-5">
        {isProduct ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Button
              onClick={handleProduct}
              className="!py-1.5 !px-1 text-semibold"
              variant="outline"
            >
              Add Product
            </Button>
          </div>
        ) : (
          <AddProduct />
        )}
      </div>
    </div>
  );
}
