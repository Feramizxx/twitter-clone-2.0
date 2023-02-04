import { type } from "os";

export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "twitter";
  blockTweet: boolean;
}

export interface Comment extends CommentBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "comment";
  tweet:{
    _ref: string;
    _type: 'reference'
  }
}

export type TweetBody = {
  title: string;
  username: string;
  profilImg: string;
  image?: string;
};

export type CommentBody = {
  comment: string;
  tweetId: string;
  username: string;
  profileImg: string;
};
