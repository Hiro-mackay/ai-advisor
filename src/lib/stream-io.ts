import { StreamClient } from "@stream-io/node-sdk";
import { env } from "./env";

export const streamClient = new StreamClient(
  env.NEXT_PUBLIC_STREAM_API_KEY,
  env.STREAM_API_SECRET
);
