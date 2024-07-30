import { IssueApiResponse, Project } from "./interfaces";

const ISSUES_URL =
  "https://api.github.com/repos/midudev/hackaton-vercel-2024/issues";

function extractGithubRepoUrlFromText(text: string): string {
  const githubRepoUrlRegex =
    /https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/g;
  const matches = text.match(githubRepoUrlRegex);
  return matches ? matches[0] : "";
}

function extractValidUrlFromText(text: string): string {
  const validUrlRegex =
    /(?:https?:\/\/[^\s\)]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?=[\s\)]|$)/g;
  const matches = text.match(validUrlRegex);
  return matches ? matches[0] : "";
}

function extractProjectFromIssue(data: IssueApiResponse): Project {
  const project = {
    htmlUrl: data.html_url,
    title: data.title,
    user: {
      avatarUrl: data.user.avatar_url,
      htmlUrl: data.user.html_url,
      name: data.user.login,
    },
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    body: data.body,
    usesVercel: false,
    isDeployed: false,
    projectName: "",
    repoUrl: "",
    projectUrl: "",
  };

  const vercelRegex =
    /- \[(x| )\] mi aplicación usa vercel sdk ai de alguna forma/i;
  const deployedRegex = /- \[(x| )\] mi aplicación está desplegada y funciona/i;

  const projectNameRegex = /### nombre del proyecto([\s\S]*?)###/i;
  const repoUrlRegex = /### repositorio de código([\s\S]*?)###/i;
  const projectUrlRegex = /### proyecto desplegado([\s\S]*?)###/i;

  const vercelMatch = data.body.match(vercelRegex);
  const deployedMatch = data.body.match(deployedRegex);

  if (vercelMatch) {
    project.usesVercel = vercelMatch[1].toLowerCase() === "x";
  }
  if (deployedMatch) {
    project.isDeployed = deployedMatch[1].toLowerCase() === "x";
  }

  const projectNameMatch = data.body.match(projectNameRegex);
  const repoUrlMatch = data.body.match(repoUrlRegex);
  const projectUrlMatch = data.body.match(projectUrlRegex);

  if (projectNameMatch) {
    project.projectName = projectNameMatch[1]
      .replaceAll("\n", "")
      .replaceAll("\r", "")
      .trim();
  }

  if (repoUrlMatch) {
    const rawRepoUrl = repoUrlMatch[1]
      .replaceAll("\n", "")
      .replaceAll("\r", "")
      .trim();

    project.repoUrl = extractGithubRepoUrlFromText(rawRepoUrl);
  }

  if (projectUrlMatch) {
    const rawProjectUrl = projectUrlMatch[1]
      .replaceAll("\n", "")
      .replaceAll("\r", "")
      .trim();

    project.projectUrl = extractValidUrlFromText(rawProjectUrl);
  }

  return project;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects: Project[] = [];
    const issuesPerPage = 100;
    let page = 1;

    while (true) {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("per_page", issuesPerPage.toString());
      params.set("state", "open");

      const res = await fetch(ISSUES_URL + "?" + params.toString(), {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data: IssueApiResponse[] = await res.json();

      const extractedProjects = data.map(extractProjectFromIssue);
      projects.push(...extractedProjects);

      if (data.length < issuesPerPage) {
        break;
      }

      page++;
    }

    return projects;
  } catch (error) {
    console.error(error);
    return [];
  }
}
