import { SEO } from "@/configs/seo"
import type { Metadata } from "next"

export const seoMetadata: Metadata = {
	metadataBase: new URL(SEO.url),
	title: { absolute: SEO.title, template: `%s // ${SEO.title}` },
	applicationName: SEO.title,
	description: SEO.description,
	keywords: SEO.keywords,
	openGraph: {
		locale: "en",
		title: SEO.title,
		description: SEO.description,
		url: SEO.url,
		type: "website",
		images: [
			{
				url: "/images/thumb.png",
				width: 1200,
				height: 630,
				alt: SEO.description,
			},
		],
		siteName: SEO.title,
	},
	twitter: {
		site: SEO.twitter,
	},
}
