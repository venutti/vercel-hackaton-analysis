import { getProjectsInfo } from "@/lib/issues";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import IssuesChart from "./issues-chart";
import { SparklesIcon } from "lucide-react";

export default async function IssuesInfo() {
  const issuesInfo = await getProjectsInfo();

  const issuesCount = issuesInfo.length;
  let isFullDeployedCount = 0;
  let isOnlyDeployedCount = 0;
  let onlyUsesVercelCount = 0;

  for (const issue of issuesInfo) {
    if (issue.isDeployed && issue.usesVercel) {
      isFullDeployedCount++;
    } else if (issue.isDeployed) {
      isOnlyDeployedCount++;
    } else if (issue.usesVercel) {
      onlyUsesVercelCount++;
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución de los proyectos</CardTitle>
        <CardDescription>
          Desglose de los proyectos según los requisitos que cumplen
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <IssuesChart
          issuesCount={issuesCount}
          isFullDeployedCount={isFullDeployedCount}
          isOnlyDeployedCount={isOnlyDeployedCount}
          onlyUsesVercelCount={onlyUsesVercelCount}
        />
      </CardContent>
      <CardFooter className="flex gap-2 text-sm">
        <SparklesIcon className="stroke-primary" />
        La mayoría de los proyectos están completamente deployados
      </CardFooter>
    </Card>
  );
}
