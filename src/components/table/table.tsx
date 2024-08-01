"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProjectWithEvaluation } from "@/lib/interfaces";
import { columns } from "./columns";
import { Button } from "../ui/button";
import { useState } from "react";
import Podium from "./podium";

type Props = {
  projects: ProjectWithEvaluation[];
};

export default function Table({ projects }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    totalScore: false,
  });

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  const isShowingPodium = !!table
    .getAllColumns()
    .find((col) => col.id === "totalScore")
    ?.getIsSorted();

  const handleShowPodium = () => {
    table
      .getAllColumns()
      .find((col) => col.id === "totalScore")
      ?.toggleSorting(true);
  };

  return (
    <div>
      <div className="flex mb-4 justify-end gap-2 items-center">
        <p className="mr-auto">
          Todos estos proyectos fueron rigurosamente puntuados
        </p>
        {!isShowingPodium && (
          <Button size="lg" onClick={handleShowPodium}>
            Mostrar podio
          </Button>
        )}
        <Button size="lg" variant="ghost" onClick={() => table.resetSorting()}>
          Resetear filtros
        </Button>
      </div>

      <div className="rounded-md border">
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) =>
                index < 3 && isShowingPodium ? (
                  <Podium
                    key={row.id}
                    top={index + 1}
                    project={row.original}
                    colSpan={row.getVisibleCells().length}
                  />
                ) : (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
}
