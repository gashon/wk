import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

import { createToken, verifyToken } from "@/lib/jwt";
import { AnonToken } from "@/types";
import { ANON_TOKEN } from "@/consts";

type TokenCreation = {
  token: string;
  tokenPayload: AnonToken;
};

const createPayload = () => ({
  user_id: uuidv4(),
  created_at: new Date().toISOString(),
});

export const attachAnonToken = (
  cookie: string,
  tokenPayload: AnonToken,
  res: NextApiResponse,
): TokenCreation => {
  const token = createToken<AnonToken>(tokenPayload);

  res.setHeader(
    "Set-Cookie",
    `${cookie}=${token}; Path=/; Secure; SameSite=Strict; expires=Fri, 31 Dec 9999 23:59:59 GMT;`,
  );

  return { token, tokenPayload };
};

export const attachOrRetrieveAnonToken = (
  req: NextApiRequest,
  res: NextApiResponse,
): TokenCreation => {
  const cookie = ANON_TOKEN;

  if (!req.cookies[cookie])
    return attachAnonToken(cookie, createPayload(), res);

  try {
    const tokenPayload = verifyToken<AnonToken>(req.cookies[cookie]);
    // @ts-ignore : verified token is of type AnonToken
    return { token: req.cookies[cookie], tokenPayload };
  } catch (err) {
    return attachAnonToken(cookie, createPayload(), res);
  }
};
