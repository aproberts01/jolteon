import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../prisma";

export async function PATCH(
  req: Request,
  contextPromise: Promise<{ params: { id: string } }>
) {
  const { params } = await contextPromise;
  const { id: listId } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { itemId, ...updateFields } = body;

  if (Object.keys(updateFields).length === 0) {
    return new Response("No data provided to update", { status: 400 });
  }

  try {
    if (itemId) {
      const item = await prisma.listItem.findUnique({
        where: { id: itemId },
        include: { list: true },
      });

      if (
        !item ||
        item.id !== itemId ||
        item.list.owner !== session.user.id
      ) {
        return new Response("Forbidden", { status: 403 });
      }

      const updatedItem = await prisma.listItem.update({
        where: { id: itemId },
        data: updateFields,
      });

      return new Response(JSON.stringify(updatedItem), { status: 200 });
    }

    const list = await prisma.list.findUnique({
      where: { id: listId },
    });

    if (!list || list.owner !== session.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    const updatedList = await prisma.list.update({
      where: { id: listId },
      data: updateFields,
    });

    return NextResponse.json(updatedList);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
