import React, { useState } from "react";
import TweetBox from "./TweetBox";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Tweet } from "@/typing";
import tweet from "@/twitter-sanity/schemas/tweet";
import TweetComponent from "./TweetComponent";
import { fetchTweets } from "@/utils/fetchTweets";
import toast from "react-hot-toast";
type Props = {
  tweets: Tweet[];
};

function Feed({ tweets: tweetProps }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetProps);
  const refreshHandle = async () => {
    const refresh = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success("Feed updated!", {
      id: refresh,
    });
  };
  return (
    <div className="col-span-7 lg:col-span-5 border-x  max-h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex  items-center justify-between ">
        <h1 className="text-xl font-bold p-5">Home</h1>
        <ArrowPathIcon
          onClick={refreshHandle}
          className=" mr-5 w-8 h-8 cursor-pointer text-twitter ease-out transition-all duration-500  hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets}/>
      </div>

      {/* tweet */}

      {tweets.map((tweet) => {
        return <TweetComponent key={tweet._id} tweet={tweet} />;
      })}
    </div>
  );
}

export default Feed;
