// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import path from "path";
type Data = {
  names: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!process.env.PROTOTYPE_POSITION) {
    console.error("please set env");
    return;
  }
  const data = fs.readdirSync(path.join(process.env.PROTOTYPE_POSITION));
  res.status(200).json({ names: data });
}
