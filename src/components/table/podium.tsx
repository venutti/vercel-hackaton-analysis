import { Project } from "@/lib/interfaces";
import { TableCell } from "../ui/table";
import { cn } from "@/lib/utils";

type Props = {
  top: number;
  project: Project;
  colSpan: number;
};

export default function Podium({ top, project, colSpan }: Props) {
  let classes = "";

  switch (top) {
    case 1:
      classes = "text-yellow-600";
      break;
    case 2:
      classes = "text-gray-500";
      break;
    case 3:
      classes = "text-amber-800";
      break;
    default:
  }

  return (
    <tr className="border-b">
      <TableCell colSpan={colSpan}>
        <span
          className={cn("text-lg font-semibold block text-center", classes)}
        >
          #{top} {project.projectName}
        </span>
      </TableCell>
    </tr>
  );
}
