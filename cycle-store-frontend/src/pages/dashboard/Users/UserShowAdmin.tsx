import { emptyFile } from "@/assets/icons/globalIcon";
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
import { useGetAllUsersQuery } from "@/redux/features/users/usersApi";
import { TUser } from "@/types/users.types";
import { Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { SkewLoader } from "react-spinners";
import { toast } from "sonner";
import { productsTabIndex } from "./ProductsConstant";

type TUsersShow = {
  setIsProduct: (value: string) => void;
};

export default function UserShowAdmin({ setIsProduct }: TUsersShow) {
  const [page, setPage] = useState(1);
  const {
    data: usersData,
    isFetching,
    isLoading,
  } = useGetAllUsersQuery([
    {
      name: "page",
      value: page,
    },
  ]);

  console.log("usersData", usersData);

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Product deleting");
    try {
      console.log("id :>> ", id);
      // await deleteProducts(id).unwrap();
      toast.success("Product Deleted success", { id: toastId });
    } catch (err: any) {
      toast.error(`${err?.data?.message}`, { id: toastId });
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="py-10 px-6 flex items-center justify-center">
        <SkewLoader />
      </div>
    );
  }

  const handleUpdate = (data: TUser) => {
    console.log("data", data);
    setIsProduct(productsTabIndex.update as string);
    // setProductData(data);
  };

  return (
    <>
      {usersData?.data?.length ? (
        <div className="">
          <Table>
            <TableHeader className="font-semibold">
              <TableRow className="text-center">
                <TableHead>Name</TableHead>
                <TableHead>Mail</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData?.data.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>${user.phone}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="">
                    <span
                      className={cn("px-2 py-1 rounded text-sm", {
                        "bg-green-100 text-green-800": user.role === "active",
                        "bg-red-100 text-red-800": user.role === "inActive",
                      })}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-12">
                    <div className="flex space-x-2">
                      <Button className="hover:bg-brand/20" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Link to={`/dashboard/users/${user._id}`}>
                        <Button
                          onClick={() => handleUpdate(user)}
                          className="hover:bg-brand/20"
                          variant="ghost"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        className="hover:bg-brand/20"
                        variant="ghost"
                        onClick={() => handleDelete(user._id)}
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
                Total products: {usersData.meta?.total}
              </p>
            </div>
            <div className="">
              <Pagination
                setPage={setPage}
                metaData={
                  usersData?.meta ?? {
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
        <div className="flex items-center justify-center min-h-[300px] flex-col gap-4">
          <figure className="text-2xl">{emptyFile}</figure>
          <span>No Data to display</span>
        </div>
      )}
    </>
  );
}
