import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer data-[state=checked]:bg-neutral-900 dark:data-[state=checked]:bg-neutral-50 disabled:opacity-50 shadow border border-neutral-900 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300 w-4 h-4 data-[state=checked]:text-neutral-50 dark:data-[state=checked]:text-neutral-900 disabled:cursor-not-allowed shrink-0",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex justify-center items-center text-current")}
    >
      <Check className="w-4 h-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
