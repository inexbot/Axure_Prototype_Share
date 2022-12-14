// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import path from "path";
type Data = {
  result: boolean;
  reason: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = fs.readdirSync(
    path.join(<string>process.env.PROTOTYPE_POSITION)
  );
  const name = req.query.name?.toString();
  if (!name) {
    return;
  }
  if (data.indexOf(name) == -1) {
    console.log("没有");
    res.status(200).json({ result: false, reason: "不存在" });
    return;
  }
  fs.removeSync(path.join(<string>process.env.PROTOTYPE_POSITION, name));
  res.status(200).json({ result: true, reason: "" });
}
