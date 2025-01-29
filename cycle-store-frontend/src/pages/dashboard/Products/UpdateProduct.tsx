import { closeIcon, plusIcon } from "@/assets/icons/dashboard.icons";
import { loadingSpinAnimIcon } from "@/assets/icons/globalIcon";
import Button from "@/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bicycleTypeData } from "@/constants/admin";
import { useAddProductMutation } from "@/redux/features/admin/productApi.admin";
import { uploadImage } from "@/utils/uploadsImage";
import { addProductFormSchema } from "@/validations/admin.validation.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { productsTabIndex } from "./ProductsConstant";
import { TProduct } from "@/types";

type TAddProductProps = {
  setIsProduct: (value: string) => void;
  productData: TProduct | {};
};

export default function UpdateProduct({
  setIsProduct,
  productData,
}: TAddProductProps) {
  const [isError, setIsError] = useState<{
    cycleType?: string;
    thumbnail?: string;
    extraImage?: string;
    productStatus?: string;
  }>({});
  const [selectedBicycle, setSelectedBicycle] = useState<string | null>(null);
  const [productStatus, setProductStatus] = useState<string | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [extraImage, setExtraImage] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addProduct] = useAddProductMutation(undefined);

  console.log("productData", productData);

  const form = useForm({
    resolver: zodResolver(addProductFormSchema),
  });

  const subTypeData = bicycleTypeData.find(
    (bicycle) => bicycle.type === selectedBicycle
  );

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    if (!selectedBicycle) {
      setIsError({ ...isError, cycleType: "Please select a bicycle type" });
    }
    if (!productStatus) {
      setIsError({
        ...isError,
        productStatus: "Please select a product status",
      });
    }
    if (!thumbnail) {
      setIsError({ ...isError, thumbnail: "Please upload a thumbnail image" });
    }
    if (!extraImage) {
      setIsError({
        ...isError,
        extraImage: "Please upload a extraImage image",
      });
    }

    if (
      isError.cycleType ||
      isError.extraImage ||
      isError.thumbnail ||
      isError.productStatus === null
    ) {
      setIsLoading(false);
      return;
    }
    const toastId = toast.loading("Product Creating...");

    const thumbnailUrl = await uploadImage(thumbnail!);
    const extraImageUrls = [];
    if (extraImage && extraImage.length > 0) {
      for (const image of extraImage) {
        const imgUrl = await uploadImage(image);
        extraImageUrls.push(imgUrl);
      }
    }
    const newProductData = {
      brandName: data.brandName,
      productName: data.productName,
      productTitle: data.productTitle,
      description: data.description,
      productType: {
        type: selectedBicycle,
        subType: subTypeData?.subtypes?.length ? selectedSubtype : null,
      },
      prices: {
        regular: data.pricesRegular,
        sale: data.pricesSale,
      },
      thumbnail: thumbnailUrl,
      extraImages: extraImageUrls,
      productStatus,
      quantity: data.quantity,
    };

    try {
      const result = await addProduct(newProductData).unwrap();
      setIsLoading(false);

      toast.success(result?.message || "Product Created Success", {
        id: toastId,
      });
      setIsProduct(productsTabIndex.show as string);
      setProductStatus(null);
      setSelectedBicycle(null);
      setSelectedSubtype(null);
      setThumbnail(null);
      setExtraImage(null);
    } catch (err) {
      // console.log(err);
      setIsLoading(false);
      toast.error("Product Creating Failed!", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-6 col-span-2">
            {/* brand name */}
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Brand name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="this a new product name"
                      // value={field.value || ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* product name */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Product name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="this a new product name"
                      // value={field.value || ""}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Product title */}
            <FormField
              control={form.control}
              name="productTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Product Title</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="Product title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Product description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about product"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* type selector */}
            <div className="space-y-6">
              <FormItem>
                <FormLabel className="text-base">Product type</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => setSelectedBicycle(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Bicycle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {bicycleTypeData.map((bicycle) => (
                          <SelectItem key={bicycle.type} value={bicycle.type}>
                            {bicycle.type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm">
                  {" "}
                  {isError["cycleType"]}{" "}
                </FormMessage>
              </FormItem>

              {/* Subtype Selector */}
              {subTypeData?.subtypes?.length ? (
                <Select onValueChange={(value) => setSelectedSubtype(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Subtype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subTypeData?.subtypes.map((subtype) => (
                        <SelectItem key={subtype} value={subtype}>
                          {subtype}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : null}
            </div>

            {/* prices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pricesRegular"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-base">Regular Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-base"
                        placeholder="Regular Price"
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricesSale"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-base">Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        placeholder="Sale Price"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>

            {/* product quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-base">Product Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      placeholder="Product quantity"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Product tags</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product tags. exm: cycle, bike"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="text-base">Product Status</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => setProductStatus(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Product Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem key={"bicycle.active"} value={"active"}>
                        Active
                      </SelectItem>
                      <SelectItem key={"bicycle.inactive"} value={"inactive"}>
                        inactive
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-sm">
                {isError["cycleType"]}{" "}
              </FormMessage>
            </FormItem>
          </div>

          <div className="col-span-2 space-y-6">
            <FormItem>
              <FormLabel
                className={`text-base ${
                  isError.thumbnail ? "text-destructive" : ""
                }`}
              >
                Product thumbnail image
              </FormLabel>
              <FormControl>
                <div>
                  {!thumbnail ? (
                    <div className="relative">
                      <label
                        htmlFor="thumbnail"
                        className="text-base cursor-pointer bg-gray-200 px-5 py-8 w-full text-center rounded-md border border-brand/50 flex flex-col items-center justify-center gap-5"
                      >
                        <figure>{plusIcon}</figure>
                        <span> Choose Image</span>
                      </label>
                      <Input
                        id="thumbnail"
                        type="file"
                        className="text-base opacity-0 absolute cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setIsError({ ...isError, thumbnail: "" });
                            setThumbnail(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mt-4 relative">
                      <img
                        src={URL.createObjectURL(thumbnail)}
                        alt="Thumbnail Preview"
                        className="w-full h-auto rounded-md"
                      />
                      <figure
                        onClick={() => setThumbnail(null)}
                        className="p-1.5 bg-red-300/40 rounded absolute top-4 right-4 transition duration-300 hover:bg-red-500 cursor-pointer text-2xl"
                      >
                        {closeIcon}
                      </figure>
                    </div>
                  )}
                </div>
              </FormControl>
              <p className="font-normal text-destructive text-sm">
                {isError["thumbnail"]}
              </p>
            </FormItem>

            {/* extra images */}
            <FormItem>
              <FormLabel
                className={`text-base ${
                  isError.extraImage ? "text-destructive" : ""
                }`}
              >
                Product extra image
              </FormLabel>
              <FormControl>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {extraImage &&
                    extraImage.map((file, index) => (
                      <div key={`extra${index}`} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Extra Image Preview ${index + 1}`}
                          className="w-full h-auto rounded-md"
                        />

                        <figure
                          onClick={() => {
                            setIsError({ ...isError, extraImage: "" });
                            const newExtraImages = extraImage.filter(
                              (_, i) => i !== index
                            );
                            setExtraImage(newExtraImages);
                          }}
                          className="p-1.5 bg-red-300/40 rounded absolute top-4 right-4 transition duration-300 hover:bg-red-500 cursor-pointer text-2xl"
                        >
                          {closeIcon}
                        </figure>
                      </div>
                    ))}

                  <div className="relative">
                    <label
                      htmlFor="extraImage"
                      className="text-base cursor-pointer bg-gray-200 px-5 py-8 min-h-[200px] h-min w-full text-center rounded-md border border-brand/50 flex flex-col items-center justify-center gap-5"
                    >
                      <figure>{plusIcon}</figure>
                      <span> Choose Image</span>
                    </label>
                    <Input
                      id="extraImage"
                      type="file"
                      multiple={true}
                      className="text-base opacity-0 absolute inset-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files) {
                          setIsError({ ...isError, extraImage: "" });
                          setExtraImage([
                            ...(extraImage || []),
                            ...Array.from(e.target.files || []),
                          ]);
                        }
                      }}
                    />
                  </div>
                </div>
              </FormControl>

              <p className="font-normal text-destructive text-sm">
                {isError["extraImage"]}
              </p>
            </FormItem>
          </div>
        </div>

        <div className="flex items-center justify-end gap-6">
          <Button
            disabled={isLoading}
            onClick={() => setIsProduct(productsTabIndex.show as string)}
            className="!py-2 !px-1 text-semibold"
            variant="outline"
            type="submit"
          >
            Cancel Product
          </Button>

          <Button
            disabled={isLoading}
            className="!py-2 !px-1 text-semibold"
            type="submit"
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-3">
                {loadingSpinAnimIcon}
                <span>Creating...</span>
              </span>
            ) : (
              <span> Create Product </span>
            )}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
