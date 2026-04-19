import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOrderNumber() {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, address, city, state, zip, country, items, total } = body;

    if (!customerName || !customerEmail || !address || !items || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName,
        customerEmail,
        address,
        city,
        state,
        zip,
        country: country || "US",
        items: JSON.stringify(items),
        total,
        status: "pending",
        paymentStatus: "pending",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  const where = email ? { customerEmail: email } : {};

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const ordersWithItems = orders.map((order) => ({
    ...order,
    items: JSON.parse(order.items || "[]"),
  }));

  return NextResponse.json(ordersWithItems);
}