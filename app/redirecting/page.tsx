import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@api/auth/[...nextauth]/route";

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export default async function RedirectingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/");

  redirect(`/editor/${session.user.id}`);
}
