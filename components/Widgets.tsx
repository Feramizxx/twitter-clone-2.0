import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
function Widgets() {
  return (
    <div className="px-2 mt-2 col-span-2 hidden lg:inline ">
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2 mb-5">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          className="bg-transparent outline-none flex-1"
          placeholder="Search Twitter"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="fero"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
