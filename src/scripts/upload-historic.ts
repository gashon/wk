import "dotenv/config";
import { admin } from "../lib/firebase-admin";
import { data } from "./data/weight";

const db = admin.firestore();

interface BodyWeight {
  id: string;
  created_at_timestamp: number;
  created_at_date_string: string;
  weight: number;
}

async function bulkUploadBodyWeights(data: BodyWeight[], userId: string) {
  try {
    console.log("env", process.env);
    const userBodyWeightsRef = db
      .collection("users")
      .doc(userId)
      .collection("bodyWeights");

    const uploadPromises = data.map(async (item) => {
      await userBodyWeightsRef.doc(item.id).set(item);
    });

    await Promise.all(uploadPromises);
    console.log("All data uploaded successfully.");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

const userId = "25b10946-7b4c-48dc-863b-b71b5c47dce7";
bulkUploadBodyWeights(data, userId);

// Note: Ensure that the uuid() function is defined in your environment.
