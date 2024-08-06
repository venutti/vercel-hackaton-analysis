"use client";

import Image from "next/image";
import { ProjectWithEvaluation } from "@/lib/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import TooltipLink from "./tooltip-link";
import { ArrowUpIcon, CircleDotIcon, CodeIcon, RocketIcon } from "lucide-react";
import EvaluationScore from "./evaluation-score";
import { Button } from "../ui/button";
import Podium from "./podium";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<ProjectWithEvaluation>[] = [
  {
    id: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const avatarUrl = row.original.user.avatarUrl;
      const githubUserURL = row.original.user.htmlUrl;
      return (
        <div className="flex items-center">
          <TooltipLink href={githubUserURL} label={"Ver perfil en GitHub"}>
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-md"
            />
          </TooltipLink>
        </div>
      );
    },
  },
  {
    id: "projectName",
    header: "Nombre del proyecto",
    cell: ({ row, table }) => {
      const { projectName, category } = row.original;

      const isShowingPodium = !!table
        .getAllColumns()
        .find((col) => col.id === "totalScore")
        ?.getIsSorted();

      const visibleRows = table.getRowModel().rows;
      const rowIndexInView = visibleRows.findIndex(
        (visibleRow) => visibleRow.id === row.id
      );
      const isPodiumCell = rowIndexInView < 5 && isShowingPodium;

      return (
        <div>
          {isPodiumCell ? (
            <Podium project={row.original} top={rowIndexInView + 1} />
          ) : (
            <p>{projectName}</p>
          )}
          <Badge className="mt-1">{category}</Badge>
        </div>
      );
    },
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
