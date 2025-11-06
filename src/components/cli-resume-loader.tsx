
"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const CliResume = dynamic(() => import("@/components/cli-resume"), {
  ssr: false,
  loading: () => <Skeleton className="w-full max-w-4xl h-[480px] rounded-lg" />,
});

export default function CliResumeLoader() {
  return <CliResume />;
}
