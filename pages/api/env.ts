// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import path from "path";
type Data = {
  env: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query: string = <string>req.query.type;
  let data: string = "";
  switch (query) {
    case "LOCAL_DOMAIN":
      data = <string>process.env.LOCAL_DOMAIN;
      break;
    default:
      break;
  }
  res.status(200).json({ env: data });
}
