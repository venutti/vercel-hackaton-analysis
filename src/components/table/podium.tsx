import { Project } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

type Props = {
  top: number;
  project: Project;
};

export default function Podium({ top, project }: Props) {
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
      classes = "text-slate-700";
      break;
  }

  return (
    <p className={cn("text-lg font-semibold", classes)}>
      #{top} {project.projectName}
    </p>
  );
}
