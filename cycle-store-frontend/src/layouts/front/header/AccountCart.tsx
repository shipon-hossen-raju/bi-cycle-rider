import useUser from "@/hooks/useUser";
import { Link } from "react-router";
import { cartIcon, loveIcon, userIcon } from "../../../assets/icons/globalIcon";

export default function AccountCart() {
  const user = useUser();
  const isUserRoute =
    user?.role === "user"
      ? "/account"
      : user?.role === "admin"
      ? "/dashboard"
      : "/login";

  return (
    <div className="">
      <div className="flex items-center gap-5">
        {/* card */}
        <figure className="text-gray-600 hover:text-gray-800">
          {cartIcon}
        </figure>

        {/* love icons */}
        <figure className="text-gray-600 hover:text-gray-800">
          {loveIcon}
        </figure>

        {/* account */}
        <div>
          <Link to={isUserRoute} className="text-gray-600 hover:text-gray-800">
            {userIcon}
          </Link>
        </div>
      </div>
    </div>
  );
}
