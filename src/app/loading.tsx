import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <LoaderCircleIcon className="animate-spin text-primary mx-auto size-10" />
    </main>
  );
}
