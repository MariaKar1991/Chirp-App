import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

/**
 * API handler for fetching a list of users in descending order of creation.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the response to send.
 * @returns The response with a list of users or an error status.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
