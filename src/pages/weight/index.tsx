import { Inter } from "next/font/google";
import Link from "next/link";

import { WeightContainer } from "@/features/weight";
import { PageLayout } from "@/layouts";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PageLayout title={"weight logs"}>
      <WeightContainer />
      <Footer wkLink trendsLink />
    </PageLayout>
  );
}
