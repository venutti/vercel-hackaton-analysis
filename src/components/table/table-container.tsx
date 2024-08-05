import { Project, ProjectWithEvaluation } from "@/lib/interfaces";
import Table from "./table";
import { evaluateProject } from "@/lib/ai";

type Props = {
  projects: Project[];
};

export default async function TableContainer({ projects }: Props) {
  const projectsWithEvaluations: ProjectWithEvaluation[] = await Promise.all(
    projects.map(async (project) => {
      const evaluation = await evaluateProject(project);
      return { ...project, ...evaluation };
    })
  );

  return <Table projects={projectsWithEvaluations} />;
}
