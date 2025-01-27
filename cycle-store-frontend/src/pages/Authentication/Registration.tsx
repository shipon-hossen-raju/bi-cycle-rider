import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import Button from "../../components/Button";
import Input from "../../components/form/Input";
import { useRegistrationMutation } from "../../redux/features/auth/authApi";
import { setUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";
// import { login } from "../features/auth/authSlice";

type TRegistration = {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};

// const defaultData = {
//   name: "Jane Smith",
//   email: "jane2.smith@example.com",
//   password: "securePass@123",
//   phone: "+1987654321",
//   address: "456 Elm Street, Shelbyville, USA",
// };

type FormErrors = Partial<Record<keyof TRegistration, string>>;

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<TRegistration>({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useAppDispatch();
  const [registration] = useRegistrationMutation();
  const navigate = useNavigate();

  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.address) {
      newErrors.address = "Address is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const toastId = toast.loading("Registering...!");
    console.log("valid data ", formData);

    try {
      const result = await registration(formData).unwrap();
      console.log("result ", result);
      const data = result?.data;
      const user = verifyToken(data.accessToken);

      dispatch(setUser({ user, token: data.accessToken }));

      console.log("user ", user);
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
      toast.success("user created successful", { id: toastId, duration: 2000 });
    } catch (err) {
      console.log("err ", err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Registration
          </h2>

          <Input
            name="name"
            label="Name"
            errors={errors}
            handleChange={handleChange}
            value={formData.name}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            errors={errors}
            handleChange={handleChange}
            value={formData.email}
          />
          <Input
            name="phone"
            label="Phone Number"
            type="number"
            errors={errors}
            handleChange={handleChange}
            value={formData.phone}
          />
          <Input
            name="address"
            label="Address"
            errors={errors}
            handleChange={handleChange}
            value={formData.address}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            errors={errors}
            handleChange={handleChange}
            value={formData.password}
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Registration
          </Button>
        </form>

        <p className="mt-2">
          {" "}
          I have already account{" "}
          <Link className="ml-4 text-left hover:text-blue-500" to="/login">
            Login?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
