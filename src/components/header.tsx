import { TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function Header() {
  return (
    <header>
      <h1 className="text-4xl font-bold text-center">Hackatón Vercel 2024</h1>
      <p className="text-sm text-center text-muted-foreground">
        9 de Julio - 6 de Agosto
      </p>

      <Alert className="max-w-[85ch] mt-6 p-6">
        <AlertTitle className="mb-4 flex gap-2 text-yellow-500">
          <TriangleAlertIcon className="size-4" />
          ¡Leer con atención!
        </AlertTitle>
        <AlertDescription>
          Esta página está diseñada para extraer y analizar los datos de los
          proyectos que participan en el Hackatón Vercel 2024. Mediante el uso
          del Vercel SDK AI se evalúan y analizan TODOS los proyectos,
          puntuándolos y categorizándolos de manera imparcial.{" "}
          <a
            className="text-purple-500 hover:underline"
            target="_blank"
            href="https://github.com/venutti/vercel-hackaton-analysis"
          >
            Acá podés ver el repo.
          </a>
          <br />
          <br />
          Las métricas generadas son absolutamente objetivas. No se premiará con
          un mayor puntaje al autor de esta página. Aunque me encantaría ganar,
          el repositorio es público. Si querés perder horas y horas tratando de
          ver si hice trampa podés hacerlo. Suerte con eso ;).
          <br />
          <br />
          <strong>¿Descubriste que hice trampa?</strong> ¡Perfecto! Podés
          presentar tu queja directamente al{" "}
          <a
            className="text-purple-500 hover:underline"
            target="_blank"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Instagram de Midu
          </a>
          , botón.
          <br />
          <br />
          ¡Que gane el mejor!
        </AlertDescription>
      </Alert>
    </header>
  );
}
