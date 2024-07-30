"use client";

import { ProjectWithEvaluation } from "@/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import TooltipLink from "./tooltip-link";
import { CircleDotIcon, CodeIcon, RocketIcon } from "lucide-react";
import EvaluationScore from "./evaluation-score";

export const columns: ColumnDef<ProjectWithEvaluation>[] = [
  {
    header: "Nombre del proyecto",
    accessorKey: "projectName",
  },
  {
    header: "Originalidad",
    accessorKey: "originality",
    cell: ({ row }) => {
      const originality = row.original.originality;
      return <EvaluationScore score={originality} />;
    },
  },
  {
    header: "Complejidad",
    accessorKey: "complexity",
    cell: ({ row }) => {
      const complexity = row.original.complexity;
      return <EvaluationScore score={complexity} />;
    },
  },
  {
    header: "Utilidad",
    accessorKey: "utility",
    cell: ({ row }) => {
      const utility = row.original.utility;
      return <EvaluationScore score={utility} />;
    },
  },
  {
    header: "Calidad",
    accessorKey: "quality",
    cell: ({ row }) => {
      const quality = row.original.quality;
      return <EvaluationScore score={quality} />;
    },
  },
  {
    header: "Links",
    cell: ({ row }) => {
      const repoUrl = row.original.repoUrl;
      const projectUrl = row.original.projectUrl;
      const issueUrl = row.original.htmlUrl;

      return (
        <div className="flex gap-4">
          <TooltipLink href={repoUrl} label={"Ver repositorio"}>
            <CodeIcon />
          </TooltipLink>

          <TooltipLink href={issueUrl} label={"Ver issue"} disabled={!issueUrl}>
            <CircleDotIcon />
          </TooltipLink>

          <TooltipLink
            href={projectUrl}
            label={"Ver proyecto"}
            disabled={!projectUrl}
          >
            <RocketIcon />
          </TooltipLink>
        </div>
      );
    },
  },
];
