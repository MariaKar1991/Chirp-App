import Header from "@/components/Header";
import NotificationsFeed from "../components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

// Server-side rendering function to check if the user is authenticated.
export async function getServerSideProps(context: NextPageContext) {
  // Get the user session using the getSession function.
  const session = await getSession(context);

  // If the user is not authenticated, redirect to the home page.
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If the user is authenticated, provide the session as props.
  return {
    props: {
      session,
    },
  };
}

// Notifications page component.
const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
