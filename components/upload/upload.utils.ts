import Compressor from "compressorjs"

export const compressImage = (file: File) => {
	const compressedFile = new Compressor(file, {
		quality: 0.8,

		// The compression process is asynchronous,
		// which means you have to access the `result` in the `success` hook function.
		success(result) {
			return result
		},
		error(err) {
			console.log(err.message)
		},
	})

	return compressedFile.file
}
