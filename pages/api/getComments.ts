// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "@/sanity";
import { Comment } from "@/typing";
import { groq } from "next-sanity";
import tweet from "@/twitter-sanity/schemas/tweet";

type Data = {
  comments: Comment[];
};

const query = groq`*[_type=="comment" && references(*[_type=="tweet" && _id==$tweetId]._id) ]{
  
    _id,
    ...
  } | order(_createdAt desc)`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query;
  const comments: Comment[] = await sanityClient.fetch(query, {
    tweetId: tweetId,
  });

  res.status(200).json({ comments });
}
