// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TweetBody } from "@/typing";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TweetBody = JSON.parse(req.body);
  const mutation = {
    mutations: [
      {
        create: {
          _type: "tweet",
          title: data.title,
          username: data.username,
          blockTweet: false,
          prfileImg: data.profilImg,
          image: data.image,
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2022-11-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  const result = await fetch(apiEndpoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutation),
    method: "POST",
  });
 
  const json = await result.json();
  res.status(200).json({ message: "Added" });
}
