type TBicycleTypeData = {
  type: string;
  subtypes: string[];
};

export const bicycleTypeData: TBicycleTypeData[] = [
  {
    type: "Road Bikes",
    subtypes: ["Racing Bikes", "Endurance Bikes", "Time Trial/Triathlon Bikes"],
  },
  {
    type: "Mountain Bikes",
    subtypes: [
      "Hardtail",
      "Full-Suspension",
      "Trail Bikes",
      "Downhill Bikes",
      "Fat Bikes",
    ],
  },
  { type: "Hybrid Bikes", subtypes: [] },
  { type: "Gravel/Adventure Bikes", subtypes: [] },
  { type: "Touring Bikes", subtypes: [] },
  { type: "Cyclocross Bikes", subtypes: [] },
  { type: "BMX Bikes", subtypes: ["Freestyle BMX", "Race BMX"] },
  { type: "Cruiser Bikes", subtypes: [] },
  { type: "Folding Bikes", subtypes: [] },
  {
    type: "Electric Bikes (e-Bikes)",
    subtypes: [
      "Electric Mountain Bikes (e-MTBs)",
      "Electric Road/Hybrid Bikes",
    ],
  },
  { type: "Fixed Gear Bikes (Fixies)", subtypes: [] },
  { type: "Recumbent Bikes", subtypes: [] },
  { type: "Tandem Bikes", subtypes: [] },
  { type: "Cargo Bikes", subtypes: [] },
  {
    type: "Kids' Bikes",
    subtypes: ["Training Wheels", "BMX-style", "Mountain Bikes"],
  },
];
