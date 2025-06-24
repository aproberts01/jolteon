import { authOptions } from "@auth/[...nextauth]/route";
import getServerSession from "next-auth";

export const getAuthSession = () => getServerSession(authOptions);