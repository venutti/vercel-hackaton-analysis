import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Evaluation, Project } from "./interfaces";
import { cache } from "react";

const categories = [
  "Turismo",
  "Análisis de Datos",
  "Asistentes Virtuales",
  "Reconocimiento de Imagen",
  "Procesamiento de Lenguaje Natural",
  "Herramientas para Desarrolladores",
  "Aplicaciones de Salud",
  "Fintech",
  "E-commerce",
  "Educación",
] as const;

const evaluationSchema = z.object({
  category: z.enum(categories),
  complexity: z.number(),
  originality: z.number(),
  quality: z.number(),
  utility: z.number(),
});

export const evaluateProject = cache(
  async (project: Project): Promise<Evaluation> => {
    const { object: evaluation } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: evaluationSchema,
      prompt: `
      Tenés que actuar como un reviewer de la Hackatón Vercel 2024, en donde cada participante tiene que subir un proyecto que use el nuevo paquete Vercel AI SDK de alguna manera.

      Tu deber es extraer los siguientes datos del proyecto que te voy a pasar para analizar:
      *category: categoría en la cual puedas encasillar el proyecto, dentro de las siguientes disponibles: ${categories}
      *complexity: un número del 0 al 100 que represente la complejidad del proyecto. Ten en cuenta aspectos como la tecnología usada, el nivel de detalle y la cantidad de funcionalidades implementadas. 0 es muy simple y 100 es muy complejo.
      *originality: un número del 0 al 100 que represente la originalidad del proyecto. Considera qué tan novedosa es la idea y si aporta algo nuevo o único en comparación con otros proyectos. 0 es poco original y 100 es muy original.
      *quality: un número del 0 al 100 que represente la calidad de la documentación proporcionada del proyecto. Evalúa la claridad, el detalle y la facilidad para entender e implementar el proyecto siguiendo la documentación. 0 es muy baja y 100 es muy alta.
      *utility: un número del 0 al 100 que represente la utilidad del proyecto. Considera qué tan útil y aplicable es el proyecto para los usuarios finales o el público objetivo. 0 es poco útil y 100 es muy útil.

      Esta es el proyecto:
      ${project.body}

      Devolvé la evaluación que hiciste en formato JSON
      `,
    });

    return evaluation;
  }
);
