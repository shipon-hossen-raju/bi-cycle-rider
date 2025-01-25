import Button from "../../components/Button";
import CustomImage from "../../components/Img";
import MainContainer from "../../components/MainContainer";
import kidsCycleImg from "/categories-kids-cycle.png";
import gearImg from "/chaine-or-gear.png";

export default function Categories() {
  return (
    <section className="bg-bgColor py-12">
      <MainContainer>
        <div>
          <div className="text-center text-white max-w-[867px] mx-auto mb-14">
            <h6 className="text-sm font-medium tracking-[4.32px] text-brand">
              YOUR RIDE START HERE
            </h6>
            <h1 className="text-4xl font-semibold mt-2 mb-9">Our Categories</h1>
            <p className="">
              Our road bikes are built for speed, with lightweight frames and
              aerodynamic features that slice Through the air effortlessly. Feel
              the rush as you pedal along the open road.
            </p>
          </div>

          <div className="flex items-center justify-between text-white gap-x-7 gap-y-6">
            <div className="flex flex-col items-center bg-white text-black p-8 rounded-lg">
              <h2 className="text-5xl font-semibold">KIDS BIKES </h2>
              <p className="text-xl font-medium">
                Close-out pricing on dozens of products
              </p>
              <CustomImage src={kidsCycleImg} />
              <Button> Shop Now </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center bg-white text-black border-2 border-white rounded-lg">
                <div className="bg-white p-8">
                  <h2 className="text-3xl font-semibold"> ACCESSORIES </h2>
                  <p className="mt-2 mb-10">
                    Close-out pricing on dozens of products
                  </p>

                  <Button variant="outline"> Shop Now </Button>
                </div>
                <figure className="rounded-r-lg overflow-hidden">
                  <CustomImage src={gearImg} />
                </figure>
              </div>

              <div className="flex items-center bg-white text-black border-2 border-white rounded-lg">
                <div className="bg-white p-8">
                  <h2 className="text-3xl font-semibold"> ACCESSORIES </h2>
                  <p className="mt-2 mb-10">
                    Close-out pricing on dozens of products
                  </p>

                  <Button variant="outline"> Shop Now </Button>
                </div>
                <figure className="rounded-r-lg overflow-hidden">
                  <CustomImage src={gearImg} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
