import { activityProjectAssetFiles } from "./portfolio-assets.generated";

export type ActivityProject = {
  client: string;
  completionValue?: number;
  duration?: string;
  expectedStart: string;
  location: string;
  name: string;
  partner: string;
  progressState: "In progress" | "Completed";
  sector: string;
  slug: string;
  status: "Under Execution";
  targetValue?: number;
};

export const activityProjects: ActivityProject[] = [
  {
    slug: "vegwati-hospital-saharanpur",
    name: "Vegwati Hospital Saharanpur",
    client: "Dr Anuj Kumar",
    sector: "Commercial & Industrial Building",
    partner: "Shree Ganesh Enterprises (SGE) & Arc Eleven Architect",
    targetValue: 25.44,
    completionValue: 15.5,
    expectedStart: "17 Mar 2026",
    duration: "6 months",
    status: "Under Execution",
    progressState: "In progress",
    location: "Saharanpur, Uttar Pradesh",
  },
  {
    slug: "saraswati-vihar-pitampura",
    name: "E-826 Saraswati Vihar, Pitampura",
    client: "Private Client / Direct",
    sector: "Engineering & Turnkey Projects",
    partner: "Shree Ganesh Enterprises (SGE) & Arc Eleven Architect",
    completionValue: 12.5,
    expectedStart: "05 May 2026",
    status: "Under Execution",
    progressState: "In progress",
    location: "E-826, Saraswati Vihar, Pitampura, Delhi",
  },
  {
    slug: "elite-fitness-rohini",
    name: "Elite Fitness, Rohini Sector 22",
    client: "Private Client / Direct",
    sector: "Commercial & Industrial Building",
    partner: "Shree Ganesh Enterprises (SGE) & Arc Eleven Architect",
    completionValue: 1.65,
    expectedStart: "08 Aug 2026",
    status: "Under Execution",
    progressState: "In progress",
    location: "Rohini Sector 22, Delhi",
  },
];

export function getActivityProgress(project: ActivityProject) {
  if (!project.targetValue || project.completionValue === undefined) {
    return null;
  }

  return Math.min(100, Math.round((project.completionValue / project.targetValue) * 100));
}

export function getActivityProject(slug: string) {
  return activityProjects.find((project) => project.slug === slug);
}

export function getActivityProjectImages(project: ActivityProject) {
  const folder = `activity-projects/${project.slug}`;

  return (activityProjectAssetFiles[folder] ?? []).map((filename) => ({
    alt: `${project.name} - ${filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")}`,
    src: `/${folder}/${filename}`,
  }));
}
