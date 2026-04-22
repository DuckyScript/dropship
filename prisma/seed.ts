import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const products = [
  {
    name: "Noir Croc Vegan Leather Case",
    slug: "noir-croc-vegan-leather-case",
    description: "Indulge in the texture of our signature croc-embossed vegan leather. Hand-finished with a gold-stamped logo and a soft-touch interior. The ultimate statement of luxury for your iPhone.",
    price: 45.00,
    compareAtPrice: 65.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1541140532154-b024d715b915?q=80&w=1000&auto=format&fit=crop"]),
    category: "Signature Series",
    sku: "VV-LHT-001",
    stock: 50,
    inStock: true,
    featured: true,
  },
  {
    name: "Abstract Muse Artist Edition",
    slug: "abstract-muse-artist-edition",
    description: "A collaboration with emerging digital artists. This case features a vibrant, multi-layered abstract print with a high-gloss, scratch-resistant finish. Limited edition drop.",
    price: 38.00,
    compareAtPrice: 50.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1000&auto=format&fit=crop"]),
    category: "Artist Series",
    sku: "VV-ART-002",
    stock: 100,
    inStock: true,
    featured: true,
  },
  {
    name: "24K Gold-Leaf Translucent Case",
    slug: "gold-leaf-translucent-case",
    description: "Real 24K gold flakes suspended in a crystal-clear, shock-absorbent shell. Provides 10ft drop protection while adding a touch of opulence to your device.",
    price: 55.00,
    compareAtPrice: 75.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1609242941894-5181db5ee70b?q=80&w=1000&auto=format&fit=crop"]),
    category: "Luxe Series",
    sku: "VV-GLD-003",
    stock: 30,
    inStock: true,
    featured: true,
  },
  {
    name: "Midnight Botanical Satin Case",
    slug: "midnight-botanical-satin-case",
    description: "Deep floral patterns on a matte satin finish. Sophisticated and understated, this case offers a secure grip and 360-degree protection.",
    price: 32.00,
    compareAtPrice: 45.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1581021443026-c2dfb9442001?q=80&w=1000&auto=format&fit=crop"]),
    category: "Signature Series",
    sku: "VV-FLR-004",
    stock: 120,
    inStock: true,
    featured: false,
  },
  {
    name: "Frosted Cloud MagSafe Shell",
    slug: "frosted-cloud-magsafe-shell",
    description: "Minimalist frosted finish with integrated MagSafe magnets. Sleek, thin, and designed to pair perfectly with our leather wallet accessories.",
    price: 35.00,
    compareAtPrice: null,
    images: JSON.stringify(["https://images.unsplash.com/photo-1603313011101-31c726a55ad4?q=80&w=1000&auto=format&fit=crop"]),
    category: "Essentials",
    sku: "VV-MAG-005",
    stock: 200,
    inStock: true,
    featured: true,
  },
  {
    name: "Emerald Marble MagSafe Case",
    slug: "emerald-marble-magsafe-case",
    description: "Deep emerald tones with white marble veining. Features built-in magnets and a raised bezel for screen and camera protection.",
    price: 42.00,
    compareAtPrice: 55.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop"]),
    category: "Luxe Series",
    sku: "VV-MRB-006",
    stock: 75,
    inStock: true,
    featured: false,
  },
  {
    name: "Rose Quartz Protective Case",
    slug: "rose-quartz-protective-case",
    description: "Inspired by natural crystals, this case offers a beautiful semi-translucent look with military-grade impact resistance.",
    price: 34.00,
    compareAtPrice: 42.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1588691873759-45920f666b69?q=80&w=1000&auto=format&fit=crop"]),
    category: "Signature Series",
    sku: "VV-RSQ-007",
    stock: 85,
    inStock: true,
    featured: false,
  },
  {
    name: "Carbon Fiber Stealth Case",
    slug: "carbon-fiber-stealth-case",
    description: "Aerospace-grade carbon fiber weave. Incredibly thin, lightweight, and stronger than steel. The ultimate choice for the tech-focused minimalist.",
    price: 59.00,
    compareAtPrice: 85.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=1000&auto=format&fit=crop"]),
    category: "Performance",
    sku: "VV-CRB-008",
    stock: 40,
    inStock: true,
    featured: false,
  },
  {
    name: "Lunar Titanium MagSafe Case",
    slug: "lunar-titanium-magsafe-case",
    description: "Cold-forged titanium alloy frame with a brushed lunar-grey finish. Engineered for extreme durability without the weight. MagSafe compatible.",
    price: 65.00,
    compareAtPrice: 95.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1000&auto=format&fit=crop"]),
    category: "Performance",
    sku: "VV-TIT-009",
    stock: 25,
    inStock: true,
    featured: true,
  },
  {
    name: "Sahara Sand Suede Case",
    slug: "sahara-sand-suede-case",
    description: "Ultra-premium Italian suede in a warm desert hue. Features a microfiber lining to keep your device pristine and a comfortable, high-grip exterior.",
    price: 48.00,
    compareAtPrice: 60.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"]),
    category: "Signature Series",
    sku: "VV-SUD-010",
    stock: 60,
    inStock: true,
    featured: false,
  },
  {
    name: "Obsidian Mirror Case",
    slug: "obsidian-mirror-case",
    description: "A flawless obsidian-black mirror finish that doubles as a functional mirror. Treated with an oleophobic coating to resist fingerprints and smudges.",
    price: 39.00,
    compareAtPrice: 50.00,
    images: JSON.stringify(["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop"]),
    category: "Luxe Series",
    sku: "VV-MIR-011",
    stock: 90,
    inStock: true,
    featured: true,
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