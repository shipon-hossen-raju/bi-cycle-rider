import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetAllProductsQuery } from "@/redux/features/admin/productApi.admin";
import { Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { SkewLoader } from "react-spinners";

type TProductShow = {
  setIsProduct: (value: boolean) => void;
};

export default function ProductShow({ setIsProduct }: TProductShow) {
  const [page, setPage] = useState(1);
  const {
    data: productData,
    isFetching,
    isLoading,
  } = useGetAllProductsQuery([
    {
      name: "page",
      value: page,
    },
  ]);
  // const isLoading = true;

  const handleDelete = (id: string) => {
    console.log("delete id ", id);
  };

  if (isLoading || isFetching) {
    return (
      <div className="py-10 px-6 flex items-center justify-center">
        <SkewLoader />
      </div>
    );
  }

  return (
    <>
      {productData?.data?.length ? (
        <div className="">
          <Table>
            <TableHeader className="font-semibold">
              <TableRow className="text-center">
                <TableHead>Product Name</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData?.data.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.brandName}</TableCell>
                  <TableCell>${product.prices.regular}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell className="">
                    <span
                      className={cn("px-2 py-1 rounded text-sm", {
                        "bg-green-100 text-green-800":
                          product.productStatus === "active",
                        "bg-red-100 text-red-800":
                          product.productStatus === "inActive",
                      })}
                    >
                      {product.productStatus}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-12">
                    <div className="flex space-x-2">
                      <Button className="hover:bg-brand/20" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button className="hover:bg-brand/20" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        className="hover:bg-brand/20"
                        variant="ghost"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="">
              <p className="text-sm font-medium">
                Total products: {productData.meta?.total}
              </p>
            </div>
            <div className="">
              <Pagination
                setPage={setPage}
                metaData={
                  productData?.meta ?? {
                    limit: 0,
                    page: 0,
                    total: 0,
                    totalPage: 0,
                  }
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[300px]">
          <Button
            onClick={() => setIsProduct(false)}
            className="!py-1.5 !px-1 text-semibold"
            variant="outline"
          >
            Add Product
          </Button>
        </div>
      )}
    </>
  );
}
