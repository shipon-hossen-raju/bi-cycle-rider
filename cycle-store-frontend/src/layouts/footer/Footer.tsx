import CustomImage from "../../components/Img";
import MainContainer from "../../components/MainContainer";

import logoImage from "../../assets/logo/Bike.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-black py-12">
        <MainContainer>
          <div className=" mb-8">
            <CustomImage src={logoImage} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">
                About Us
              </h2>
              <p className="text-gray-400">
                We are a team of designers and developers that create high
                quality HTML templates
              </p>
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">
                Contact Us
              </h2>
              <p className="text-gray-400">Dhalarchar, Aminpur, Pabna</p>
              <p className="text-gray-400">
                <a href="tel:+8801310861071">+8801310861071</a>
              </p>
              <p className="text-gray-400">
                <a href="mailto:msshipon234@gmail.com">msshipon234@gmail.com</a>
              </p>
            </div>
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">
                Newsletter
              </h2>
              <p className="text-gray-400">
                You can trust us. we only send promo offers, not a single spam.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full py-2 px-3 bg-gray-800 rounded-lg"
                />
                <button className="bg-brand text-white py-2 px-4 rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </MainContainer>
      </footer>
    </>
  );
}
