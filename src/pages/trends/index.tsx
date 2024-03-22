import { Inter } from "next/font/google";

import { PageLayout } from "@/layouts";

import { TrendContainer, TrendsGraph } from "@/features/trends/components";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function TrendsPage() {
  return (
    <PageLayout title={"trends"}>
      <TrendContainer>
        <TrendsGraph />
      </TrendContainer>
      <Footer wkLink bodyWeightLink />
    </PageLayout>
  );
}
