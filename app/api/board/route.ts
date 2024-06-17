import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Board } from "@prisma/client";

export async function POST(req: NextRequest) {
  const data: { [key: string]: string } = await req.json();
  const session = await auth();

  let boardName = "";
  let columns: string[] = [];
  let board: Board | null = null;

  for (const item in data) {
    if (item === "boardName") {
      boardName = data[item];
    } else {
      columns.push(data[item]);
    }
  }

  try {
    board = await prisma.board.create({
      data: {
        userId: session?.user.id,
        name: boardName,
        columns: {
          create: columns.map((column) => ({
            name: column,
          })),
        },
      },
    });
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(
    {
      message: "Create Board success",
      board: board,
    },
    {
      status: 200,
    }
  );
}

export async function GET() {
  const session = await auth();
  try {
    const boards = await prisma.board.findMany({
      where: {
        userId: session?.user?.id,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json(
      {
        boards,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}

  return NextResponse.json(
    {
      message: "GET route error",
    },
    {
      status: 400,
    }
  );
}
