import Head from "next/head";
import Link from "next/link";
import Guessing from "~/components/guessing";
const API_KEY = process.env.API_KEY;

export default function Home() {
  return (
    <>
      <Head>

      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Guessing/>

      </main>
    </>
  );
}
