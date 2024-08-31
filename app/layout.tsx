import type { Metadata, Viewport } from "next"

import { SEO } from "@/configs/seo"
import "@/styles/globals.css"

import { MediaQueriesDebug } from "@/components/debug/media-queries"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { fontSans } from "@/lib/font"
import { seoMetadata } from "@/lib/seo"

export const metadata: Metadata = seoMetadata

const RootLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={fontSans.variable}>
				<Header />

				<main className="flex flex-1 flex-col justify-center">{children}</main>

				<Footer />

				<MediaQueriesDebug />
			</body>
		</html>
	)
}

export default RootLayout
