import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Evaluation, Project } from "./interfaces";
import { cache } from "react";

const categories = [
  "Automatización",
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
      *complexity: un número del 0 al 100 que represente la complejidad del proyecto. 0 es muy simple y 100 es muy complejo
      *originality: un número del 0 al 100 que represente la originalidad del proyecto. 0 es poco original y 100 es muy original
      *quality: un número del 0 al 100 que represente la calidad de la documentación proporcionada del proyecto. 0 es muy baja y 100 es muy alta
      *utility: un número del 0 al 100 que represente la utilidad del proyecto. 0 es poco útil y 100 es muy útil

      Esta es el proyecto:
      ${project.body}

      Devolvé la evaluación que hiciste en formato JSON
      `,
    });

    return evaluation;
  }
);
