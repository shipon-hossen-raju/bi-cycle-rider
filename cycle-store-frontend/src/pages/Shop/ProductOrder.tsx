import Button from "@/components/Button";
import Input from "@/components/form/Input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductOrderMutation } from "@/redux/features/payments/payment.api";
import { TProduct, TUser } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type TPaymentSystem = "online" | "cashOnDelivery";

type TOrderData = {
  name: string;
  phone: string;
  address: string;
  paymentSystem: TPaymentSystem;
  productId: string;
  userId: string;
};

type FormErrors = Partial<Record<keyof TOrderData, string>>;

interface ProductOrderProps {
  isOpenModal: boolean;
  setIsOpenModal: (isOpen: boolean) => void;
  product: TProduct;
  userData: TUser;
}

export default function ProductOrder({
  isOpenModal,
  setIsOpenModal,
  product,
  userData,
}: ProductOrderProps): JSX.Element {
  const navigate = useNavigate();

  if (!userData?._id) navigate("/login");

  const [formData, setFormData] = useState<TOrderData>({
    name: userData?.name,
    phone: userData?.phone,
    address: userData?.address,
    paymentSystem: "online",
    productId: product._id,
    userId: userData?._id!,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [productOrder] = useProductOrderMutation();

  const handleChangeRadio = (radioData: TPaymentSystem) => {
    setFormData({ ...formData, paymentSystem: radioData });
  };

  const handleSubmit = async () => {
    // form data validation
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // clear errors
    setErrors({});
    const toastId = toast.loading('Order Creating...')

    try {
      const orderResult = await productOrder(formData).unwrap();

      console.log("orderResult ", orderResult);

      toast.success( "Order Successful", { id: toastId });
      setIsOpenModal(false);
      // navigate("/order-success");
    } catch (error) {
      console.error("Order failed", error);
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("Order failed", { id: toastId });
      }
    }
  };

  return (
    <div>
      <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Please provide the details to order.
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div>
            <Input
              name="name"
              label="Name"
              errors={errors}
              handleChange={handleChange}
              value={formData.name}
            />
            <Input
              name="address"
              label="Delivery Location"
              errors={errors}
              handleChange={handleChange}
              value={formData.address}
            />
            <Input
              name="phone"
              label="Phone Number"
              errors={errors}
              handleChange={handleChange}
              value={formData.phone}
            />
            <div>
              <label
                htmlFor="onlinePayment"
                className="block text-gray-700 font-medium"
              >
                Payment system
              </label>
              <RadioGroup
                onValueChange={handleChangeRadio}
                className="mt-2.5"
                defaultValue={formData.paymentSystem}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="onlinePayment" />
                  <Label htmlFor="onlinePayment">Online Payment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cashOnDelivery" id="cashOnDelivery" />
                  <Label htmlFor="cashOnDelivery">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            {/* buttons */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <Button variant="outline" onClick={() => setIsOpenModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {formData.paymentSystem === "cashOnDelivery"
                  ? "Order Now"
                  : "Payment Now"}
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
