import { Grid } from "@mantine/core";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma";

import ListView from "../../components/ListView";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Nav from "../../components/navigation/Nav";
import Providers from "../../providers"
interface Props {
  params: { userId: string };
}

export default async function Editor({ params }: Props) {
  const session = await getServerSession(authOptions);
  const { userId } = await params;

  if (!session) redirect("/");
  if (session.user.id !== userId) notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { lists: { include: { items: true } } },
  });

  if (!user) notFound();

  const { lists } = user;

  return (
    <Grid gutter={0}>
      <Providers>
        <Nav user={user} />
        <ListView />
      </Providers>
    </Grid>
  );
}
