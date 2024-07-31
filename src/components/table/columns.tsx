"use client";

import { ProjectWithEvaluation } from "@/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import TooltipLink from "./tooltip-link";
import { ArrowUpIcon, CircleDotIcon, CodeIcon, RocketIcon } from "lucide-react";
import EvaluationScore from "./evaluation-score";
import { Button } from "../ui/button";

export const columns: ColumnDef<ProjectWithEvaluation>[] = [
  {
    header: "Nombre del proyecto",
    accessorKey: "projectName",
  },
  {
    accessorKey: "originality",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(true)}
          disabled={!!column.getIsSorted()}
        >
          Originalidad
          <ArrowUpIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const originality = row.original.originality;
      return <EvaluationScore score={originality} />;
    },
  },
  {
    accessorKey: "complexity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(true)}
          disabled={!!column.getIsSorted()}
        >
          Complejidad
          <ArrowUpIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const complexity = row.original.complexity;
      return <EvaluationScore score={complexity} />;
    },
  },
  {
    accessorKey: "utility",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(true)}
          disabled={!!column.getIsSorted()}
        >
          Utilidad
          <ArrowUpIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const utility = row.original.utility;
      return <EvaluationScore score={utility} />;
    },
  },
  {
    accessorKey: "quality",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(true)}
          disabled={!!column.getIsSorted()}
        >
          Calidad
          <ArrowUpIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quality = row.original.quality;
      return <EvaluationScore score={quality} />;
    },
  },
  {
    id: "links",
    cell: ({ row }) => {
      const repoUrl = row.original.repoUrl;
      const projectUrl = row.original.projectUrl;
      const issueUrl = row.original.htmlUrl;

      return (
        <div className="flex gap-5 px-4">
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
  {
    id: "totalScore",
    enableHiding: true,
    accessorFn: ({ originality, complexity, utility, quality }) => {
      const ORIGINALITY_SCALAR = 0.3;
      const COMPLEXITY_SCALAR = 0.2;
      const QUALITY_SCALAR = 0.2;
      const UTILITY_SCALAR = 0.3;

      return (
        ORIGINALITY_SCALAR * originality +
        COMPLEXITY_SCALAR * complexity +
        QUALITY_SCALAR * quality +
        UTILITY_SCALAR * utility
      );
    },
  },
];
