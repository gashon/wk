import { PageLayout } from "@/layouts";
import { Inter } from "next/font/google";

import { TrendContainer } from "@/features/trends/components";

const inter = Inter({ subsets: ["latin"] });

export default function TrendsPage() {
  return (
    <PageLayout title={"trends"}>
      <TrendContainer />
    </PageLayout>
  );
}
