import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Dark blue used throughout the app as the background color
// used here to ensure button text matches the design palette
const BUTTON_TEXT_COLOR = "#020817"

const buttonVariants = cva(

  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation [-webkit-tap-highlight-color:transparent] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-[${BUTTON_TEXT_COLOR}] bg-[linear-gradient(50deg,hsl(var(--primary))_15%,hsl(var(--primary))_60%,hsl(var(--secondary))_100%)]`,


  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent] text-[${BUTTON_TEXT_COLOR}] bg-[linear-gradient(-50deg,hsl(var(--primary))_15%,hsl(var(--primary))_60%,hsl(var(--secondary))_100%)]`,

    `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation [-webkit-tap-highlight-color:transparent] text-[${BUTTON_TEXT_COLOR}] bg-[linear-gradient(90deg,hsl(var(--primary))_15%,hsl(var(--primary))_60%,hsl(var(--secondary))_100%)]`,


  {
    variants: {
      variant: {
        default: "hover:opacity-90",
        destructive: "hover:opacity-90",
        outline: "border border-primary",
        secondary: "hover:opacity-90",
        ghost: "hover:opacity-90",
        link: "underline-offset-4 hover:underline",
        income: "hover:opacity-90",
        expense: "hover:opacity-90",
      },
      size: {
        // Increase padding and remove fixed heights so buttons feel less squashed
        default: "px-6 py-4",
        sm: "rounded-md px-4 py-2",
        lg: "rounded-md px-10 py-6",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

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
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
