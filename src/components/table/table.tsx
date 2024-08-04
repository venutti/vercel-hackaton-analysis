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
import { useEffect, useState } from "react";

type Props = {
  projects: ProjectWithEvaluation[];
};

export default function Table({ projects }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [message, setMessage] = useState(
    "Todos estos proyectos fueron rigurosamente puntuados"
  );
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

  useEffect(() => {
    if (isShowingPodium) {
      setMessage("¡Tachán! Acá están los mejores de los mejores");
    } else {
      setMessage("Todos estos proyectos fueron rigurosamente puntuados");
    }
  }, [isShowingPodium]);

  const handleShowPodium = () => {
    table
      .getAllColumns()
      .find((col) => col.id === "totalScore")
      ?.toggleSorting(true);
  };

  return (
    <div>
      <div className="flex mb-4 justify-end gap-2 items-center">
        <p className="mr-auto">{message}</p>
        {!isShowingPodium && (
          <Button
            size="lg"
            onClick={handleShowPodium}
            onMouseEnter={() =>
              setMessage("¿Estás seguro? Vas a romper el suspenso...")
            }
            onMouseLeave={() =>
              setMessage("Todos estos proyectos fueron rigurosamente puntuados")
            }
          >
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
              table.getRowModel().rows.map((row) => (
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
              ))
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
