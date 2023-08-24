import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

/**
 * API handler for following/unfollowing a user.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the response to send.
 * @returns The response with the updated user's information or an error status.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    // Extract the userId from the request body.
    const { userId } = req.body;

    // Authorize the current user using serverAuth.
    const { currentUser } = await serverAuth(req, res);

    // Validate the userId.
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    // Find the user being followed/unfollowed.
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Handle cases where the user doesn't exist.
    if (!user) {
      throw new Error("Invalid ID");
    }

    // Update the list of followingIds based on the request method.
    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      // NOTIFICATION PART START
      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
