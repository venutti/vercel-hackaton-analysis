import { Project } from "@/lib/interfaces";
import TableContainer from "./table-container";

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  return <TableContainer projects={projects} />;
}
