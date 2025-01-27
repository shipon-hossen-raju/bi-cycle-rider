import { plusIcon } from "@/assets/icons/dashboard.icons";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TBicycleData = {
  type: string;
  subtypes: string[];
};

const bicycleData: TBicycleData[] = [
  {
    type: "Road Bikes",
    subtypes: ["Racing Bikes", "Endurance Bikes", "Time Trial/Triathlon Bikes"],
  },
  {
    type: "Mountain Bikes",
    subtypes: [
      "Hardtail",
      "Full-Suspension",
      "Trail Bikes",
      "Downhill Bikes",
      "Fat Bikes",
    ],
  },
  { type: "Hybrid Bikes", subtypes: [] },
  { type: "Gravel/Adventure Bikes", subtypes: [] },
  { type: "Touring Bikes", subtypes: [] },
  { type: "Cyclocross Bikes", subtypes: [] },
  { type: "BMX Bikes", subtypes: ["Freestyle BMX", "Race BMX"] },
  { type: "Cruiser Bikes", subtypes: [] },
  { type: "Folding Bikes", subtypes: [] },
  {
    type: "Electric Bikes (e-Bikes)",
    subtypes: [
      "Electric Mountain Bikes (e-MTBs)",
      "Electric Road/Hybrid Bikes",
    ],
  },
  { type: "Fixed Gear Bikes (Fixies)", subtypes: [] },
  { type: "Recumbent Bikes", subtypes: [] },
  { type: "Tandem Bikes", subtypes: [] },
  { type: "Cargo Bikes", subtypes: [] },
  {
    type: "Kids' Bikes",
    subtypes: ["Training Wheels", "BMX-style", "Mountain Bikes"],
  },
];

const formSchema = z.object({
  productName: z.string().min(10, {
    message: "product name must be at least 10 characters.",
  }),
  productTitle: z.string({
    message: "Product title is required",
  }),
  description: z.string({
    message: "Description is required",
  }),
  image: z.string().optional(),
});

export default function AddProduct() {
  const [selectedBicycle, setSelectedBicycle] = useState<string | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [extraImage, setExtraImage] = useState<FileList | undefined>(undefined);

  console.log("thumbnail ", thumbnail);
  console.log("extraImage ", extraImage);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const subTypeData = bicycleData.find(
    (bicycle) => bicycle.type === selectedBicycle
  );

  const onSubmit = (data: any) => {
    const newProductData = {
      ...data,
      cycleType: {
        type: selectedBicycle,
        subType: subTypeData?.subtypes?.length ? selectedSubtype : null,
      },
    };
    console.log("newProductData ", newProductData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-6 col-span-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Product name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg"
                      placeholder="this a new product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Product Title</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg"
                      placeholder="Product title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Product description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about product"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />

            {/* type selector */}
            <div className="space-y-6">
              <FormItem>
                <FormLabel className="text-lg">Product type</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => setSelectedBicycle(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Bicycle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {bicycleData.map((bicycle) => (
                          <SelectItem key={bicycle.type} value={bicycle.type}>
                            {bicycle.type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-base" />
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

            <FormField
              control={form.control}
              name="pricesRegular"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-lg">Regular Price</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg"
                      placeholder="Regular Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricesSale"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-lg">Sale Price</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg"
                      placeholder="Sale Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Product tags</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product tags. exm: cycle,"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 space-y-6">
            <FormItem>
              <FormLabel className="text-lg">Product thumbnail image</FormLabel>
              <FormControl>
                <div className="relative">
                  <label
                    htmlFor="thumbnail"
                    className="text-lg cursor-pointer bg-gray-200 px-5 py-8 w-full text-center rounded-md border border-brand/50 flex flex-col items-center justify-center gap-5"
                  >
                    <figure>{plusIcon}</figure>
                    <span> Choose Image</span>
                  </label>
                  <Input
                    id="thumbnail"
                    type="file"
                    className="text-lg opacity-0 absolute cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setThumbnail(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-base" />
            </FormItem>

            <FormItem>
              <FormLabel className="text-lg">Product extra image</FormLabel>
              <FormControl>
                <div className="relative">
                  <label
                    htmlFor="extraImage"
                    className="text-lg cursor-pointer bg-gray-200 px-5 py-8 max-w-[250px] text-center rounded-md border border-brand/50 flex flex-col items-center justify-center gap-5"
                  >
                    <figure>{plusIcon}</figure>
                    <span> Choose Image</span>
                  </label>
                  <Input
                    id="extraImage"
                    type="file"
                    className="text-lg opacity-0 absolute inset-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setExtraImage(e.target.files || undefined);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-base" />
            </FormItem>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button className="ml-auto" type="submit">
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
