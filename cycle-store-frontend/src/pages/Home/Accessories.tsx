import { ratingStarFullIcon } from "../../assets/icons/globalIcon";
import MainContainer from "../../components/MainContainer";
import SectionTitle from "../../components/SectionTitle";

const accessoriesData = [
  {
    id: "accessories-1",
    type: "accessories",
    title: "Lightweight Helmets",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-2",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-3",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-4",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-5",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-6",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-7",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
  {
    id: "accessories-8",
    type: "accessories",
    title: "Bike Lock",
    description: "Close-out pricing on dozens of products",
    image: "/bike-lock.png",
    weight: "1.1 kg",
    price: "$ 50",
    rating: 4,
  },
];

export default function Accessories() {
  return (
    <section className="py-20">
      <MainContainer>
        <SectionTitle
          subtitle="parts & accessories"
          title="Shop Gear & Accessories"
          description="Load up and head out. Explore the route less traveled  or accelerate your daily routine with one of these rugged, versatile e-bikes"
        />

        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {accessoriesData.map((accessory) => (
              <div key={accessory.id} className="bg-white rounded-lg shadow-lg">
                <figure>
                  <img
                    src={accessory.image}
                    alt={accessory.title}
                    className="w-full h-60 object-cover object-center rounded-t-lg"
                  />
                </figure>
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{accessory.title}</h2>
                  <p className="mt-2 mb-4">{accessory.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">{accessory.price}</p>
                    <div className="flex items-center gap-1">
                      <figure className="w-5 h-5 text-yellow-400">
                        {ratingStarFullIcon}
                      </figure>
                      <span>{accessory.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
