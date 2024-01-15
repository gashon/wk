import { ANON_TOKEN } from "@/consts";
import { verifyToken } from "@/lib/jwt";
import { AnonToken, LoginPostRequest } from "@/types";
import { attachAnonToken } from "@/util/attach-jwt";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.json({
      message: "Method not allowed",
    });

    return;
  }

  const { token } = req.query as LoginPostRequest;

  let tokenPayload: AnonToken;
  try {
    tokenPayload = verifyToken<AnonToken>(token);
  } catch (e) {
    console.error(e);

    res.json({ message: "Invalid token" });
    return;
  }

  attachAnonToken(ANON_TOKEN, tokenPayload, res);

  res.json({
    message: "success",
  });
  return;
}
