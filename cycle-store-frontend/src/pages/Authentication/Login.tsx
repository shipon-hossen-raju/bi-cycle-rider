import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import Button from "../../components/Button";
import Input from "../../components/form/Input";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

type TLogin = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof TLogin, string>>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TLogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const toastId = toast.loading("Logging in");

    try {
      console.log('formData ', formData)
      const result = await login(formData).unwrap();
      const data = result?.data;
      const user = verifyToken(data.accessToken);

      dispatch(setUser({ user, token: data.accessToken }));

      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      console.log("error ", error);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

          <Input
            name="email"
            type="email"
            label="Email"
            errors={errors}
            handleChange={handleChange}
            value={formData.email}
          />
          <Input
            name="password"
            type="password"
            label="Password"
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

        <Link
          className="text-left block mt-2 hover:text-blue-500"
          to="/registration"
        >
          Registration Now?
        </Link>
      </div>
    </div>
  );
};

export default Login;
