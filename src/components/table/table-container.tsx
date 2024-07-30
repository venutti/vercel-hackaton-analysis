import { Project } from "@/lib/interfaces";
import Table from "./table";
import { evaluateProjects } from "@/lib/ai";

type Props = {
  projects: Project[];
};

export default async function TableContainer({ projects }: Props) {
  const evaluations = await evaluateProjects(projects);
  const projectsWithEvaluations = projects.map((project, index) => ({
    ...project,
    ...evaluations[index],
  }));

  return <Table projects={projectsWithEvaluations} />;
}
