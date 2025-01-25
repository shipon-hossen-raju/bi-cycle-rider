import Button from "../../components/Button";
import CustomImage from "../../components/Img";
import MainContainer from "../../components/MainContainer";
import SectionTitle from "../../components/SectionTitle";
import fpImg1 from "/feature-product-1.png";
import fpImg2 from "/feature-product-2.png";
import fpImg3 from "/feature-product-3.png";
import fpImg4 from "/feature-product-4.png";
import fpImg5 from "/feature-product-5.png";
import fpImg6 from "/feature-product-6.png";

const featuredProducts = [
  {
    id: "fp-1",
    title: "Mondraker Chaser RX",
    brand: "Mondraker",
    frameSize: "51 cm",
    material: "Steel",
    Torque: "50 Nm - 70NM",
    color: "Violet",
    Chain: "Violet",
    weight: "26.8 kg",
    price: "$ 2,500",
    image: fpImg1,
    type: "e-bike",
  },
  {
    id: "fp-2",
    title: "Mondraker Chaser RX",
    brand: "Mondraker",
    frameSize: "51 cm",
    material: "Steel",
    Torque: "50 Nm - 70NM",
    color: "Violet",
    Chain: "Violet",
    weight: "26.8 kg",
    price: "$ 2,500",
    image: fpImg2,
    type: "e-bike",
  },
  {
    id: "fp-3",
    title: "Mondraker Chaser RX",
    brand: "Mondraker",
    frameSize: "51 cm",
    material: "Steel",
    Torque: "50 Nm - 70NM",
    color: "Violet",
    Chain: "Violet",
    weight: "26.8 kg",
    price: "$ 2,500",
    image: fpImg3,
    type: "e-bike",
  },
  {
    id: "fp-4",
    title: "Mondraker Chaser RX",
    brand: "Mondraker",
    frameSize: "51 cm",
    material: "Steel",
    Torque: "50 Nm - 70NM",
    color: "Violet",
    Chain: "Violet",
    weight: "26.8 kg",
    price: "$ 2,500",
    image: fpImg4,
    type: "e-bike",
  },
  {
    id: "fp-5",
    title: "Mondraker Chaser RX",
    brand: "Mondraker",
    frameSize: "51 cm",
    material: "Steel",
    Torque: "50 Nm - 70NM",
    color: "Violet",
    Chain: "Violet",
    weight: "26.8 kg",
    price: "$ 2,500",
    image: fpImg5,
    type: "e-bike",
  },
  {
    id: "fp-6",
    title: "Mondraker Chaser RX",
    brand: "Mondraker",
    frameSize: "51 cm",
    material: "Steel",
    Torque: "50 Nm - 70NM",
    color: "Violet",
    Chain: "Violet",
    weight: "26.8 kg",
    price: "$ 2,500",
    image: fpImg6,
    type: "e-bike",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-black py-12">
      <MainContainer>
        <div>
          <SectionTitle
            subtitle="OUR PRODUCTS"
            title="Featured Products"
            description="Ultra-premium components, engineered by Probike. The ultimate upgrade. Wherever you ride, we’ve got a bike for the joyrider in you"
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center rounded-lg overflow-hidden"
              >
                <div className="bg-bgColor py-7 w-full text-[#FFE8D4] font-medium flex items-center justify-center flex-col">
                  <figure className="text-brand text-base rounded-lg">
                    <CustomImage src={product.image} alt={product.title} />
                  </figure>
                  <h4 className="text-xl font-medium text-center mt-8">
                    {product.title}
                  </h4>
                </div>

                <div className="bg-white w-full rounded-b-lg">
                  <div className="text-end relative">
                    <span className="text-white inline-block bg-brand py-2.5 px-4">
                      {product.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-4 px-4">
                    <FeatureItem title="Brand" name={product.brand} />
                    <FeatureItem title="Frame size" name={product.frameSize} />
                    <FeatureItem title="Material" name={product.material} />
                    <FeatureItem title="Torque" name={product.Torque} />
                    <FeatureItem title="Color" name={product.color} />
                    <FeatureItem title="Chain" name={product.Chain} />
                    <FeatureItem title="Weight" name={product.weight} />
                    <FeatureItem title="Price" name={product.price} />
                  </div>

                  <Button className="w-full rounded-t-none">Show Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}

function FeatureItem({ title, name }: { title: string; name: string }) {
  return (
    <p className="text-TextGray text-sm">
      <span className="font-medium text-primary">{title}</span>:{" "}
      <span className="text-primary/85 font-normal">{name}</span>
    </p>
  );
}
