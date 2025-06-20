import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../prisma";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const listId = params.id;
  const { title, description } = await req.json();

  try {
    const existingList = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!existingList || existingList.owner !== session.user.id) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 403 });
    }

    const updatedList = await prisma.list.update({
      where: { id: listId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedList);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}