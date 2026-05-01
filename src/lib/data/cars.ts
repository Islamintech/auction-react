import { AuctionCar } from "../types/landing";

export const MOCK_CARS: AuctionCar[] = [
  {
    id: "AX-1042", year: 2021, model: "GV80 3.5T", make: "Genesis",
    price: 38900, category: "crashed", damage: "front-left",
    fuel: "Gasoline", trans: "Auto", km: 32400,
    parts: [
      { name: "Front bumper", price: 820, oem: "86511-T6000", ship: true },
      { name: "Headlight L", price: 1100, oem: "92101-T6100", ship: true },
      { name: "Hood", price: 640, oem: "66400-T6000", ship: true },
    ],
    image: "suv-a", color: "Vik Black",
    damageDesc: "Front-left collision. Bumper, hood, and left headlight assembly affected. Frame measurements within tolerance — straight pull confirmed.",
  },
  {
    id: "AX-1043", year: 2022, model: "Palisade Calligraphy", make: "Hyundai",
    price: 32400, category: "crashed", damage: "rear",
    fuel: "Gasoline", trans: "Auto", km: 28100,
    parts: [
      { name: "Rear bumper", price: 540, oem: "86611-S8000", ship: true },
      { name: "Trunk lid", price: 700, oem: "69200-S8000", ship: false },
    ],
    image: "suv-c", color: "Creamy White",
    damageDesc: "Rear-end collision. Bumper and trunk lid require replacement. No frame damage; rear floor pan inspected and OK.",
  },
  {
    id: "AX-1044", year: 2020, model: "K5 GT-Line", make: "Kia",
    price: 14900, category: "crashed", damage: "side",
    fuel: "Gasoline", trans: "Auto", km: 61200,
    parts: [
      { name: "Door RR", price: 320, oem: "77004-L3000", ship: true },
      { name: "Quarter panel", price: 480, oem: "71504-L3000", ship: true },
    ],
    image: "sedan-b", color: "Snow White Pearl",
    damageDesc: "Right-side impact. Rear door and quarter panel scheduled for replacement. Frame straight, suspension intact.",
  },
  { id: "AX-2001", year: 2022, model: "G80", make: "Genesis", price: 41200, category: "ready", fuel: "Gasoline", trans: "Auto", km: 24300, image: "sedan-a", color: "Carbon Metal" },
  { id: "AX-2002", year: 2021, model: "Sonata", make: "Hyundai", price: 19800, category: "ready", fuel: "Hybrid", trans: "Auto", km: 38900, image: "sedan-c", color: "Phantom Black" },
  { id: "AX-2003", year: 2023, model: "Sportage Hybrid", make: "Kia", price: 27600, category: "ready", fuel: "Hybrid", trans: "Auto", km: 12100, image: "suv-a", color: "Aurora Black" },
  { id: "AX-2004", year: 2022, model: "GV70", make: "Genesis", price: 36400, category: "ready", fuel: "Gasoline", trans: "Auto", km: 19800, image: "suv-c", color: "Uyuni White" },
  { id: "AX-2005", year: 2023, model: "Ioniq 6 LR", make: "Hyundai", price: 46200, category: "ready", fuel: "Electric", trans: "Auto", km: 8400, image: "sedan-b", color: "Gravity Gold Matte" },
  { id: "AX-2006", year: 2022, model: "EV6 GT-Line", make: "Kia", price: 42800, category: "ready", fuel: "Electric", trans: "Auto", km: 15600, image: "sedan-a", color: "Carbon Metal" },
  { id: "AX-2007", year: 2021, model: "Rexton", make: "KG Mobility", price: 23400, category: "ready", fuel: "Diesel", trans: "Auto", km: 41200, image: "suv-c", color: "Iron Metal" },
];
