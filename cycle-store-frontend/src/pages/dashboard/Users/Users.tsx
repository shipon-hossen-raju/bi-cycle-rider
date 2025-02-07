import { TProduct } from "@/types";
import { useState } from "react";
import { productsTabIndex } from "./ProductsConstant";
import UserShowAdmin from "./UserShowAdmin";

export default function Users() {
  const [isProduct, setIsProduct] = useState<string | undefined>("USER_SHOW");
  const [userData, setUserData] = useState<TProduct>();

  return (
    <div className="space-y-4">
      {/* title bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {isProduct === productsTabIndex.show ? "Users Lists" : null}
        </h2>
        {/* <div>
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
        </div> */}
      </div>

      {/* product lists */}
      <div className="bg-white/50 rounded space-y-0 p-5 overflow-y-scroll">
        {isProduct === productsTabIndex.show ? (
          <UserShowAdmin
            setProductData={setUserData}
            setIsProduct={setIsProduct}
          />
        ) : null}
      </div>
    </div>
  );
}
