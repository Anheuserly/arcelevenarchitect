import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectAccessLanding from "@/components/DirectAccessLanding";
import { getDirectAccessProfile, listDirectAccessSlugs } from "@/lib/directAccessProfiles";

type DirectAccessRouteProps = {
  params: Promise<{ directSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listDirectAccessSlugs().map((directSlug) => ({ directSlug }));
}

export async function generateMetadata({
  params,
}: DirectAccessRouteProps): Promise<Metadata> {
  const { directSlug } = await params;
  const profile = getDirectAccessProfile(directSlug);

  if (!profile) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${profile.name} | Arc 11 Architect`,
    description: profile.summary,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-image-preview": "none",
        "max-snippet": 0,
        "max-video-preview": 0,
      },
    },
    openGraph: {
      title: `${profile.name} | Arc 11 Architect`,
      description: profile.summary,
      images: [
        {
          url: profile.heroImage,
          alt: profile.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name} | Arc 11 Architect`,
      description: profile.summary,
      images: [profile.heroImage],
    },
  };
}

export default async function DirectAccessRoute({ params }: DirectAccessRouteProps) {
  const { directSlug } = await params;
  const profile = getDirectAccessProfile(directSlug);

  if (!profile) {
    notFound();
  }

  return <DirectAccessLanding profile={profile} />;
}
