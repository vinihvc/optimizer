import { CONFIG } from "@/configs/site"
import { Github, Twitter } from "lucide-react"
import Link from "next/link"

import { Button } from "../ui/button"

export const Header = () => {
	return (
		<header className="sticky top-0 z-40 w-full border-b">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 ">
				<div>
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-bold tracking-tight">Optimizer</span>
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						<Button variant="ghost" size="icon" asChild>
							<Link
								href={CONFIG.github}
								target="_blank"
								rel="noreferrer noopener nofollow"
							>
								<span className="sr-only">Visit Github</span>
								<Github />
							</Link>
						</Button>

						<Button variant="ghost" size="icon" asChild>
							<Link
								href={CONFIG.twitter}
								target="_blank"
								rel="noreferrer noopener nofollow"
							>
								<span className="sr-only">Visit Twitter</span>
								<Twitter />
							</Link>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	)
}
