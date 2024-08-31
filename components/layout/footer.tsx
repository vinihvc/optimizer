import { CONFIG } from "@/configs/site"

export const Footer = () => {
	return (
		<footer className="container py-10">
			<div className="flex justify-end">
				<span className="text-sm leading-loose">
					Built by{" "}
					<a
						href={CONFIG.twitter}
						target="_blank"
						rel="noreferrer noopener nofollow"
						className="font-medium underline underline-offset-4"
					>
						vinihvc
					</a>
				</span>
			</div>
		</footer>
	)
}
