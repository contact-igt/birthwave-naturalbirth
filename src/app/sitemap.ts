import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

const BASE_URL = "https://thebirthwave.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/doctors",
    "/services",
    "/natural-birth",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE_URL}/${s.slug}`,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
