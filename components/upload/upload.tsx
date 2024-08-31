"use client"

import { ArrowRight, Download, UploadCloud, X } from "lucide-react"
import type * as React from "react"

import { cn } from "@/utils/cn"
import { downloadElement } from "@/utils/download"
import { FileUpload } from "@ark-ui/react"
import { downloadZip } from "client-zip"
import Compressor from "compressorjs"
import Image from "next/image"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { compressImage } from "./upload.utils"

interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Upload = (props: UploadProps) => {
	const { className, ...rest } = props

	return (
		<FileUpload.Root maxFiles={20} accept="image/*">
			<FileUpload.Label className="sr-only">File Upload</FileUpload.Label>

			<FileUpload.Dropzone
				className={cn(
					"flex flex-col items-center justify-center",
					"w-full h-64",
					"space-y-2",
					"text-sm",
					"bg-background",
					"border-2 border-neutral-700 border-dashed",
					"transition cursor-pointer",
					"hover:bg-neutral-900",
					className,
				)}
			>
				<span>Drag image(s) here</span>
				<UploadCloud />
			</FileUpload.Dropzone>

			<FileUpload.ItemGroup className="mt-5 space-y-2">
				<FileUpload.Context>
					{({ acceptedFiles }) => {
						const hasFiles = acceptedFiles.length > 0

						if (!hasFiles) return null

						return (
							<>
								<ScrollArea className={cn("h-48 border p-1")}>
									<div className="space-y-1">
										{acceptedFiles.map((file, index) => {
											const fileName = file.name.split(".")[0].substring(0, 20)

											const fileFormat = file.name.split(".")[1]

											const convertTo = true

											const compressedImage = compressImage(file)

											return (
												<FileUpload.Item
													className="flex p-1 text-xs bg-neutral-800 border-neutral-700 justify-between items-center animate-in slide-in-from-top-10 fade-in-0"
													key={`${file.name}-${index}`}
													file={file}
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
																	className={cn(
																		"inline-flex px-1 py-0.5 text-xs",
																		{
																			"bg-red-700": fileFormat === "png",
																			"bg-blue-700":
																				fileFormat === "jpg" ||
																				fileFormat === "jpeg",
																			"bg-green-700": fileFormat === "svg",
																			"line-through opacity-80": convertTo,
																		},
																	)}
																>
																	{fileFormat}
																</span>

																{convertTo && (
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
																}).format(acceptedFiles[index].size)}
															</div>

															<div className="text-green-500">
																{Intl.NumberFormat("en", {
																	notation: "compact",
																	style: "unit",
																	unit: "byte",
																	unitDisplay: "narrow",
																}).format(compressedImage.size)}
															</div>
														</div>

														<div className="flex flex-row-reverse gap-2">
															<Button
																variant="ghost"
																size="icon"
																onClick={() => downloadElement(file)}
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
										})}
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
