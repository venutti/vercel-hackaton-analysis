import { getProjectsInfo } from "@/lib/issues";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import IssuesChart from "./issues-chart";
import IssuesResume from "./issues-resume";
import { Suspense } from "react";

export default async function IssuesInfo() {
  const projectsInfo = await getProjectsInfo();

  const totalProjects = projectsInfo.length;
  let fullyCompliantCount = 0;
  let onlyDeployedCount = 0;
  let onlyVercelSDKCount = 0;
  let nonCompliantCount = 0;

  for (const project of projectsInfo) {
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
    <Card className="flex flex-col bg-indigo-950 max-w-md">
      <CardHeader className="flex items-center pb-0">
        <CardTitle>Distribución de los proyectos</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <IssuesChart
          totalProjects={totalProjects}
          fullyCompliantCount={fullyCompliantCount}
          nonCompliantCount={nonCompliantCount}
          onlyDeployedCount={onlyDeployedCount}
          onlyVercelSDKCount={onlyVercelSDKCount}
        />
      </CardContent>

      <CardFooter>
        <Suspense fallback={"Cargando..."}>
          <IssuesResume
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
