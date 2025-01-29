import { bellIcon, userProfile } from "@/assets/icons/dashboard.icons";
import logoImage from "@/assets/logo/Bike.png";
import CustomImage from "@/components/Img";
import { Link } from "react-router";
import { toast } from "sonner";

export const Header = () => {
  const handleUser = () => {
    toast.success("Coming soon...", { duration: 2000 });
  };

  return (
    <header className="w-full bg-black/80 border-b shadow-md p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">
        <Link to="/">
          <CustomImage src={logoImage} />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <figure
          onClick={handleUser}
          className="text-3xl cursor-pointer hover:bg-brand text-white transition duration-300 py-1 px-1.5 rounded"
        >
          {bellIcon}
        </figure>
        <figure
          onClick={handleUser}
          className="text-3xl cursor-pointer hover:bg-brand text-white transition duration-300 py-1 px-1.5 rounded"
        >
          {userProfile}
        </figure>
      </div>
    </header>
  );
};
