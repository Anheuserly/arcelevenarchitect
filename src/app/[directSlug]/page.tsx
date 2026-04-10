import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectAccessLanding from "@/components/DirectAccessLanding";
import { getDirectAccessProfile, listDirectAccessSlugs } from "@/lib/directAccessProfiles";
import { buildPageMetadata } from "@/lib/seo";

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
    return buildPageMetadata({
      title: "Profile Not Found",
      description: "The requested private profile page could not be found.",
      path: `/${directSlug}`,
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
    });
  }

  return buildPageMetadata({
    title: profile.name,
    description: profile.summary,
    path: `/${directSlug}`,
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
    images: [
      {
        url: profile.heroImage,
        alt: profile.heroAlt,
      },
    ],
  });
}

export default async function DirectAccessRoute({ params }: DirectAccessRouteProps) {
  const { directSlug } = await params;
  const profile = getDirectAccessProfile(directSlug);

  if (!profile) {
    notFound();
  }

  return <DirectAccessLanding profile={profile} />;
}
