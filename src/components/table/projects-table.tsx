import { Project } from "@/lib/interfaces";
import TableContainer from "./table-container";

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Proyectos</h2>
      <TableContainer projects={projects} />
    </div>
  );
}
