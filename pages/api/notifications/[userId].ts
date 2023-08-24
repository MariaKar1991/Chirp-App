import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

/**
 * API handler for fetching notifications for a specific user.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the response to send.
 * @returns The response with fetched notifications or an error status.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is GET. If not, return a 405 Method Not Allowed status.
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Extract the userId parameter from the request query.
    const { userId } = req.query;

    // Validate the userId parameter.
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    // Fetch notifications for the specified user, ordered by createdAt in descending order.
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Update the user's hasNotification status to false.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    // Return the fetched notifications in the response.
    return res.status(200).json(notifications);
  } catch (error) {
    // Log the error and return a 400 Bad Request status.
    console.log(error);
    return res.status(400).end();
  }
}
