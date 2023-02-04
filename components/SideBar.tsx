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
      {/* <SideBarItems Icon={HomeIcon}  title="Home" />
      <SideBarItems Icon={HashtagIcon} title="Explore" />
      <SideBarItems Icon={BellIcon} title="Notification" />
      <SideBarItems Icon={EnvelopeIcon} title="Messages" />
      <SideBarItems Icon={BookmarkIcon} title="Bookmarks" />
      <SideBarItems Icon={CircleStackIcon} title="Lists" />
      <SideBarItems Icon={UserIcon} onClick={session ? signOut : signIn} title={!session ? `Sign In` : `Sign Out`} />
      <SideBarItems Icon={EllipsisHorizontalCircleIcon} title="More" /> */}
      <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <HomeIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>Home</p>
    </div>
    <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <HashtagIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>Explore</p>
    </div>
    <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <BellIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>Notification</p>
    </div>
    <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <EnvelopeIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>Messages</p>
    </div>
    <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <BookmarkIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>Bookmarks</p>
    </div>
    <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <CircleStackIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>Lists</p>
    </div>
    <div onClick={!session ? ()=>signIn() : ()=>signOut()}   className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <UserIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>{!session ? `Sign In`: `Sign Out`}</p>
    </div>
    <div className='group cursor-pointer flex max-w-fit items-center space-x-2 px-4 py-3  rounded-full hover:bg-gray-100 transition-all duration-200'>
        <EllipsisHorizontalCircleIcon  className='h-6 w-6'/>
        <p className='group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl'>More</p>
    </div>
    
    
    

    
    </div>
  );
}

export default SideBar;
