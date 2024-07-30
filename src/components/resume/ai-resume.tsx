import { generateMetricsResume } from "@/lib/ai";
import { ProjectMetrics } from "@/lib/interfaces";

type Props = ProjectMetrics;

export default async function AIResume(props: Props) {
  const resume = await generateMetricsResume(props);
  return (
    <p className="flex gap-2 mx-6 my-2 text-sm text-muted-foreground items-baseline">
      {resume}
    </p>
  );
}
