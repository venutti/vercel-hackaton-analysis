import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Project, ProjectMetrics } from "./interfaces";
import { cache } from "react";

const projectSchema = z.object({
  usesVercel: z.boolean(),
  isDeployed: z.boolean(),
  name: z.string(),
  projectName: z.string(),
  projectDescription: z.string(),
  repoUrl: z.string(),
  projectUrl: z.string(),
  instructions: z.string(),
});

export const generateProjectJSON = cache(
  async (rawProject: string): Promise<Project> => {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: projectSchema,
      prompt: `Extraé del siguiente texto la información relevante al proyecto, según el esquema JSON que te proporciono. Deberás extraer la información en formato JSON. Eliminá de la respuesta cualquier \n o \r que encuentres en el texto original.
    
    Ejemplo del texto:
    "### Señala los requisitos cumplidos.\r\n\r\n- [x] Mi aplicación usa Vercel SDK AI de alguna forma.\r\n- [ ] Mi aplicación está desplegada y funciona\r\n\r\n\r\n### Escribe tu nombre o el del equipo\r\n\r\nDevJL\r\n\r\n### Nombre del proyecto\r\n\r\nminicue\r\n\r\n### Descripción del proyecto\r\n\r\nMi proyecto es un generador de guiones literarios básico para videos de formato corto, en este caso para Tiktok.\r\n\r\nhttps://github.com/user-attachments/assets/47e2b1d7-03c5-4b13-a5e8-f162940a3df1\r\n\r\n## ¿Cómo funciona? ⚙️\r\n\r\nPor medio de 3 parámetros, como se ve en el video de demostración, que son el tema, la duración del video y el idioma que elija, el usuario tendrá su guión en menos de 1 minuto; también tiene funcionalidad de copiar el código como de limpiar los campos del formulario como del resultado. \r\n\r\n## ¿Qué utiliza?🛠️\r\n\r\n- Sveltekit\r\n- Tailwind CSS\r\n- Vercel AI SDK\r\n- Groq modelo 'llama3-8b-8192' (solo está limitado a 8k de tokens)\r\n\r\n### Limitaciones\r\n\r\nComo se menciona, el modelo que estoy usando es parte de Groq y tiene un número de tokens limitado a 8k por día; si se agotan los tokens no se puede volver a utilizar hasta el día siguiente.\r\n\r\nEl código se puede mejorar, ya que es la primera vez que uso Sveltekit, ya que solo he trabajado con astro y react y cualquier crítica o retroalimentación será recibida.\r\n\r\n### Repositorio de código\r\n\r\nhttps://github.com/devjhonluna/minicue\r\n\r\n### Proyecto desplegado\r\n\r\nhttps://minicue.netlify.app/\r\n\r\n### Instrucciones de configuración\r\n\r\nPuedes instalar el proyecto con las instrucciones del Readme [📖](https://github.com/devjhonluna/minicue?tab=readme-ov-file#ejecución-local)."

    Ejemplo de respuesta:
    {
      "usesVercel": true,
      "isDeployed": false,
      "name": "DevJL",
      "projectName": "minicue",
      "projectDescription": "Mi proyecto es un generador de guiones literarios básico para videos de formato corto, en este caso para Tiktok. https://github.com/user-attachments/assets/47e2b1d7-03c5-4b13-a5e8-f162940a3df1 ## ¿Cómo funciona? ⚙️ Por medio de 3 parámetros, como se ve en el video de demostración, que son el tema, la duración del video y el idioma que elija, el usuario tendrá su guión en menos de 1 minuto; también tiene funcionalidad de copiar el código como de limpiar los campos del formulario como del resultado. ## ¿Qué utiliza?🛠️ - Sveltekit - Tailwind CSS - Vercel AI SDK - Groq modelo 'llama3-8b-8192' (solo está limitado a 8k de tokens) ### Limitaciones\r\n\r\nComo se menciona, el modelo que estoy usando es parte de Groq y tiene un número de tokens limitado a 8k por día; si se agotan los tokens no se puede volver a utilizar hasta el día siguiente. El código se puede mejorar, ya que es la primera vez que uso Sveltekit, ya que solo he trabajado con astro y react y cualquier crítica o retroalimentación será recibida.",
      "repoUrl": "https://github.com/devjhonluna/minicue",
      "projectUrl": "https://minicue.netlify.app/",
      "instructions": "Puedes instalar el proyecto con las instrucciones del Readme [📖](https://github.com/devjhonluna/minicue?tab=readme-ov-file#ejecución-local)."
    }

    Texto:
    ${rawProject}
    `,
    });

    return object;
  }
);

export const generateMetricsResume = cache(
  async ({
    totalProjects,
    fullyCompliantCount,
    nonCompliantCount,
    onlyDeployedCount,
    onlyVercelSDKCount,
  }: ProjectMetrics): Promise<string> => {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Vercel ha lanzado una hackatón de proyectos para que usen Vercel SDK AI, un nuevo paquete.
      Los proyectos tienen 2 requisitos para participar. Deben usar Vercel SDK AI de alguna forma. Y pueden estar desplegados y funcionales.
      El único requisito obligatorio es usar Vercel SDK AI.

      Se recolectaron estas métricas de los proyectos que participan:
      Total de proyectos: ${totalProjects}
      Cantidad de proyectos que cumplen los 2 requisitos: ${fullyCompliantCount}
      Cantidad de proyectos que solo usan Vercel SDK AI: ${onlyVercelSDKCount}
      Cantidad de proyectos que solo están deployados: ${onlyDeployedCount}
      Cantidad de proyectos que no cumplen ningun requisito: ${nonCompliantCount}

      Basandote en esa información, generá y devolvé un texto a modo de resumen que pueda concluir una idea teniendo en cuenta esas métricas.
      El texto generado tiene que tener un máximo de 1 oración. Debe ser breve y no contener información redundante. No debés incluir los números de las métricas, ya que estarán mostrados en un gráfico de torta. 
      El texto generado debe funcionar como descripción al gráfico de torta.
      El texto debe concluir una idea basandose en los datos, no tiene que describirlos.
      `,
    });
    return text;
  }
);
