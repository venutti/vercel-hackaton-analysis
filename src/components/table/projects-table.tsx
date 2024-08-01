import { Project } from "@/lib/interfaces";
import TableContainer from "./table-container";

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold">Proyectos</h2>
      <TableContainer projects={projects} />
    </div>
  );
}
