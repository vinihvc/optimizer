import { type CX, cx } from "cva"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: Parameters<CX>) => {
	return twMerge(cx(inputs))
}
