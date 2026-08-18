import type { MetadataRoute } from "next";

/**
 * The broker calendar is reached by a link the estate hands out, never by
 * search. The page also sends `noindex`, but a crawler has to fetch a page to
 * read that — this keeps well-behaved ones from asking in the first place.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/availability", "/api/"],
    },
  };
}
