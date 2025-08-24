import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex bg-transparent disabled:opacity-50 shadow-sm px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 w-full min-h-[60px] dark:placeholder:text-neutral-400 placeholder:text-neutral-500 disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
