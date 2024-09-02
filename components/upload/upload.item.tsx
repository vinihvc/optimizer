"use client"

import { ArrowRight, Download, X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"
import { downloadElement } from "@/utils/download"
import { FileUpload } from "@ark-ui/react"
import Image from "next/image"
import { Button } from "../ui/button"
import { compressImage } from "./upload.utils"

interface UploadProps extends React.HTMLAttributes<HTMLLIElement> {
	/**
	 *
	 */
	file: File
	/**
	 *
	 */
	convertImage: boolean
}

export const UploadItem = (props: UploadProps) => {
	const { file, convertImage = true, className, ...rest } = props

	const fileName = file.name.split(".")[0].substring(0, 20)

	const [compressedImage, setCompressedImage] = React.useState<File>()

	const fileFormat = file.name.split(".")[1]

	React.useEffect(() => {
		const compressedFile = async () => {
			const image = await compressImage(file, {
				...(convertImage && {
					mimeType: "image/webp",
				}),
			})

			setCompressedImage(image)
		}

		compressedFile()
	}, [file, convertImage])

	return (
		<FileUpload.Item
			className={cn(
				"flex p-1 text-xs bg-neutral-800 border-neutral-700 justify-between items-center animate-in slide-in-from-top-10 fade-in-0",
				className,
			)}
			file={file}
			{...rest}
		>
			<div className="flex items-center gap-2">
				<FileUpload.ItemPreview type="image/*">
					<FileUpload.ItemPreviewImage asChild>
						<Image
							className="object-scale-down text-[0px] size-10 bg-foreground bg-center"
							src={URL.createObjectURL(file)}
							alt={file.name}
							width={40}
							height={40}
						/>
					</FileUpload.ItemPreviewImage>
				</FileUpload.ItemPreview>

				<div className="space-y-1">
					<FileUpload.ItemName className="font-semibold line-clamp-1">
						{fileName}
					</FileUpload.ItemName>

					<div className="flex items-center gap-0.5">
						<span
							className={cn("inline-flex px-1 py-0.5 text-xs", {
								"bg-red-700": fileFormat === "png",
								"bg-blue-700": fileFormat === "jpg" || fileFormat === "jpeg",
								"bg-green-700": fileFormat === "svg",
								"line-through opacity-80": convertImage,
							})}
						>
							{fileFormat}
						</span>

						{convertImage && (
							<>
								<ArrowRight className="size-3" />
								<span className="inline-flex px-1 py-0.5 text-xs bg-green-700">
									webp
								</span>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<div className="flex flex-col gap-0.5">
					<div className="text-red-500">
						{Intl.NumberFormat("en", {
							notation: "compact",
							style: "unit",
							unit: "byte",
							unitDisplay: "narrow",
						}).format(file.size)}
					</div>

					<div className="text-green-500">
						{Intl.NumberFormat("en", {
							notation: "compact",
							style: "unit",
							unit: "byte",
							unitDisplay: "narrow",
						}).format(Number(compressedImage?.size || ""))}
					</div>
				</div>

				<div className="flex flex-row-reverse gap-2">
					<Button
						variant="ghost"
						size="icon"
						{...(compressedImage && {
							onClick: () => downloadElement(compressedImage),
						})}
					>
						<Download className="size-4" />
						<span className="sr-only">Download</span>
					</Button>

					<FileUpload.ItemDeleteTrigger asChild>
						<Button variant="ghost" size="icon">
							<X className="size-4" />
						</Button>
					</FileUpload.ItemDeleteTrigger>
				</div>
			</div>
		</FileUpload.Item>
	)
}
