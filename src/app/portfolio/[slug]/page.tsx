import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/sections/portfolio/project-detail";
import { portfolioProjects } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

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
  const title = `${project.title} | XK 技術作品集`;
  const description = project.metadataDescription;
  const url = new URL(`/portfolio/${project.slug}`, siteConfig.url).href;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: false },
    openGraph: { title, description, url, siteName: siteConfig.name, locale: "zh_TW", type: "website" },
  };
}

export default async function PortfolioProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  return <ProjectDetail project={getProject(slug)} />;
}
