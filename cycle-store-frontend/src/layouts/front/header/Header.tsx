import { Link } from "react-router";
import CustomImage from "@/components/Img";
import MainContainer from "@/components/MainContainer";
import logoImage from "@/assets/logo/Bike.png";
import AccountCart from "./AccountCart";
import NavItems from "./NavItems";

export default function Header() {
  // const

  return (
    <header className="bg-primary text-white py-3">
      <MainContainer>
        <div className="flex justify-between items-center">
          {/* logo area */}
          <div className="text-2xl font-bold">
            <Link to="/">
              <CustomImage src={logoImage} />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {/* nav links */}
            <NavItems />

            {/* account & card items */}
            <AccountCart />
          </div>
        </div>
      </MainContainer>
    </header>
  );
}
