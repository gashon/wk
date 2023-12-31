import Image from "next/image";
import { Inter } from "next/font/google";

import { WeightContainer } from "@/features/weight";
import { PageLayout } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PageLayout title={"weight logs"}>
      <WeightContainer />
    </PageLayout>
  );
}
