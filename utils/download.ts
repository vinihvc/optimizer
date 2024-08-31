/**
 * Download a blob as a file
 *
 * @param element The blob to download
 */
export const downloadElement = (element: Blob) => {
	const link = document.createElement("a")
	link.href = URL.createObjectURL(element)
	link.download = "test.zip"
	link.click()
	link.remove()
}
