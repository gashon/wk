import Image from "next/image";
import { Inter } from "next/font/google";

import { WorkoutContainer } from "@/features/workout";
import { PageLayout } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <PageLayout title={"wk logs"}></PageLayout>;
}
