import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const boardId = params.id;
  const session = await auth();

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        columns: {
          orderBy: {
            id: "asc",
          },
          include: {
            tasks: {
              orderBy: {
                id: "asc",
              },
            },
          },
        },
      },
    });
    await prisma.$disconnect();

    if (!board || board.userId !== session?.user?.id) {
      return NextResponse.json(
        {
          message: "Board not found or unauthorized",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        board,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}

  return NextResponse.json(
    {
      message: "Board not found or unauthorized",
    },
    {
      status: 404,
    }
  );
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data: { [key: string]: string } = await req.json();
  const boardId = params.id;

  let boardName = "";
  let newColumns: string[] = [];
  let updatedColumns: string[] = [];
  let deletedColumns: string[] = [];

  for (const item in data) {
    if (item === "id" || data.columnsIdToDelete?.includes(item)) {
      continue;
    }
    if (item === "boardName") {
      boardName = data[item];
    } else if (item.includes("new")) {
      newColumns.push(data[item]);
    } else if (item.includes("Delete")) {
      deletedColumns =
        data[item] === ""
          ? [...deletedColumns]
          : [...deletedColumns, ...data[item].split(",")];
    } else {
      updatedColumns.push(item);
    }
  }

  try {
    await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        name: boardName,
        columns: {
          create: newColumns.map((column) => ({
            name: column,
          })),
          update: updatedColumns.map((column) => ({
            where: {
              id: column,
            },
            data: {
              name: data[column],
            },
          })),
          delete: deletedColumns.map((column) => ({
            id: column,
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
      message: "Board updated successfully",
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const boardId = params.id;
  const session = await auth();

  try {
    await prisma.board.delete({
      where: {
        id: boardId,
        userId: session?.user?.id,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json(
      {
        message: "Board deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {}

  return NextResponse.json(
    {
      message: "Board not found or unauthorized",
    },
    {
      status: 404,
    }
  );
}
