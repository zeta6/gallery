import JSZip from "jszip";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const urls: string[] = req.body.urls;
  const proms = [];

  for (let i = 0; i < urls.length; i++) {
    proms.push(axios(urls[i], { responseType: "arraybuffer" }));
  }
  const images = await Promise.all(proms);

  let zip = new JSZip();
  const fold = zip.folder("images");

  if (fold) {
    images.forEach((d, i) => {
      fold.file(`img${i}.jpg`, d.data, { binary: true });
    });
  }

  const fzip = await zip.generateAsync({ type: "nodebuffer" });

  res.setHeader("Content-Disposition", `attachment; filename="archive.zip"`);
  res.setHeader("Content-Type", "application/zip; application/content-stream");
  res.send(fzip);
};
