import Image from "next/image";
import { Inter } from "next/font/google";

import { WorkoutContainer } from "@/features/workout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <WorkoutContainer />
    </main>
  );
}
