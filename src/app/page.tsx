import Header from "@/components/header";
import ProjectsResume from "@/components/resume/projects-resume";
import ProjectsTable from "@/components/table/projects-table";
import ProjectsTimeline from "@/components/time/projects-timeline";
import { getProjects } from "@/lib/issues";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center py-14 px-24 gap-6">
      <Header />
      <div className="flex flex-col gap-6 lg:flex-row">
        <ProjectsResume projects={projects} />
        <ProjectsTimeline projects={projects} />
      </div>
      <ProjectsTable projects={projects} />
    </main>
  );
}
