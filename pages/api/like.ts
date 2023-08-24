import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

/**
 * API handler for liking/unliking a post.
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the response to send.
 * @returns The response with the updated post's information or an error status.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is supported. If not, return a 405 Method Not Allowed status.
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    // Extract the postId from the request body.
    const { postId } = req.body;

    // Authorize the current user using serverAuth.
    const { currentUser } = await serverAuth(req, res);

    // Validate the postId.
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    // Find the post being liked/unliked.
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // Handle cases where the post doesn't exist.
    if (!post) {
      throw new Error("Invalid ID");
    }

    // Update the list of likedIds based on the request method.
    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);

      // NOTIFICATION PART START
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your chirp!",
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser?.id
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
