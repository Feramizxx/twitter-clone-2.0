import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Tweet } from "@/typing";
import { toast } from "react-hot-toast";
import {
  CalendarIcon,
  FaceSmileIcon,
  PhotoIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { TweetBody } from "@/typing";
import { fetchTweets } from "@/utils/fetchTweets";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}
function TweetBox({ setTweets }: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [imagePopUpIsVisible, setImagePopUpIsVisible] =
    useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [image, setImage] = useState<string>("");

  const addImageSubmitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImagePopUpIsVisible(false);
  };

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      title: inputValue,
      username: session?.user?.name || "Unknown User",
      profilImg:
        session?.user?.image ||
        `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`,
      image: image,
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });

    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);
    toast.success("Tweet posted");
    return json;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postTweet();
    setInputValue("");
    setImage("");
    setImagePopUpIsVisible(false);
  };
  return (
    <div className="flex space-x-2 p-5 ">
      <img
        width={0}
        height={0}
        className="h-12 w-12 object-cover rounded-full"
        src={
          session?.user?.image ||
          `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`
        }
        alt=""
      />
      <div className=" flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col ">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="h-24 pb-12  w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's happening"
          />
          <div className="flex items-center  ">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotoIcon
                onClick={() => setImagePopUpIsVisible(!imagePopUpIsVisible)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <MagnifyingGlassIcon className="h-5 w-5  cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <FaceSmileIcon className="h-5 w-5  cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="h-5 w-5  cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <MapPinIcon className="h-5 w-5  cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!inputValue || !session}
              className="bg-twitter disabled:opacity-40 px-5 py-2 text-white font-bold rounded-full"
            >
              Tweet
            </button>
          </div>
          {imagePopUpIsVisible && (
            <form className="mt-5 flex items-center rounded-lg justify-between py-2 px-4 rounded-lf bg-twitter/80">
              <input
                ref={imageInputRef}
                type="text"
                className="outline-none flex-1 bg-transparent p-2 text-white placeholder:text-white"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageSubmitHandler}
                className="text-white font-bold"
              >
                Add image
              </button>
            </form>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
