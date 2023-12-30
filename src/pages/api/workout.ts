import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

import {
  Workout,
  WorkoutDeleteRequest,
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
  res: NextApiResponse<WorkoutGetResponse | { message: string }>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  // TODO(gashon) support range queries
  const { type, start_timestamp, end_timestamp } =
    req.query as Partial<WorkoutGetRequest>;

  if (!type) {
    res.json({
      message: "type is required",
    });
    return;
  }

  const db = admin.firestore();

  let query = db
    .collection("users")
    .doc(tokenPayload.user_id)
    .collection("workouts")
    .where("type", "==", type)
    .orderBy("created_at_timestamp", "desc");

  if (start_timestamp) {
    query = query.where(
      "created_at_timestamp",
      ">=",
      parseInt(start_timestamp),
    );
  }
  if (end_timestamp) {
    query = query.where("created_at_timestamp", "<=", parseInt(end_timestamp));
  }

  try {
    const querySnapshot = await query.get();

    const documents = querySnapshot.docs.map((doc) => doc.data() as Workout);

    res.json({ data: documents });
  } catch (err) {
    console.log(err);
    res.json({ message: "failed" });
  }
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
    .collection("users")
    .doc(tokenPayload.user_id)
    .collection("workouts")
    .doc(data.id)
    .set(data);

  res.json({ data });
};

const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) => {
  const { tokenPayload } = attachOrRetrieveAnonToken(req, res);

  const { id } = req.query as WorkoutDeleteRequest;

  if (!id) {
    res.status(400).json({ message: "Missing id or type" });
    return;
  }

  const db = admin.firestore();

  try {
    await db
      .collection("users")
      .doc(tokenPayload.user_id)
      .collection("workouts")
      .doc(id)
      .delete();

    res.json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
