import Accessories from "./Accessories";
import Banner from "./Banner";
import BestSell from "./BestSell";
import Categories from "./Categories";
import Facilities from "./Facilities";
import FeaturedProducts from "./FeaturedProducts";

export default function Home() {
  return (
    <>
      <Banner />
      <Facilities />
      <BestSell />
      <Categories />
      <FeaturedProducts />
      <Accessories />
    </>
  );
}
