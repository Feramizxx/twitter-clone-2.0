import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import Feed from "../components/Feed";
import SideBar from "../components/SideBar";
import Widgets from "../components/Widgets";
import { fetchTweets } from "@/utils/fetchTweets";
import { Tweet } from "@/typing";
import toast, { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

interface Props {
  tweets: Tweet[],
}

export default function Home({tweets}: Props) {

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-9 ">
        <SideBar />
        <Feed tweets={tweets }/>
        <Widgets />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async(context) => {
const tweets=await fetchTweets()
  return{
    props:{tweets}
  }
    
  
};
