import { Grid, Loader } from "@mantine/core";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma";

import ListView from "../../components/ListView";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Nav from "../../components/navigation/Nav";
import Providers from "../../providers";
import { transpileModule } from "typescript";
interface Props {
  params: { userId: string };
}

export default async function Editor({ params }: Props) {
  const session = await getServerSession(authOptions);
  const { userId } = await params;

  if (!session) redirect("/");
  if (session.user.id !== userId) notFound();

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        lists: {
          select: {
            id: true,
            title: true,
            description: true,
            backgroundColor: true,
            imageArrangement: true,
            iconSet: true,
            owner: true,
            updatedAt: true,
            createdAt: true,
            items: {
              orderBy: { position: 'asc' },
              select: {
                id: true,
                headline: true,
                subHeadline: true,
                description: true,
                imageUrl: true,
                starRating: true,
                rankingAsset: true,
                position: true,
                updatedAt: true,
                listId: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    notFound();
  }

  if (!user) notFound();

  const { lists } = user;

  return (
    <Grid gutter={0}>
      <Providers>
        <Nav user={user} />
        {lists && lists.length > 0 ? <ListView listData={lists} /> : <Loader />}
      </Providers>
    </Grid>
  );
}
