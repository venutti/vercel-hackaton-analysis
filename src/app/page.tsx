import IssuesInfo from "@/components/issues/issues-info";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 ">
      <Suspense fallback={<div>Cargando...</div>}>
        <IssuesInfo />
      </Suspense>
    </main>
  );
}
