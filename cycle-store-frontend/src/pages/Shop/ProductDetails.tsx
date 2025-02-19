import Button from "@/components/Button";
import CustomImage from "@/components/Img";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import useUser from "@/hooks/useUser";
import { useGetSingleProductQuery } from "@/redux/features/admin/productApi.admin";
import { useGetSingleUserQuery } from "@/redux/features/users/usersApi";
import { TProduct } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SkewLoader } from "react-spinners";
import ProductOrder from "./ProductOrder";

export default function ProductDetails() {
  const { productId } = useParams();
  const { data, isLoading, isFetching } = useGetSingleProductQuery(productId);
  const user = useUser();
  const { data: userData } = useGetSingleUserQuery(user?._id);
  const [productImages, setProductImages] = useState<string[]>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [productData, setProductData] = useState<TProduct>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setProductData(data?.data);
    setSelectedImage(data?.data?.thumbnail);
    setProductImages([
      ...(data?.data?.extraImages || []),
      data?.data?.thumbnail,
    ]);
  }, [data]);

  if (isLoading || isFetching) {
    return (
      <div className="py-10 px-6 flex items-center justify-center">
        <SkewLoader />
      </div>
    );
  }

  const handleBuyProduct = async () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Image Gallery */}
          <div className="flex flex-col">
            <Card className="rounded-lg overflow-hidden border shadow">
              {selectedImage && (
                <CustomImage
                  src={selectedImage}
                  alt={productData?.productName}
                  width={600}
                  height={600}
                  className="w-full h-96 object-cover"
                />
              )}
            </Card>

            {/* Extra Images */}
            {productImages?.length ? (
              <div className="flex gap-2 mt-4">
                {productImages
                  .filter((pi) => pi !== selectedImage)
                  ?.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 border rounded-md overflow-hidden ${
                        selectedImage === img
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      <CustomImage
                        src={img}
                        alt={`Extra ${idx}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Right Side - Product Info */}
          <div>
            <h2 className="text-2xl font-bold">{productData?.productName}</h2>
            <p className="text-gray-500">{productData?.brandName}</p>

            {/* Price Section */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-bold text-primary">
                ${productData?.prices?.sale}
              </span>
              <span className="text-gray-400 line-through">
                ${productData?.prices?.regular}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              {productData?.inStock ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-500"
                >
                  In Stock
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-500"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600">{productData?.description}</p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center justify-between gap-6">
              <Button className="mt-6 w-full" disabled={!productData?.inStock}>
                {productData?.inStock ? "Add to Cart" : "Sold Out"}
              </Button>
              <Button
                onClick={() => handleBuyProduct()}
                className="mt-6 min-w-max"
                disabled={!productData?.inStock}
              >
                {productData?.inStock ? "Buy Now" : "Sold Out"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isOpenModal && productData && (
        <ProductOrder
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          product={productData}
          userData={userData?.data}
        />
      )}
    </>
  );
}
