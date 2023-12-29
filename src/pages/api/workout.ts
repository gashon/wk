// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

import {
  Workout,
  WorkoutGetRequest,
  WorkoutGetResponse,
  WorkoutPostRequest,
  WorkoutPostResponse,
} from "@/types";
import { attachOrRetrieveAnonToken } from "@/util/attach-jwt";
import { admin } from "@/lib/firebase-admin";

type Response =
  | {
      message: string;
    }
  | WorkoutPostResponse
  | WorkoutGetResponse;

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
  res: NextApiResponse<WorkoutGetResponse>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  // TODO(gashon) support range queries
  const { type } = req.query as WorkoutGetRequest;

  const db = admin.firestore();

  const querySnapshot = await db
    .doc("users")
    .collection(tokenPayload.user_id)
    .doc("workouts")
    .collection(type)
    .orderBy("created_at_timestamp", "desc")
    .get();

  const documents = querySnapshot.docs.map((doc) => doc.data() as Workout);
  res.json({ data: documents });
};

const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<WorkoutPostResponse>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  const {
    created_at_timestamp,
    created_at_date_string,
    type,
    label,
    repititions,
    weight,
  } = req.body as WorkoutPostRequest;

  const db = admin.firestore();

  const data: Workout = {
    id: uuid(),
    created_at_timestamp,
    created_at_date_string,
    type,
    label,
    repititions,
    weight,
  };

  await db
    .doc("users")
    .collection(tokenPayload.user_id)
    .doc("workouts")
    .collection(type)
    .add(data);

  res.json({ data });
};
