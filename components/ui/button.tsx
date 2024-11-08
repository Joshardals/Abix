import * as React from "react"; // Import React library for creating components and handling hooks.
import { Slot } from "@radix-ui/react-slot"; // Import Slot from Radix UI for composition-based rendering.
import { cva, type VariantProps } from "class-variance-authority"; // Import cva and VariantProps for handling class variants.
import { cn } from "@/lib/utils"; // Import utility function for conditionally applying class names.

// Define button variants using cva for class-variance-authority.
// cva allows us to define different variants and sizes for our button component.
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "", // Default button style (no additional styles applied).
        // home: "bg-deepRed hover:bg-deepRed/90 text-softWhite", // Styling for 'home' variant.
        abix: "bg-yellow hover:bg-yellow/70 text-navyBlue rounded-lg", // Styling for 'ticket' variant.
      },
      size: {
        default: "h-10 px-4 py-2", // Default button size.
        sm: "h-9 rounded-md px-3", // Small button size.
        lg: "h-11 rounded-md px-8", // Large button size.
        icon: "h-10 w-10", // Icon button size.
      },
    },
    defaultVariants: {
      variant: "default", // Default variant if none is provided.
      size: "default", // Default size if none is provided.
    },
  }
);

// Define interface for ButtonProps.
// Extends React's button attributes and variant props from buttonVariants.
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Determines if the button should render as a child component (Slot).
}

// Define the Button component using React.forwardRef to forward refs to the underlying button element.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Conditionally choose component type based on asChild prop.
    const Comp = asChild ? Slot : "button";

    // Render the button component.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Apply variant and size classes along with any additional classes.
        ref={ref} // Forward ref to the button element.
        {...props} // Spread remaining props onto the button element.
      />
    );
  }
);
Button.displayName = "Button"; // Set display name for the component to improve debugging and development experience.

// Export the Button component and buttonVariants for use in other parts of the application.
export { Button, buttonVariants };
