import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DistributionChart from "./distribution-chart";
import AIResume from "./ai-resume";
import { Suspense } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { Project } from "@/lib/interfaces";

type Props = {
  projects: Project[];
};

export default async function ProjectsResume({ projects }: Props) {
  const totalProjects = projects.length;
  let fullyCompliantCount = 0;
  let onlyDeployedCount = 0;
  let onlyVercelSDKCount = 0;
  let nonCompliantCount = 0;

  for (const project of projects) {
    if (project.isDeployed && project.usesVercel) {
      fullyCompliantCount++;
    } else if (project.isDeployed) {
      onlyDeployedCount++;
    } else if (project.usesVercel) {
      onlyVercelSDKCount++;
    } else {
      nonCompliantCount++;
    }
  }

  return (
    <Card className="flex flex-col bg-indigo-950 w-full">
      <CardHeader className="flex items-center">
        <CardTitle>Distribución de los proyectos</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pt-2 pb-0">
        <DistributionChart
          totalProjects={totalProjects}
          fullyCompliantCount={fullyCompliantCount}
          nonCompliantCount={nonCompliantCount}
          onlyDeployedCount={onlyDeployedCount}
          onlyVercelSDKCount={onlyVercelSDKCount}
        />
      </CardContent>

      <CardFooter>
        <Suspense
          fallback={
            <LoaderCircleIcon className="animate-spin text-muted-foreground mx-auto size-5" />
          }
        >
          <AIResume
            totalProjects={totalProjects}
            fullyCompliantCount={fullyCompliantCount}
            nonCompliantCount={nonCompliantCount}
            onlyDeployedCount={onlyDeployedCount}
            onlyVercelSDKCount={onlyVercelSDKCount}
          />
        </Suspense>
      </CardFooter>
    </Card>
  );
}
