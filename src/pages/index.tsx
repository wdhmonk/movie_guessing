const API_KEY = process.env.API_KEY;
import ReactGA from "react-ga";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Guessing from "~/components/guessing";

export default function Home() {
  useEffect(() => {
    ReactGA.initialize("G-VZ88DFD8CE");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
 
  return (
    <>
      <Head>
      <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VZ88DFD8CE"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VZ88DFD8CE');
          `}
        </script>

      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Guessing/>

      </main>
    </>
  );
}
