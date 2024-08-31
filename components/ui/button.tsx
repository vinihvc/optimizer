import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "cva"
import * as React from "react"

import { cn } from "@/utils/cn"

const buttonVariants = cva({
	base: [
		"inline-flex items-center justify-center",
		"text-sm font-medium whitespace-nowrap",
		"transition-colors",
		"outline-none focus-visible:ring-2 ring-ring ring-offset-background ring-offset-2",
		"disabled:pointer-events-none disabled:opacity-50",
	],
	variants: {
		variant: {
			solid: ["bg-primary text-primary-foreground ", "hover:bg-primary/90"],
			outline: [
				"border border-input bg-background",
				"hover:bg-accent hover:text-accent-foreground",
			],
			ghost: ["hover:bg-primary hover:text-primary-foreground"],
			link: ["text-primary underline-offset-4 ", "hover:underline"],
		},
		size: {
			sm: "h-9 px-3",
			md: "h-10 px-4 py-2",
			lg: "h-11 px-8",
			icon: "size-10",
		},
	},
	defaultVariants: {
		variant: "solid",
		size: "md",
	},
})

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = "Button"

export { Button, buttonVariants }
