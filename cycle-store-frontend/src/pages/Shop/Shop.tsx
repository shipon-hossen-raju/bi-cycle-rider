import { heartIcon } from "@/assets/icons/globalIcon";
import Button from "@/components/Button";
import CustomImage from "@/components/Img";
import MainContainer from "@/components/MainContainer";
import Pagination from "@/components/Pagination";
import SectionTitle from "@/components/SectionTitle";
import { useGetAllProductsQuery } from "@/redux/features/admin/productApi.admin";
import { TProduct } from "@/types";
import shortParagraph from "@/utils/shortParagraph";
import { useState } from "react";
import { Link } from "react-router";
import { SkewLoader } from "react-spinners";

export default function Shop() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllProductsQuery([
    {
      name: "page",
      value: page,
    },
  ]);
  const productsData = data?.data;
  const productMeta = data?.meta;

  if (isLoading) {
    return (
      <div className="py-10 px-6 flex items-center justify-center">
        <SkewLoader />
      </div>
    );
  }

  return (
    <section>
      <MainContainer>
        <div className="py-10">
          <SectionTitle
            title="Our Products"
            subtitle="Our Uniq Products"
            parentStyle="text-black"
          />

          <div>
            {productsData?.length ? (
              <div>
                {/* product lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {productsData.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* pagination */}
                <div className="mt-5 text-right ml-auto flex items-center justify-end">
                  <Pagination
                    setPage={setPage}
                    metaData={
                      productMeta ?? {
                        limit: 0,
                        page: 0,
                        total: 0,
                        totalPage: 0,
                      }
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No products available</p>
              </div>
            )}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}

function ProductCard({ product }: { product: TProduct }) {
  return (
    <div
      key={product._id}
      className="flex flex-col items-center rounded-lg overflow-hidden bg-bgColor"
    >
      <div className="w-full text-[#fcdabd] font-medium">
        <figure className="text-brand text-base rounded-lg">
          <CustomImage
            src={product.thumbnail}
            alt={product.productTitle}
            className="h-48 w-full"
          />
        </figure>
        <div
          className={`${
            product?.ProductType?.type
              ? "flex items-center justify-between "
              : "float-right ml-auto text-right"
          }`}
        >
          <button
            className={`bg-brand text-white py-3 text-base px-4 ${
              product?.ProductType?.type
                ? "rounded-br-md"
                : "rounded-bl-md ml-auto"
            }`}
          >
            {heartIcon}
          </button>
          {product?.ProductType?.type && (
            <div className="text-end relative">
              <span className="text-white text-sm inline-block bg-brand py-2.5 px-4 rounded-bl-md">
                {product?.ProductType?.type}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className=" w-full rounded-b-lg px-3 py-2">
        <div className="grid grid-cols-2 gap-3 px-4">
          {/* <FeatureItem title="Brand" name={product.brand} />
          <FeatureItem title="Frame size" name={product.frameSize} />
          <FeatureItem title="Material" name={product.material} />
          <FeatureItem title="Torque" name={product.Torque} />
          <FeatureItem title="Color" name={product.color} />
          <FeatureItem title="Chain" name={product.Chain} />
          <FeatureItem title="Weight" name={product.weight} />
          <FeatureItem title="Price" name={product.price} /> */}
        </div>

        <div>
          <h4 className="text-sm text-brand"> {product.brandName}</h4>
          <h4 className="text-xl font-medium text-left text-white capitalize py-2">
            {product.productTitle}
          </h4>

          <p className="text-base text-white my-2">
            {shortParagraph(product.description, 30)}
          </p>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Link to={`/product/${product._id}`}>
          <Button className="w-full rounded-t-none">Show Now</Button>
        </Link>
      </div>
    </div>
  );
}

// function FeatureItem({ title, name }: { title: string; name: string }) {
//   return (
//     <p className="text-TextGray text-sm">
//       <span className="font-medium text-primary">{title}</span>:{" "}
//       <span className="text-primary/85 font-normal">{name}</span>
//     </p>
//   );
// }
