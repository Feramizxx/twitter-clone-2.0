import { createClient, groq } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || "ipfgz7h6",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2022-11-16",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);
export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
