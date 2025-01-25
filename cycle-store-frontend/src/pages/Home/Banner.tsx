import { cyclePowerIcon } from "../../assets/icons/globalIcon";
import Button from "../../components/Button";
import CustomImage from "../../components/Img";
import MainContainer from "../../components/MainContainer";
import bannerImg2 from "/banner-bi-cycle-running.png";
import bannerImg1 from "/banner-bi-cycle.png";

export default function Banner() {
  return (
    <section className="bg-bgColor py-12">
      <MainContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" px-4">
            <h4 className="bg-gray text-white inline-block py-1 px-2 text-lg font-normal">
              Road Rage 2024
            </h4>
            <h1 className="font-bold text-6xl leading-[72px] text-TextGray mt-5">
              The bicycle <br /> Revolution
            </h1>
            <p className="text-TextGray text-lg font-normal mt-6">
              From sleek road bikes built for speed to rugged mountain bikes for
              off-road adventures our slider celebrates the diversity of cycling
              disciplines.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <Button>Show now</Button>
              <Button variant="secondary">Explore Products</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-end relative">
              <figure className="py-6 px-9 bg-black rounded-lg absolute left-0 top-1/2 -translate-y-1/2">
                <CustomImage src={bannerImg1} alt="Banner Image" />
              </figure>
              <div className="inline-flex flex-col gap-5 items-center mt-4 text-white pl-36 py-14 pr-20 bg-brand shadow-shadowPrimary text-center">
                <figure>{cyclePowerIcon}</figure>
                <h2 className="text-xl font-medium">
                  Fast Charging <br /> Support
                </h2>
              </div>
            </div>

            <div className="relative">
              <CustomImage src={bannerImg2} alt="Banner Image" />
              <div className="py-3 px-4 bg-white text-center space-y-1 rounded-lg border-2 border-brand absolute right-20 top-1/2 -translate-y-1/2">
                <h4 className="text-2xl font-semibold">45 KM</h4>
                <p className="font-normal text-base">PER HOUR</p>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
