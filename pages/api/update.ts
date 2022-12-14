// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, IncomingForm } from "formidable";
import fs from "fs-extra";
import path from "path";
import extract from "extract-zip";
type Data = {
  result: boolean;
  reason: string;
};

interface incomingData {
  fields: formidable.Fields;
  files: formidable.Files;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: incomingData = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  const file: File = <File>data.files.file;
  const readStream = fs.createReadStream(path.join(file.filepath));
  const dirPath_tmp = `${process.env.SITES_POSITION}.tmp/`;
  const filepath_tmp = path.join(dirPath_tmp, data.fields.name + ".zip");
  fs.ensureDirSync(path.join(dirPath_tmp));
  const upStream = fs.createWriteStream(filepath_tmp);
  readStream.pipe(upStream);
  readStream.on("close", async () => {
    const dir = path.join(
      <string>process.env.PROTOTYPE_POSITION,
      data.fields.name.toString()
    );
    fs.removeSync(dir);
    await extract(filepath_tmp, {
      dir: dir,
    });
    if (!fs.existsSync(path.join(dir, "/index.html"))) {
      const files_first = fs.readdirSync(dir);
      const dir_first = files_first[0];
      const dir_real = path.join(dir, "/", dir_first);
      const files_real = fs.readdirSync(dir_real);
      for (let i = 0; i < files_real.length; i++) {
        fs.moveSync(
          path.join(dir_real, "/", files_real[i]),
          path.join(dir, "/", files_real[i])
        );
      }
    }
    fs.removeSync(filepath_tmp);
    fs.removeSync(file.filepath);
    res.status(200).json({ result: true, reason: "" });
  });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
