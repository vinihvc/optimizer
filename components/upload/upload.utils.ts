import Compressor from "compressorjs"

export const compressImage = async (
	file: File,
	options?: Compressor.Options,
): Promise<File | undefined> => {
	try {
		return await new Promise((resolve, reject) => {
			new Compressor(file, {
				quality: 0.8,
				...options,
				success(result) {
					resolve(result as File)
				},
				error(error) {
					reject(error)
				},
			})
		})
	} catch (error) {
		console.error(error)
	}
}
