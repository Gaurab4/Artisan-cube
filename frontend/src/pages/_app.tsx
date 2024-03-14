import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { setCookie , parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { token } = parseCookies();
  const router = useRouter();

  const allowedRoutes = ['/', '/auth/login', '/auth/signup'];
  useEffect(() => {
    // Check for authentication token in cookies


    if (!token && !allowedRoutes.includes(router.pathname)) {
      // Redirect to the login page or handle unauthorized access
      router.push('/');
    } else {
      // Set authentication status based on the presence of the token
      console.log("not allowed");
    }
  }, [allowedRoutes]);

  return <Component {...pageProps} />;
}
