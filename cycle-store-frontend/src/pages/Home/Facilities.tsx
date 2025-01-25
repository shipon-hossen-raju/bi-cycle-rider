import {
  locationPointerIcon,
  powerBatteryIcon,
  powerYourRideIcon,
  watchTimeIcon,
} from "../../assets/icons/globalIcon";
import MainContainer from "../../components/MainContainer";

type TFacilitiesData = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
};

const facilitiesData: TFacilitiesData[] = [
  {
    id: "f-1",
    title: "GPS Tracking or anti-theft",
    description: "Checking the Proxy fire and configurations running",
    icon: locationPointerIcon,
  },
  {
    id: "f-2",
    title: "Super Charging Battery",
    description: "Checking the Proxy fire and configurations running",
    icon: powerBatteryIcon,
  },
  {
    id: "f-3",
    title: "Monitoring Speed Trip Status",
    description: "Checking the Proxy fire and configurations running",
    icon: watchTimeIcon,
  },
  {
    id: "f-4",
    title: "Power Your Ride Conditions",
    description: "Checking the Proxy fire and configurations running",
    icon: powerYourRideIcon,
  },
];

export default function Facilities() {
  return (
    <section className="bg-bgColor py-12">
      <MainContainer>
        <div className="text-center text-white">
          <h1 className="text-4xl font-extrabold mb-20">
            {" "}
            OUR FEATURES & FACILITIES{" "}
          </h1>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {facilitiesData.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col items-center bg-black px-9 py-10 rounded-lg"
                >
                  <figure className="bg-bgColor text-brand text-base p-4 rounded-lg">
                    {feature.icon}
                  </figure>
                  <h4 className="text-xl font-medium mt-6">{feature.title}</h4>
                  <p className="text-center text-TextGray mt-2">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
