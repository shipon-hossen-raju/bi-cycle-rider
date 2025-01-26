import React, { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/Button";
import { Link } from "react-router";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";
// import { login } from "../features/auth/authSlice";

type TLogin = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof TLogin, string>>;

const Login: React.FC = () => {
  const [formData, setFormData] = useState<TLogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  //   const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("e", e);
    if (validate()) {
      // dispatch(login(formData));
      console.log("valid data ", formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

        <Input
          name="email"
          type="email"
          errors={errors}
          handleChange={handleChange}
          value={formData.email}
        />
        <Input
          name="password"
          type="password"
          errors={errors}
          handleChange={handleChange}
          value={formData.password}
        />

        <Link
          className="ml-auto text-right block mb-2 hover:text-blue-500"
          to="/forget-password"
        >
          Forget Password ?
        </Link>

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
