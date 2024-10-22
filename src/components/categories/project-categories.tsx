import { evaluateProject } from "@/lib/ai";
import { Project, ProjectWithEvaluation } from "@/lib/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CategoriesChart from "./categories-chart";

export type CategoriesCount = { category: string; count: number };

type Props = {
  projects: Project[];
};

export default async function ProjectCategories({ projects }: Props) {
  const projectsWithEvaluations: ProjectWithEvaluation[] = await Promise.all(
    projects.map(async (project) => {
      const evaluation = await evaluateProject(project);
      return { ...project, ...evaluation };
    })
  );

  const categoriesCount = projectsWithEvaluations.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = 0;
    }
    acc[project.category]++;
    return acc;
  }, {} as Record<string, number>);

  const categories: CategoriesCount[] = Object.keys(categoriesCount).map(
    (category) => ({
      category,
      count: categoriesCount[category],
    })
  );

  return (
    <Card className="flex flex-col bg-neutral-900 w-full max-w-3xl">
      <CardHeader className="flex items-center">
        <CardTitle>Análisis de categorías</CardTitle>
        <CardDescription>
          Los proyectos presentados han seguido estas tendencias
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <CategoriesChart categories={categories} />
      </CardContent>
    </Card>
  );
}
