import { prisma } from "@/lib/prisma";
import { isLogin } from "@/lib/utils";
import { reportSchema } from "@/schemas/report";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!isLogin(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const body = await req.json();
    const { userId } = reportSchema.parse(body);

    const collection = await prisma.collection.findMany({
      where: {
        userId: Number(userId),
      },
    });

    const borrow = await prisma.borrow.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      {
        collection,
        borrow,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred.", message: error },
      {
        status: 500,
      }
    );
  }
}
