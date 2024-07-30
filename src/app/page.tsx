import ProjectsResume from "@/components/resume/projects-resume";
import ProjectsTimeline from "@/components/time/projects-timeline";
import { getProjects } from "@/lib/issues";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center py-14 px-24 gap-10">
      <header>
        <h1 className="text-4xl font-bold">Hackatón Vercel 2024</h1>
        <p className="text-sm text-center text-muted-foreground">
          9 de Julio - 6 de Agosto
        </p>
      </header>
      <div className="flex flex-col gap-10 lg:flex-row">
        <ProjectsResume projects={projects} />
        <ProjectsTimeline projects={projects} />
      </div>
    </main>
  );
}
