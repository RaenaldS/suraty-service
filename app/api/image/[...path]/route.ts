// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import mime from "mime-types";
// import { isArray } from "lodash";

// export const config = {
//   api: {
//     responseLimit: "8mb",
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Buffer>) {
//   const path = Array.isArray(req.query.path) ? req.query.path.join("/") : req.query.path || "";
//   // return new Promise<void>(async (resolve) => {
//   // console.log(path);
//   // try {
//   if (fs.existsSync(`./public/${path}`)) {
//     const file = fs.readFileSync(`./public/${path}`);
//     res.setHeader("Content-Type", mime.lookup(`./public/${path}`).toString());
//     res.send(file);
//   } else {
//     const gambar = path.indexOf("users") > -1 ? "./public/users/no-image.jpg" : "./public/images/no-image.jpg";
//     const file = fs.readFileSync(gambar);
//     res.setHeader("Content-Type", "image/jpeg");
//     res.send(file);
//     // return resolve();
//   }
//   // } catch (err) {
//   //   console.log(err);
//   //   // return resolve();
//   //   // res.status(500).send({ err });
//   // }
//   // });
// }

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  // const { searchParams } = new URL(request.url);
  const path = params.path.join("/");

  if (fs.existsSync(`./public/${path}`)) {
    const file = fs.readFileSync(`./public/${path}`);
    return new Response(file, {
      status: 200,
      headers: { "Content-Type": "image/jpeg" },
    });
  } else {
    const gambar = path.indexOf("users") > -1 ? "./public/users/no-image.jpg" : "./public/images/no-image.jpg";
    const file = fs.readFileSync(gambar);
    // res.setHeader("Content-Type", "image/jpeg");
    // res.send(file);
    return new Response(file, {
      status: 200,
      headers: { "Content-Type": "image/jpeg" },
    });
  }

  // // return Response.json({ data, total });
  // // console.log(path);
  // return new Response("Hello, Next.js!", {
  //   status: 200,
  //   headers: { "Set-Cookie": `token=${params}` },
  // });
}
