import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

/**
 * Middleware function for server-side authentication.
 * Retrieves the current user's information from the session.
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<{ currentUser: User | null }>} - An object containing the current user's information.
 * @throws {Error} If the user is not signed in or their information cannot be retrieved.
 */
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve the user's session using server-side authentication.
  const session = await getServerSession(req, res, authOptions);

  // Check if the user is signed in.
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  // Retrieve the current user's information from the database using their email.
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // Return the current user's information.
  return { currentUser };
};

export default serverAuth;
