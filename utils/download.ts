/**
 * Download a blob as a file
 *
 * @param element The blob to download
 */
export const downloadElement = (
	element: Blob & { name: string },
	options?: {
		filename: string
	},
) => {
	const link = document.createElement("a")
	link.href = URL.createObjectURL(element)
	link.download = options?.filename || element?.name
	link.click()
	link.remove()
}
