import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const products = [
  {
    name: "Ultra Slim Clear Case",
    slug: "ultra-slim-clear-case",
    description: "Crystal clear protection that shows off your phone's original design. 0.3mm ultra slim, yellowing-resistant TPU material with precise cutouts.",
    price: 19.99,
    compareAtPrice: 29.99,
    images: JSON.stringify(["https://images.unsplash.com/photo-1603313011101-31c726a55ad4?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-CLR-001",
    stock: 150,
    inStock: true,
    featured: true,
  },
  {
    name: "Midnight Matte Silicone Case",
    slug: "midnight-matte-silicone-case",
    description: "Soft-touch silicone finish that feels great in your hand. Features a soft microfiber lining inside for extra protection against scratches.",
    price: 24.99,
    compareAtPrice: 34.99,
    images: JSON.stringify(["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-SIL-002",
    stock: 100,
    inStock: true,
    featured: true,
  },
  {
    name: "Rugged Armor Impact Case",
    slug: "rugged-armor-impact-case",
    description: "Dual-layer protection with shock-absorbing TPU and hard polycarbonate shell. Certified military-grade drop protection for the most adventurous users.",
    price: 39.99,
    compareAtPrice: 49.99,
    images: JSON.stringify(["https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-RUG-003",
    stock: 80,
    inStock: true,
    featured: true,
  },
  {
    name: "Leather Folio Wallet Case",
    slug: "leather-folio-wallet-case",
    description: "Premium vegan leather folio with three card slots and a dedicated pocket for cash. Magnetic closure keeps everything secure.",
    price: 34.99,
    compareAtPrice: 44.99,
    images: JSON.stringify(["https://images.unsplash.com/photo-1525598912003-663126343e1f?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-LTH-004",
    stock: 60,
    inStock: true,
    featured: false,
  },
  {
    name: "Eco-Friendly Biodegradable Case",
    slug: "eco-friendly-biodegradable-case",
    description: "Made from 100% plant-based materials. This case is fully compostable while providing excellent protection against everyday drops.",
    price: 29.99,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-ECO-005",
    stock: 120,
    inStock: true,
    featured: true,
  },
  {
    name: "Marble Elegance Hard Shell",
    slug: "marble-elegance-hard-shell",
    description: "Luxury marble pattern with a high-gloss finish. Lightweight and slim profile that adds zero bulk to your device.",
    price: 27.99,
    compareAtPrice: 39.99,
    images: JSON.stringify(["https://images.unsplash.com/photo-1609242941894-5181db5ee70b?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-MAR-006",
    stock: 90,
    inStock: true,
    featured: false,
  },
  {
    name: "Sunset Gradient MagSafe Case",
    slug: "sunset-gradient-magsafe-case",
    description: "Beautiful sunset gradient colors with built-in magnets for seamless MagSafe compatibility. Supports wireless charging and magnetic accessories.",
    price: 32.99,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-MAG-007",
    stock: 110,
    inStock: true,
    featured: false,
  },
  {
    name: "Vintage Floral Protective Case",
    slug: "vintage-floral-protective-case",
    description: "Hand-drawn vintage floral patterns on a semi-transparent background. Features reinforced corners for enhanced drop protection.",
    price: 26.99,
    compareAtPrice: 34.99,
    images: JSON.stringify(["https://images.unsplash.com/photo-1581021443026-c2dfb9442001?q=80&w=1000&auto=format&fit=crop"]),
    category: "Phone Cases",
    sku: "PHN-FLR-008",
    stock: 70,
    inStock: true,
    featured: false,
  },
];

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seeded products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });