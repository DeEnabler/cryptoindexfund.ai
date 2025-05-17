import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles:
  // - Flex layout for icon + text alignment.
  // - Basic text styling (size, weight).
  // - Transition for colors.
  // - Focus visibility rings.
  // - Disabled state styling.
  // - Relative positioning for potential pseudo-elements or ripple.
  // - Overflow hidden to contain ripple.
  // - `group` class to enable group-hover states for complex effects.
  // - `border-2 border-solid` sets up a 2px border area.
  // - `border-transparent` makes this border area transparent by default, ready for border-image or color.
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group border-2 border-solid border-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 " + // Standard background and text
          "hover:border-transparent hover:[border-image:conic-gradient(from_var(--gradient-angle),hsl(var(--accent)),hsl(var(--primary-foreground)),hsl(var(--accent)))_1] hover:animate-[a-border-spin_2s_linear_infinite]", // Animated border on hover
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 " +
          "hover:border-transparent hover:[border-image:conic-gradient(from_var(--gradient-angle),hsl(var(--destructive)),hsl(var(--destructive-foreground)),hsl(var(--destructive)))_1] hover:animate-[a-border-spin_2s_linear_infinite]",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground " + // Has its own border in normal state
          "group-hover:border-transparent hover:[border-image:conic-gradient(from_var(--gradient-angle),hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))_1] hover:animate-[a-border-spin_2s_linear_infinite]", // Default border becomes transparent, border-image takes over
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 " +
          "hover:border-transparent hover:[border-image:conic-gradient(from_var(--gradient-angle),hsl(var(--secondary)),hsl(var(--accent)),hsl(var(--secondary)))_1] hover:animate-[a-border-spin_2s_linear_infinite]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground " + // No default border, animated border appears on hover
          "hover:border-transparent hover:[border-image:conic-gradient(from_var(--gradient-angle),hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))_1] hover:animate-[a-border-spin_2s_linear_infinite]",
        link: "text-primary underline-offset-4 hover:underline", // Links typically don't get this border treatment
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // Use a local ref if an external one isn't provided, for the ripple effect.
    const internalButtonRef = React.useRef<HTMLButtonElement>(null);
    const buttonRef = (ref || internalButtonRef) as React.RefObject<HTMLButtonElement>;

    React.useEffect(() => {
      const currentButton = buttonRef.current;
      if (!currentButton) return;

      const clickListener = (event: MouseEvent) => {
        // Prevent ripple if button is disabled
        if (currentButton.disabled) return;

        // Create ripple element
        const ripple = document.createElement("span");
        const rect = currentButton.getBoundingClientRect();
        const diameter = Math.max(currentButton.clientWidth, currentButton.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.className = 'ripple-effect';

        // Remove any existing ripple to prevent multiple rapid-fire ripples
        const existingRipple = currentButton.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }
        currentButton.appendChild(ripple);

        // Remove ripple after animation
        const animationDuration = 700; // Must match CSS animation duration
        setTimeout(() => {
          ripple.remove();
        }, animationDuration);
      };

      currentButton.addEventListener("click", clickListener);

      return () => {
        if (currentButton) {
          currentButton.removeEventListener("click", clickListener);
        }
      };
    }, [buttonRef]); // Depend on buttonRef to re-attach if the ref changes

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
