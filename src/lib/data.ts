import imgPhone from "@/assets/product-phone.jpg";
import imgLaptop from "@/assets/product-laptop.jpg";
import imgTv from "@/assets/product-tv.jpg";
import imgHeadphones from "@/assets/product-headphones.jpg";
import imgFridge from "@/assets/product-fridge.jpg";
import imgWasher from "@/assets/product-washer.jpg";
import imgConsole from "@/assets/product-console.jpg";
import imgWatch from "@/assets/product-watch.jpg";
import imgPowerbank from "@/assets/product-powerbank.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  image: string;
  seller: string;
  verified: boolean;
  stock: number;
  flashDeal?: boolean;
  description: string;
  specs: Record<string, string>;
}

export const formatETB = (n: number) => `Br ${n.toLocaleString("en-US")}`;

export const CITIES = [
  "Addis Ababa",
  "Jimma",
  "Hawassa",
  "Adama",
  "Bahir Dar",
  "Dire Dawa",
  "Mekelle",
];

export const CATEGORIES = [
  { name: "Phones & Tablets", icon: "📱" },
  { name: "Computers & Laptops", icon: "💻" },
  { name: "TVs & Entertainment", icon: "📺" },
  { name: "Audio & Accessories", icon: "🎧" },
  { name: "Home Appliances", icon: "🏠" },
  { name: "Fashion", icon: "👕" },
  { name: "Shoes", icon: "👟" },
  { name: "Furniture", icon: "🪑" },
  { name: "Electronics", icon: "🔌" },
  { name: "Tools & Equipment", icon: "🛠️" },
  { name: "Automotive", icon: "🚗" },
  { name: "Other Products", icon: "📦" },
];

export const PRODUCTS: Product[] = [
  {
    id: "nova-x5-pro",
    name: "Nova X5 Pro Smartphone 256GB",
    brand: "Nova",
    price: 48999,
    oldPrice: 56500,
    rating: 4.7,
    reviews: 312,
    location: "Addis Ababa",
    category: "Phones & Tablets",
    image: imgPhone,
    seller: "Merkato Official Store",
    verified: true,
    stock: 14,
    flashDeal: true,
    description:
      "Flagship performance with a 108MP triple camera, 6.7\" AMOLED 120Hz display, 5G, and all-day 5,200mAh battery with 65W fast charging.",
    specs: { Display: '6.7" AMOLED 120Hz', Storage: "256GB / 12GB RAM", Camera: "108MP + 12MP + 8MP", Battery: "5,200mAh, 65W", Network: "5G Dual SIM" },
  },
  {
    id: "airbook-14",
    name: "AirBook 14 Ultrabook Laptop",
    brand: "AirBook",
    price: 92500,
    oldPrice: 104000,
    rating: 4.8,
    reviews: 187,
    location: "Addis Ababa",
    category: "Computers & Laptops",
    image: imgLaptop,
    seller: "TechHub Ethiopia",
    verified: true,
    stock: 8,
    description:
      "Featherlight 14\" laptop with latest-gen processor, 16GB RAM, 512GB SSD and 18-hour battery — built for work and study anywhere.",
    specs: { Processor: "12-core, up to 4.8GHz", Memory: "16GB RAM", Storage: "512GB NVMe SSD", Display: '14" 2.2K IPS', Weight: "1.29kg" },
  },
  {
    id: "vision-55-qled",
    name: 'Vision 55" 4K QLED Smart TV',
    brand: "Vision",
    price: 68900,
    oldPrice: 84900,
    rating: 4.6,
    reviews: 243,
    location: "Adama",
    category: "TVs & Entertainment",
    image: imgTv,
    seller: "Merkato Official Store",
    verified: true,
    stock: 5,
    flashDeal: true,
    description:
      "Cinema-grade 4K QLED panel with HDR10+, Dolby Audio, built-in streaming apps and voice remote.",
    specs: { Screen: '55" QLED 4K', HDR: "HDR10+ / Dolby Vision", Audio: "Dolby Audio 20W", Smart: "Built-in streaming apps", Ports: "3x HDMI, 2x USB" },
  },
  {
    id: "sonicpro-anc",
    name: "SonicPro ANC Wireless Headphones",
    brand: "SonicPro",
    price: 8450,
    oldPrice: 12900,
    rating: 4.5,
    reviews: 521,
    location: "Addis Ababa",
    category: "Audio & Accessories",
    image: imgHeadphones,
    seller: "SoundWave ET",
    verified: false,
    stock: 32,
    flashDeal: true,
    description:
      "Active noise cancellation, 40-hour battery, plush memory-foam earcups and crystal-clear calls.",
    specs: { ANC: "Hybrid Active Noise Cancellation", Battery: "40 hours", Bluetooth: "5.3", Charging: "USB-C fast charge", Weight: "248g" },
  },
  {
    id: "frost-520-fridge",
    name: "FrostCool 520L Double-Door Refrigerator",
    brand: "FrostCool",
    price: 119000,
    rating: 4.4,
    reviews: 96,
    location: "Hawassa",
    category: "Home Appliances",
    image: imgFridge,
    seller: "HomeLine Appliances",
    verified: true,
    stock: 6,
    description:
      "Spacious 520L family refrigerator with inverter compressor, water dispenser and 10-year compressor warranty.",
    specs: { Capacity: "520 litres", Compressor: "Inverter, 10-yr warranty", Dispenser: "Water dispenser", Energy: "A++ rating", Finish: "Brushed silver" },
  },
  {
    id: "washmaster-9kg",
    name: "WashMaster 9kg Front-Load Washer",
    brand: "WashMaster",
    price: 74500,
    oldPrice: 82000,
    rating: 4.6,
    reviews: 134,
    location: "Addis Ababa",
    category: "Home Appliances",
    image: imgWasher,
    seller: "HomeLine Appliances",
    verified: true,
    stock: 9,
    description:
      "9kg front-load washing machine with steam wash, 15 programs and whisper-quiet inverter motor.",
    specs: { Capacity: "9kg", Programs: "15 wash programs", Motor: "Inverter direct drive", "Spin speed": "1,400 RPM", Feature: "Steam hygiene wash" },
  },
  {
    id: "playbox-5",
    name: "PlayBox 5 Gaming Console + Controller",
    brand: "PlayBox",
    price: 56000,
    rating: 4.9,
    reviews: 408,
    location: "Addis Ababa",
    category: "Electronics",
    image: imgConsole,
    seller: "GameZone ET",
    verified: true,
    stock: 11,
    description:
      "Next-gen gaming console with 1TB SSD, ray tracing, 4K/120fps gaming and one wireless controller included.",
    specs: { Storage: "1TB SSD", Resolution: "Up to 4K @ 120fps", "Ray tracing": "Yes", Included: "1x wireless controller", Online: "Online multiplayer ready" },
  },
  {
    id: "pulse-s2-watch",
    name: "Pulse S2 Smartwatch",
    brand: "Pulse",
    price: 12750,
    oldPrice: 15900,
    rating: 4.3,
    reviews: 276,
    location: "Bahir Dar",
    category: "Electronics",
    image: imgWatch,
    seller: "TechHub Ethiopia",
    verified: true,
    stock: 21,
    flashDeal: true,
    description:
      "AMOLED smartwatch with heart-rate, SpO2, GPS, 100+ sport modes and 14-day battery life.",
    specs: { Display: '1.43" AMOLED', Battery: "14 days typical", GPS: "Built-in dual-band", Health: "HR, SpO2, sleep", "Water resistance": "5 ATM" },
  },
  {
    id: "volt-20000",
    name: "VoltCore 20,000mAh Power Bank",
    brand: "VoltCore",
    price: 2890,
    oldPrice: 3600,
    rating: 4.4,
    reviews: 689,
    location: "Dire Dawa",
    category: "Audio & Accessories",
    image: imgPowerbank,
    seller: "SoundWave ET",
    verified: false,
    stock: 58,
    description:
      "20,000mAh high-capacity power bank with 22.5W fast charging and dual USB outputs — perfect for travel.",
    specs: { Capacity: "20,000mAh", Output: "22.5W fast charge", Ports: "2x USB-A, 1x USB-C", Display: "LED charge indicator", Weight: "356g" },
  },
];

export interface ServiceCategory {
  name: string;
  icon: string;
  providers: number;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { name: "Electronics Repair", icon: "🔧", providers: 42 },
  { name: "Computer Services", icon: "💻", providers: 35 },
  { name: "Phone Repair", icon: "📱", providers: 58 },
  { name: "Car Services", icon: "🚗", providers: 27 },
  { name: "Home Services", icon: "🏠", providers: 49 },
  { name: "Delivery Services", icon: "🚚", providers: 31 },
  { name: "Photography", icon: "📷", providers: 19 },
  { name: "Design Services", icon: "🎨", providers: 23 },
  { name: "Freelance / IT", icon: "🖥️", providers: 44 },
  { name: "Cleaning Services", icon: "🧹", providers: 26 },
  { name: "Construction & Maintenance", icon: "🔨", providers: 33 },
  { name: "Education & Tutoring", icon: "📚", providers: 38 },
];

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  verified: boolean;
  initials: string;
  description: string;
}

export const PROVIDERS: ServiceProvider[] = [
  { id: "fixit-mobile", name: "FixIt Mobile Clinic", category: "Phone Repair", location: "Addis Ababa · Bole", rating: 4.8, reviews: 412, startingPrice: 350, verified: true, initials: "FI", description: "Same-day screen, battery and board-level repair for all major phone brands. 90-day warranty on parts." },
  { id: "addis-techcare", name: "Addis TechCare", category: "Computer Services", location: "Addis Ababa · Piassa", rating: 4.7, reviews: 268, startingPrice: 500, verified: true, initials: "AT", description: "Laptop & desktop repair, upgrades, data recovery, networking and office IT support." },
  { id: "lenslight", name: "Lens & Light Studio", category: "Photography", location: "Addis Ababa · Kazanchis", rating: 4.9, reviews: 154, startingPrice: 2500, verified: true, initials: "LL", description: "Weddings, events, product and portrait photography with professional editing." },
  { id: "sparkle-home", name: "Sparkle Home Cleaning", category: "Cleaning Services", location: "Adama", rating: 4.5, reviews: 198, startingPrice: 800, verified: false, initials: "SH", description: "Deep cleaning for homes and offices — vetted staff, eco-friendly supplies, flexible scheduling." },
  { id: "habesha-motors", name: "Habesha Auto Care", category: "Car Services", location: "Addis Ababa · Megenagna", rating: 4.6, reviews: 321, startingPrice: 600, verified: true, initials: "HA", description: "Diagnostics, servicing, body work and genuine parts for all vehicle makes." },
  { id: "tutorpro", name: "TutorPro Ethiopia", category: "Education & Tutoring", location: "Hawassa", rating: 4.8, reviews: 143, startingPrice: 300, verified: true, initials: "TP", description: "One-on-one tutoring for grades 4–12 and university entrance exam prep, in person or online." },
];
