import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/sections/portfolio/project-detail";
import { portfolioProjects } from "@/config/portfolio";
import { getSeoPage } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

function getProject(slug: string) {
  const project = portfolioProjects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return createPageMetadata(getSeoPage(`/portfolio/${project.slug}`), siteConfig);
}

export default async function PortfolioProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  return <ProjectDetail project={getProject(slug)} />;
}
