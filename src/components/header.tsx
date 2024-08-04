import { TriangleAlertIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Header() {
  return (
    <header>
      <h1 className="text-4xl font-bold text-center">Hackatón Vercel 2024</h1>
      <p className="text-sm text-center text-muted-foreground">
        9 de Julio - 6 de Agosto
      </p>

      <Accordion className="w-[80ch] mx-auto my-6" type="single" collapsible>
        <AccordionItem value="item-1" className="border-y">
          <AccordionTrigger>
            <div className="flex gap-2 text-yellow-500 text-lg items-center">
              <TriangleAlertIcon className="size-6" />
              ¡Leer con atención!
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Esta página está diseñada para extraer y analizar los datos de los
            proyectos que participan en el Hackatón Vercel 2024. Mediante el uso
            del Vercel SDK AI se evalúan y analizan TODOS los proyectos,
            puntuándolos y categorizándolos de manera imparcial. <br />
            <br />
            Las métricas generadas son absolutamente objetivas. No se premiará
            con un mayor puntaje al autor de esta página. Aunque me encantaría
            ganar,{" "}
            <a
              className="text-purple-400 hover:underline"
              target="_blank"
              href="https://github.com/venutti/vercel-hackaton-analysis"
            >
              el repositorio es público
            </a>
            . Si querés perder horas y horas tratando de ver si hice trampa
            podés hacerlo. Suerte con eso ;).
            <br />
            <br />
            ¡Que gane el mejor!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </header>
  );
}
