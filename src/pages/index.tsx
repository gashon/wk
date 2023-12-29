import Image from "next/image";
import { Inter } from "next/font/google";

import { WorkoutForm } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <WorkoutForm />
    </main>
  );
}
