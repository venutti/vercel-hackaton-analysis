import ProjectCategories from "@/components/categories/project-categories";
import Header from "@/components/header";
import ProjectsResume from "@/components/resume/projects-resume";
import ScrollButton from "@/components/scroll-button";
import ProjectsTable from "@/components/table/projects-table";
import ProjectsTimeline from "@/components/time/projects-timeline";
import { getProjects } from "@/lib/issues";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="py-14 px-24">
      <Header />
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row mt-8 lg:items-stretch">
        <ProjectsResume projects={projects} />
        <ProjectsTimeline projects={projects} />
      </div>
      <div className="mt-6 flex justify-center">
        <ProjectCategories projects={projects} />
      </div>
      <ProjectsTable projects={projects} />
      <ScrollButton targetId="projects" label="Ver proyectos" />
    </main>
  );
}
