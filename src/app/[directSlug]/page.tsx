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
    title: profile.name,
    description: profile.description,
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
