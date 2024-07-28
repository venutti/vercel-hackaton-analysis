export interface Issue {
  html_url: string;
  title: string;
  user: {
    avatar_url: string;
    html_url: string;
    login: string;
  };
  created_at: string;
  updated_at: string;
  body: string;
}

export interface Project {
  usesVercel: boolean;
  isDeployed: boolean;
  name: string;
  projectName: string;
  projectDescription: string;
  repoUrl: string;
  projectUrl: string;
  instructions: string;
}

export interface ProjectMetrics {
  totalProjects: number;
  fullyCompliantCount: number;
  onlyDeployedCount: number;
  onlyVercelSDKCount: number;
  nonCompliantCount: number;
}
