import Button from "../../components/Button";
import CustomImage from "../../components/Img";
import MainContainer from "../../components/MainContainer";
import bestCycle from "/best-selling.png";

export default function BestSell() {
  return (
    <section className="py-12">
      <MainContainer>
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-20">
            Best Sellers Products <br /> This Weeks
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-[5px] shadow-shadowPrimary overflow-hidden">
              <div className="bg-brand py-8 space-y-4">
                <h3 className="text-center text-2xl font-semibold">
                  The Most Popular Bike <br /> Of The Season
                </h3>

                <Button variant="secondary"> Show More</Button>
              </div>

              <div className="col-span-2 px-5 py-8 space-y-3 text-left">
                <h4 className="text-xl font-semibold text-brand">
                  {" "}
                  The Most Popular
                </h4>
                <h1 className="text-4xl font-semibold">
                  Want To Take Cycling <br /> To The Next Level{" "}
                </h1>
                <p className="text-xl font-normal text-black">
                  Be create and organized to find more time to ride.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-bgColor flex items-end justify-between col-span-2 p-11">
              <div className="text-left max-w-[245px]">
                <h2 className="text-3xl font-extrabold text-[#FFCDA9] mb-4">
                  Super Deluxe <br /> Tandem 7i
                </h2>

                <p className="text-sm font-normal text-white mb-16">
                  LIghtweight 16-inch steel frame is the perfect bike for rides
                  around your neighborhood or trails.
                </p>

                <Button variant="primary">Show More</Button>
              </div>

              <div className="w-full">
                <figure className="flex items-end justify-end">
                  <CustomImage src={bestCycle} alt="bike" />
                </figure>
                <div className="flex items-center justify-between mt-10">
                  <div>
                    <h5 className="text-lg font-normal text-[#f6f6f6]">
                      Fork Travel{" "}
                    </h5>
                    <p className="text-lg font-bold text-[#f6f6f6]">204mm</p>
                  </div>
                  <div>
                    <h5 className="text-lg font-normal text-[#f6f6f6]">
                      Material{" "}
                    </h5>
                    <p className="text-lg font-bold text-[#f6f6f6]">Carbon</p>
                  </div>
                  <div>
                    <h5 className="text-lg font-normal text-[#f6f6f6]">
                      Weight{" "}
                    </h5>
                    <p className="text-lg font-bold text-[#f6f6f6]">55.5 KG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
