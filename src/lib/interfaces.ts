export interface Project {
  htmlUrl: string;
  title: string;
  user: {
    avatarUrl: string;
    htmlUrl: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  body: string;
  usesVercel: boolean;
  isDeployed: boolean;
  projectName: string;
  repoUrl: string;
  projectUrl: string;
}

export interface IssueApiResponse {
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

export interface Evaluation {
  category: string;
  originality: number;
  complexity: number;
  utility: number;
  quality: number;
}

export interface ProjectMetrics {
  totalProjects: number;
  fullyCompliantCount: number;
  onlyDeployedCount: number;
  onlyVercelSDKCount: number;
  nonCompliantCount: number;
}
