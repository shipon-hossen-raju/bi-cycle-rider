import { Home, User, Settings } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { adminNavItems } from "@/constants/navItems";
import { adminNavItemsGenerators } from "@/generators/navItems.generators";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import Button from "@/components/Button";

export const Sidebar = () => {
  const navData = adminNavItemsGenerators(adminNavItems);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      dispatch(logout());
      navigate("/login");
    }
  }, [user]);

  const handleLogout = () => dispatch(logout());

  console.log("navData", navData);

  return (
    <div className="w-64 bg-brand/5 border-r shadow-md flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold">Admin Dashboard</div>

        <nav className="flex flex-col space-y-2 px-4">
          {navData.map((item) => (
            <Link
              to={item.path}
              key={item.id}
              className="flex items-center gap-3 text-xl hover:bg-brand/90 hover:text-white px-2 py-1 rounded transition duration-300 "
            >
              <figure>{item.icon}</figure>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <Button className="rounded-b-none" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
