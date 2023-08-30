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
        <title>Movie Guesser</title>
        <meta name="description" content="This page is just a simple app created using IMBD API for puling random movie backdrops and guessing the movie name" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Movie Guesser" />
        <meta property="og:description" content="This page is just a simple app created using IMBD API for puling random movie backdrops and guessing the movie name" />
        <meta property="og:image" content="red-seat-cinema-theatre.jpg" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Guessing/>

      </main>
    </>
  );
}
