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
  const name: string | undefined = req.query.name?.toString();
  const newName: string | undefined = req.query.newName?.toString();
  const data = fs.readdirSync(
    path.join(<string>process.env.PROTOTYPE_POSITION)
  );
  if (!name) {
    return;
  }
  if (!newName) {
    res.status(200).json({ result: false, reason: "不能为空" });
    return;
  }
  if (data.indexOf(newName) != -1) {
    res.status(200).json({ result: false, reason: "有重名" });
  } else {
    fs.renameSync(
      path.join(<string>process.env.PROTOTYPE_POSITION, name),
      path.join(<string>process.env.PROTOTYPE_POSITION, newName)
    );
    res.status(200).json({ result: true, reason: "" });
  }
}
