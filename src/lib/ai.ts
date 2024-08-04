import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Evaluation, Project } from "./interfaces";
import { cache } from "react";

const evaluationSchema = z.object({
  category: z.string(),
  complexity: z.number(),
  originality: z.number(),
  quality: z.number(),
  utility: z.number(),
});

export const evaluationsSchema = z.array(evaluationSchema);

export const evaluateProjects = cache(
  async (projects: Project[]): Promise<Evaluation[]> => {
    const { object: evaluations } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: evaluationsSchema,
      prompt: `
      Tenés que actuar como un reviewer de la Hackatón Vercel 2024, en donde cada participante tiene que subir un proyecto que use el nuevo paquete Vercel AI SDK de alguna manera.
      Tu deber es analizar toda la lista de proyectos y categorizarlos, con el fin de agruparlos por categoría.

      Por cada projecto deberás extraer los siguientes datos:
      *category: categoría en la cual puedas encasillar el proyecto
      *complexity: un número del 0 al 100 que represente la complejidad del proyecto. 0 es muy simple y 100 es muy complejo
      *originality: un número del 0 al 100 que represente la originalidad del proyecto. 0 es poco original y 100 es muy original
      *quality: un número del 0 al 100 que represente la calidad de la documentación proporcionada del proyecto. 0 es muy baja y 100 es muy alta
      *utility: un número del 0 al 100 que represente la utilidad del proyecto. 0 es poco útil y 100 es muy útil
      
      Por cada proyecto, debe devolver un objeto con las mismas claves que el schema de evaluación

      Esta es la lista de proyectos:
      ${projects.map((project) => project.body)}

      Deberás devolver un array en donde extraigas de cada elemento de la lista de proyectos un objeto con las mismas claves que el schema de evaluación
      Devolvé el array de evaluaciones
      `,
    });

    return evaluations;
  }
);
