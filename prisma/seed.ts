import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const phoneCases = [
  {
    name: "Ultra Slim Clear Case",
    slug: "ultra-slim-clear-case",
    description: "Crystal clear protection that shows off your phone's original design. 0.3mm ultra slim, yellowing-resistant.",
    price: 14.99,
    compareAtPrice: 24.99,
    images: JSON.stringify(["/products/case-clear.jpg"]),
    category: "Clear Cases",
    sku: "USC-001",
    stock: 100,
    inStock: true,
    featured: true,
  },
  {
    name: "Matte Black Premium Case",
    slug: "matte-black-premium-case",
    description: "Soft-touch matte finish, anti-fingerprint coating. Premium protection with raised bezels.",
    price: 16.99,
    compareAtPrice: 26.99,
    images: JSON.stringify(["/products/case-matte-black.jpg"]),
    category: "Matte Cases",
    sku: "MBP-002",
    stock: 80,
    inStock: true,
    featured: true,
  },
  {
    name: "Pastel Mint Soft Case",
    slug: "pastel-mint-soft-case",
    description: "Dreamy pastel mint color, silicone material for extra grip. Cute and protective.",
    price: 12.99,
    compareAtPrice: 19.99,
    images: JSON.stringify(["/products/case-mint.jpg"]),
    category: "Pastel Cases",
    sku: "PMS-003",
    stock: 120,
    inStock: true,
    featured: true,
  },
  {
    name: "Leather Wallet Case",
    slug: "leather-wallet-case",
    description: "Genuine leather wallet case with card slots. Holds 3 cards and cash. Magnetic closure.",
    price: 29.99,
    compareAtPrice: 44.99,
    images: JSON.stringify(["/products/case-leather.jpg"]),
    category: "Wallet Cases",
    sku: "LWC-004",
    stock: 50,
    inStock: true,
    featured: false,
  },
  {
    name: "Sparkle Glitter Case",
    slug: "sparkle-glitter-case",
    description: "Shimmer glitter case that sparkles in light. Liquid-like floating glitters.",
    price: 15.99,
    compareAtPrice: 24.99,
    images: JSON.stringify(["/products/case-glitter.jpg"]),
    category: "Glitter Cases",
    sku: "SGC-005",
    stock: 90,
    inStock: true,
    featured: false,
  },
  {
    name: "Rugged Shockproof Case",
    slug: "rugged-shockproof-case",
    description: "Military-grade drop protection. Multi-layer shock absorption technology.",
    price: 19.99,
    compareAtPrice: 32.99,
    images: JSON.stringify(["/products/case-rugged.jpg"]),
    category: "Heavy Duty",
    sku: "RSC-006",
    stock: 60,
    inStock: true,
    featured: false,
  },
  {
    name: "Lavender Purple Clear Case",
    slug: "lavender-purple-clear-case",
    description: "Light lavender tint, anti-yellowing technology. Perfect for iPhone.",
    price: 14.99,
    compareAtPrice: 22.99,
    images: JSON.stringify(["/products/case-lavender.jpg"]),
    category: "Clear Cases",
    sku: "LPC-007",
    stock: 75,
    inStock: true,
    featured: false,
  },
  {
    name: "Minimalist Clear Case",
    slug: "minimalist-clear-case",
    description: "Simple and clean, ultra-thin design. Perfect for minimalists.",
    price: 12.99,
    compareAtPrice: 18.99,
    images: JSON.stringify(["/products/case-minimalist.jpg"]),
    category: "Clear Cases",
    sku: "MNC-008",
    stock: 110,
    inStock: true,
    featured: false,
  },
];

async function main() {
  console.log("Seeding phone cases...");

  for (const product of phoneCases) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seeded phone cases!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });