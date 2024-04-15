import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isLogin } from "@/lib/utils";
import { borrowCreationSchema } from "@/schemas/borrow";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (bookId) {
      const borrow = await prisma.borrow.findMany({
        where: {
          bookId: Number(bookId),
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
          book: true,
        },
      });

      return NextResponse.json(
        {
          borrow,
        },
        {
          status: 200,
        }
      );
    }

    const borrows = await prisma.borrow.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        book: true,
      },
    });
    return NextResponse.json(
      {
        borrows,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error getting borrows:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}

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
    const { userId, bookId, returnAt } = borrowCreationSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      return NextResponse.json(
        {
          error: "Book not found.",
        },
        {
          status: 404,
        }
      );
    }

    const existingBorrow = await prisma.borrow.findFirst({
      where: {
        userId,
        bookId,
      },
    });

    if (existingBorrow) {
      return NextResponse.json(
        {
          error: "Already borrowed.",
        },
        {
          status: 400,
        }
      );
    }

    const borrow = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        returnAt,
      },
    });

    return NextResponse.json(
      {
        borrow,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating borrow:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred.", message: error },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
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
    const { searchParams } = new URL(req.url);
    const borrowId = searchParams.get("id");
    const borrow = await prisma.borrow.findUnique({
      where: {
        id: Number(borrowId),
      },
    });

    if (!borrow) {
      return NextResponse.json(
        {
          error: "Borrow not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.borrow.delete({
      where: {
        id: Number(borrowId),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "borrow deleted.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting borrow:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}
