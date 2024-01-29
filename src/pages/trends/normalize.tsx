import { Inter } from "next/font/google";

import { PageLayout } from "@/layouts";
import { TrendContainer } from "@/features/trends/components";
import { Footer } from "@/components/ui/footer";
import { NormalizedTrendsGraph } from "@/features/trends/components/normalize-graph";

const inter = Inter({ subsets: ["latin"] });

export default function TrendsPage() {
  return (
    <PageLayout title={"trends"}>
      <TrendContainer>
        <NormalizedTrendsGraph />
      </TrendContainer>
      <Footer wkLink bodyWeightLink />
    </PageLayout>
  );
}
