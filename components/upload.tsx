"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/utils/cn"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown, UploadCloud, X } from "lucide-react"
import * as React from "react"

interface CopyButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Upload = (props: CopyButtonProps) => {
	const { className, ...rest } = props

	const reactId = React.useId()

	const [isOver, setIsOver] = React.useState(false)
	const [files, setFiles] = React.useState<File[]>([])

	// Define the event handlers
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsOver(true)
	}

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsOver(false)
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsOver(false)

		if (!event.dataTransfer.files) return

		handleUpload(Array.from(event.dataTransfer.files))
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()

		if (!event.target.files) return

		handleUpload(Array.from(event.target.files))
	}

	const handleUpload = (files: File[]) => {
		setFiles((e) => [...e, ...files])

		for (const file of files) {
			const reader = new FileReader()

			reader.onloadend = () => {
				console.log(reader.result)
			}

			reader.onerror = () => {
				console.error("There was an issue reading the file.")
			}

			reader.readAsDataURL(file)

			return reader
		}
	}

	const removeFile = (file: File) => {
		setFiles((e) => e.filter((f) => f.name !== file.name))
	}

	return (
		<div className="space-y-5">
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<label
					htmlFor={reactId}
					className={cn(
						"w-full h-64",
						"flex flex-col items-center justify-center",
						"border-2 border-neutral-300 border-dashed",
						"transition-all cursor-pointer",
						"rounded",
						"bg-neutral-50",
						"hover:bg-neutral-100",
						"dark:bg-neutral-800 dark:border-neutral-700",
						"dark:hover:bg-neutral-700 dark:hover:border-neutral-500",
						className,
					)}
				>
					<div
						className="flex flex-col items-center justify-center pt-5 pb-6"
						{...rest}
					>
						{isOver ? (
							<ArrowDown className="w-8 h-8 mb-4 transition animate-bounce" />
						) : (
							<UploadCloud className="w-8 h-8 mb-4 transition" />
						)}

						<p className="mb-2 text-sm">
							<span className="font-semibold">Click to upload</span> or drag and
							drop
						</p>
					</div>

					<input
						id={reactId}
						type="file"
						className="hidden object-contain"
						onChange={handleChange}
						accept="image/svg+xml, image/png, image/jpeg, image/gif, image/webp"
						multiple
					/>
				</label>
			</div>

			<ScrollArea
				className={cn(
					"h-48 w-full rounded border p-4 opacity-0 animate-in fade-in-0",
					{
						"opacity-100": files.length > 0,
					},
				)}
			>
				<motion.div className="grid grid-cols-6 gap-2">
					<AnimatePresence initial={false}>
						{files?.map((file) => (
							<motion.div
								key={file.name}
								className="group relative aspect-square"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<img
									className="size-full object-cover rounded"
									src={URL.createObjectURL(file)}
									alt={`Uploaded file: ${file.name}`}
								/>

								<div className="absolute top-0.5 right-0.5">
									<button
										type="button"
										onClick={() => removeFile(file)}
										className="p-0.5 rounded-full bg-white text-black opacity-0 group-hover:opacity-50 group-hover:hover:opacity-100 animate-in fade-in-5 transition-all"
									>
										<X size={12} />
									</button>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</ScrollArea>
		</div>
	)
}
