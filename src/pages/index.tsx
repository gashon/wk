import Image from "next/image";
import { Inter } from "next/font/google";

import { WorkoutContainer } from "@/features/workout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center py-10">
      <div className="w-11/12 lg:w-3/4">
        <h1 className="text-2xl">Logs</h1>
        <WorkoutContainer />
      </div>
    </main>
  );
}
