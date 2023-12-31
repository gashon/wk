import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

import {
  BodyWeight,
  WeightDeleteRequest,
  WeightGetRequest,
  WeightGetResponse,
  WeightPostRequest,
  WeightPostResponse,
} from "@/types";
import { attachOrRetrieveAnonToken } from "@/util/attach-jwt";
import { admin } from "@/lib/firebase-admin";

type Response =
  | {
      message: string;
    }
  | WeightPostResponse
  | WeightGetResponse;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    case "DELETE":
      handleDeleteRequest(req, res);
      break;
    case "OPTIONS":
      res.status(200).end();
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      return;
  }
}

const handleGetRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<WeightGetResponse | { message: string }>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  const db = admin.firestore();

  let query = db
    .collection("users")
    .doc(tokenPayload.user_id)
    .collection("bodyWeights")
    .orderBy("created_at_timestamp", "desc");

  try {
    const querySnapshot = await query.get();

    const documents = querySnapshot.docs.map((doc) => doc.data() as BodyWeight);

    res.json({ data: documents });
  } catch (err) {
    console.log(err);
    res.json({ message: "failed" });
  }
};

const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<WeightPostResponse>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  const { created_at_timestamp, created_at_date_string, weight } =
    req.body as WeightPostRequest;

  const db = admin.firestore();

  const data: BodyWeight = {
    id: uuid(),
    created_at_timestamp,
    created_at_date_string,
    weight,
  };

  await db
    .collection("users")
    .doc(tokenPayload.user_id)
    .collection("bodyWeights")
    .doc(data.id)
    .set(data);

  res.json({ data });
};

const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  const { id } = req.query as WeightDeleteRequest;

  if (!id) {
    res.status(400).json({ message: "Missing id or type" });
    return;
  }

  const db = admin.firestore();

  try {
    await db
      .collection("users")
      .doc(tokenPayload.user_id)
      .collection("bodyWeights")
      .doc(id)
      .delete();

    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
