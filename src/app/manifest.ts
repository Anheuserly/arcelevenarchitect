import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Arc 11",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4efe6",
    theme_color: "#f4efe6",
    lang: "en-IN",
    categories: ["architecture", "interior design", "portfolio", "design studio"],
    icons: [
      {
        src: "/brand/proportion-study.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/proportion-study.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
