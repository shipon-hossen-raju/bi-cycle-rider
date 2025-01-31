import Button from "@/components/Button";
import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductShow from "./ProductShowAdmin";
import { productsTabIndex } from "./ProductsConstant";
import UpdateProduct from "./UpdateProduct";
import { TProduct } from "@/types";

export default function Products() {
  const [isProduct, setIsProduct] = useState<string | undefined>("SHOW");
  const [productData, setProductData] = useState<TProduct>();

  return (
    <div className="space-y-4">
      {/* title bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {isProduct === productsTabIndex.show
            ? "Products Lists"
            : isProduct === productsTabIndex.add
            ? "Add Product"
            : isProduct === productsTabIndex.update
            ? "Product Update"
            : null}
        </h2>
        <div>
          {isProduct === productsTabIndex.show ? (
            <Button
              onClick={() => setIsProduct(productsTabIndex.add)}
              className="!py-1.5 !px-1 text-semibold"
              variant="outline"
            >
              Add Product
            </Button>
          ) : (
            <Button
              onClick={() => setIsProduct(productsTabIndex.show as string)}
              className="!py-2 !px-1 text-semibold"
              variant="outline"
              type="submit"
            >
              Cancel Product
            </Button>
          )}
        </div>
      </div>

      {/* product lists */}
      <div className="bg-white/50 rounded space-y-0 p-5 overflow-y-scroll">
        {isProduct === productsTabIndex.show ? (
          <ProductShow
            setProductData={setProductData}
            setIsProduct={setIsProduct}
          />
        ) : isProduct === productsTabIndex.add ? (
          <AddProduct setIsProduct={setIsProduct} />
        ) : isProduct === productsTabIndex.update ? (
          <UpdateProduct
            productData={productData}
            setIsProduct={setIsProduct}
          />
        ) : null}
      </div>
    </div>
  );
}
