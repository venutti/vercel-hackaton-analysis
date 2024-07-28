import { generateProjectJSON } from "./ai";
import { Issue, Project } from "./interfaces";

const ISSUES_URL =
  "https://api.github.com/repos/midudev/hackaton-vercel-2024/issues";

export async function getIssues(): Promise<Issue[]> {
  try {
    const issues: Issue[] = [];
    const issuesPerPage = 100;
    let page = 1;

    while (true) {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("per_page", issuesPerPage.toString());
      params.set("state", "open");

      const res = await fetch(ISSUES_URL + "?" + params.toString());

      if (!res.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await res.json();
      issues.push(...data);

      if (data.length < issuesPerPage) {
        break;
      }

      page++;
    }

    return issues;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProjectsInfo(): Promise<Project[]> {
  try {
    const issues = await getIssues();
    const projects = issues.map((issue) => generateProjectJSON(issue.body));
    return Promise.all(projects);
  } catch (error) {
    console.error(error);
    return [];
  }
}
