import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};
  
  if (category && category !== "All") {
    where.category = category;
  }
  if (featured === "true") {
    where.featured = true;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const productsWithImages = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
  }));

  return NextResponse.json(productsWithImages);
}