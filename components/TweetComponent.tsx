import { CommentBody, Tweet } from "@/typing";
import { type } from "os";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TimeAgo from "react-timeago";
import { Comment } from "@/typing";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "@/utils/fetchComments";
import comment from "@/twitter-sanity/schemas/comment";
import { useSession, signIn, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
type Props = {
  tweet: Tweet;
};

function TweetComponent({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>("");
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const { data: session } = useSession();

  const postComment = async () => {
    const commentBody: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown user",
      profileImg: session?.user?.image || "unknown",
    };
    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentBody),
      method: "POST",
    });

    const json = result.json();
    const newcomments = await fetchComments(tweet._id);
    setComments(newcomments);
    toast.success("comment posted");
    return json;
  };

  console.log(comments)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment();
    setInput('');
  };

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          className="rounded-full object-cover h-10 w-10 "
          src={session?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
          alt={session?.user?.name|| "User"}
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p>{tweet.title}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleLeftIcon
            onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
            className="h-5 w-5"
          />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="flex mt-3 space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="outline-none bg-gray-100 rounded-lg p-2 flex-1"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            className="text-twitter  disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 p-5   space-y-5 overflow-y-scroll border-t border-gray-100">
          {comments.map((comment) => (
            <div className="relative flex space-x-2" key={comment._id}>
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 object-cover rounded-full"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden lg:inline text-sm text-gray-500">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TweetComponent;
