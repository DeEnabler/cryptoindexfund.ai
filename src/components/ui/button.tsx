import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles for all buttons, including for effects
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  // Styles for animated border
  "border-2 border-transparent", // Border will be styled by background-clip
  // Default background setup for border effect
  // The first gradient is for the button's actual background (content area)
  // The second gradient (--border-gradient) is for the border area
  // --border-gradient defaults to a static border color, animates on hover
  "bg-origin-border bg-clip-padding [--border-gradient:linear-gradient(to_right,hsl(var(--border)),hsl(var(--border)))] checked:text-red-500 focus:text-red-500",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: // Outline buttons will have their actual border and then the animated one on top
          "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost buttons will primarily show the animated border on hover
        link: "text-primary underline-offset-4 hover:underline",
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

// Composite style for the button background layers
const getBackgroundStyle = (variant?: string | null) => {
  // For outline and link variants, the "content" part of the gradient should be transparent initially
  // or match the typical transparent/background state of these buttons.
  // Other variants use the theme background.
  let contentBg = "hsl(var(--background))"; // Default for most variants
  if (variant === "default") contentBg = "hsl(var(--primary))";
  if (variant === "secondary") contentBg = "hsl(var(--secondary))";
  if (variant === "destructive") contentBg = "hsl(var(--destructive))";
  
  // Ghost and link variants are typically transparent, so their "content" gradient layer should be transparent.
  // The animated border will appear over this.
  if (variant === "ghost" || variant === "link" || variant === "outline") {
    return {
      backgroundImage: `var(--border-gradient)`, // Only border gradient for ghost/link/outline on hover
      backgroundClip: 'border-box', // Clip gradient to border area
      WebkitBackgroundClip: 'border-box', // For Safari
    };
  }

  // For other variants, use the double gradient for content background and border
  return {
    backgroundImage: `linear-gradient(${contentBg}, ${contentBg}), var(--border-gradient)`,
    backgroundClip: 'padding-box, border-box',
    WebkitBackgroundClip: 'padding-box, border-box', // For Safari
  };
}


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useEffect(() => {
      const currentButton = (ref && 'current' in ref ? ref.current : buttonRef.current) as HTMLButtonElement | null;
      if (!currentButton) return;

      const clickListener = (event: MouseEvent) => {
        // Create ripple element
        const ripple = document.createElement("span");
        const rect = currentButton.getBoundingClientRect();
        const diameter = Math.max(currentButton.clientWidth, currentButton.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        // Position ripple at click location
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.className = 'ripple-effect'; // Class for styling & animation from globals.css

        // Append, animate, then remove ripple
        // Check if a ripple already exists to prevent multiple rapid-fire ripples; this simple check might not be enough for all cases.
        const existingRipple = currentButton.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }
        currentButton.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 700); // Match animation duration in globals.css
      };

      currentButton.addEventListener("click", clickListener);

      return () => {
        if (currentButton) {
          currentButton.removeEventListener("click", clickListener);
        }
      };
    }, [ref]);
    
    const finalRef = (ref || buttonRef) as React.RefObject<HTMLButtonElement>;

    // Apply dynamic background style for border effect
    const bgStyle = getBackgroundStyle(variant);
    const appliedStyle = asChild ? {} : bgStyle; // Pass style only if not asChild, otherwise parent handles style

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          // Add hover state class to trigger animation
          // For ghost and link, we want border to appear on hover
          (variant === "ghost" || variant === "link" || variant === "outline") 
            ? "hover:[--border-gradient:conic-gradient(from_var(--gradient-angle),hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))] hover:animate-[a-border-spin_2s_linear_infinite]"
            : "[--border-gradient:linear-gradient(to_right,hsl(var(--border)),hsl(var(--border)))] hover:[--border-gradient:conic-gradient(from_var(--gradient-angle),hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))] hover:animate-[a-border-spin_2s_linear_infinite]"
        )}
        ref={finalRef}
        style={asChild ? props.style : { ...appliedStyle, ...props.style }}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
