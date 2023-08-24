import Layout from "../components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import LoginModal from "../components/modals/LoginModal";
import EditModal from "../components/modals/EditModal";
import RegisterModal from "@/components/modals/RegisterModal";

/**
 * Main entry point of the Next.js application.
 * @param {AppProps} props - Props passed to the App component.
 * @returns JSX wrapping the application content and components.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
