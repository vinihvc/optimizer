"use client"

import { UploadCloud } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"
import { FileUpload } from "@ark-ui/react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Switch } from "../ui/switch"
import { UploadItem } from "./upload.item"

interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Upload = (props: UploadProps) => {
	const { className, ...rest } = props

	const [convertImage, setConvertImage] = React.useState(true)

	return (
		<FileUpload.Root
			className={cn("bg-foreground/10 backdrop-blur p-5", className)}
			maxFiles={20}
			accept="image/*"
			{...rest}
		>
			<FileUpload.Label className="sr-only">File Upload</FileUpload.Label>

			<FileUpload.Dropzone
				className={cn(
					"flex flex-col items-center justify-center",
					"w-full h-64",
					"space-y-2",
					"text-sm",
					"bg-background",
					"border-[2px] border-neutral-700 border-dashed border-b-0",
					"transition cursor-pointer",
					"hover:bg-neutral-900",
					className,
				)}
			>
				<span>Drag image(s) here</span>
				<UploadCloud />
			</FileUpload.Dropzone>

			<div className="bg-background/50 p-2">
				<div className="flex items-center justify-end gap-2">
					<label htmlFor="convert" className="text-sm">
						Convert my images automatically
					</label>

					<Switch
						id="convert"
						checked={convertImage}
						onCheckedChange={setConvertImage}
					/>
				</div>
			</div>

			<FileUpload.ItemGroup className="space-y-2">
				<FileUpload.Context>
					{({ acceptedFiles }) => {
						const hasFiles = acceptedFiles.length > 0

						if (!hasFiles) return null

						return (
							<>
								<ScrollArea className={cn("h-48 border p-1")}>
									<div className="space-y-1">
										{acceptedFiles.map((file, index) => (
											<UploadItem
												key={`${file.name}-${index}`}
												className=""
												convertImage={convertImage}
												file={file}
											/>
										))}
									</div>
								</ScrollArea>

								<div className="flex justify-end">
									<Button>Download all</Button>
								</div>
							</>
						)
					}}
				</FileUpload.Context>
			</FileUpload.ItemGroup>

			<FileUpload.HiddenInput />
		</FileUpload.Root>
	)
}
