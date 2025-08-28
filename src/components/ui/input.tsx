import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex bg-transparent file:bg-transparent disabled:opacity-50 shadow-sm px-3 py-2 border border-neutral-200 dark:border-neutral-800 file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 w-full file:font-medium dark:placeholder:text-neutral-400 dark:file:text-neutral-50 placeholder:text-neutral-500 file:text-neutral-950 file:text-sm transition-colors disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
