import Head from "next/head";
import { GetServerSideProps } from "next";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { fetchTweets } from "@/utils/fetchTweets";
import { Tweet } from "@/typing";
import  { Toaster } from "react-hot-toast";


interface Props {
  tweets: Tweet[];
}

export default function Home({ tweets }: Props) {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-9 ">
        <SideBar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets: Tweet[] = await fetchTweets();
  return {
    props: { tweets },
  };
};
