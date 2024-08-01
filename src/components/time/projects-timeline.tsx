import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Project } from "@/lib/interfaces";
import TimelineChart from "./timeline-chart";

type Props = {
  projects: Project[];
};

export default async function TimeInfo({ projects }: Props) {
  const issuesSortedByDate = projects.sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );

  const projectsByDate = issuesSortedByDate.reduce((acc, issue) => {
    const date = new Date(issue.updatedAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(issue);
    return acc;
  }, {} as { [key: string]: Project[] });

  const projectsByDateCount = Object.entries(projectsByDate).map((entry) => {
    const [date, issues] = entry;
    return {
      date,
      count: issues.length,
    };
  });

  return (
    <Card className="flex flex-col bg-slate-900 w-full max-w-3xl px-6 justify-around">
      <CardHeader className="flex items-center">
        <CardTitle>Frecuencia de subidas</CardTitle>
        <CardDescription>
          Cantidad diaria de presentaciones de los proyectos
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TimelineChart dates={projectsByDateCount} />
      </CardContent>
    </Card>
  );
}
