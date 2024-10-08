import { SEO } from "@/configs/seo"
import type { MetadataRoute } from "next"

const sitemap = (): MetadataRoute.Sitemap => {
	return [
		{
			url: SEO.url,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	]
}

export default sitemap
