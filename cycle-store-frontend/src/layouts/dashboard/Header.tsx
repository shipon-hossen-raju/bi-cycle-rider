import { bellIcon, userProfile } from "@/assets/icons/dashboard.icons";
import { toast } from "sonner";

export const Header = () => {
  const handleUser = () => {
    toast.success("Coming soon...", { duration: 2000 });
  };

  return (
    <header className="w-full bg-brand/5 border-b shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <div className="flex items-center space-x-4">
        <figure
          onClick={handleUser}
          className="text-3xl cursor-pointer hover:bg-slate-200 transition duration-300 py-1 px-1.5 rounded"
        >
          {bellIcon}
        </figure>
        <figure
          onClick={handleUser}
          className="text-3xl cursor-pointer hover:bg-slate-200 transition duration-300 py-1 px-1.5 rounded"
        >
          {userProfile}
        </figure>
      </div>
    </header>
  );
};
