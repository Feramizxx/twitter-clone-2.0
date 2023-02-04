import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  UserIcon,
  EnvelopeIcon,
  HomeIcon,
  CircleStackIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import SideBarItems from "./SideBarItems";
function SideBar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img
        width={0}
        height={0}
        className="m-3 w-10 h-10 flex-shrink-0 rounded-lg"
        src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
        alt=""
      />
      <SideBarItems Icon={HomeIcon} title="Home" />
      <SideBarItems Icon={HashtagIcon} title="Explore" />
      <SideBarItems Icon={BellIcon} title="Notification" />
      <SideBarItems Icon={EnvelopeIcon} title="Messages" />
      <SideBarItems Icon={BookmarkIcon} title="Bookmarks" />
      <SideBarItems Icon={CircleStackIcon} title="Lists" />
      <SideBarItems Icon={UserIcon} onClick={session ? signOut : signIn} title={!session ? `Sign In` : `Sign Out`} />
      <SideBarItems Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
}

export default SideBar;
