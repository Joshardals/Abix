// "use client"; // Indicates that this file should be run on the client side (not during server-side rendering).

// import { Button } from "@/components/ui/button"; // Importing a button component.
// import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Importing icons for showing/hiding password.
// import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon for loading state.
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form"; // Importing form components for form control, fields, items, labels, and messages.
// import { Input } from "@/components/ui/input"; // Importing an input component.
// import { useState } from "react"; // Importing useState for managing component state.

// interface FormInputProps {
//   form?: any; // Optional form object, likely from a form library like React Hook Form.
//   name?: string; // The name of the form field.
//   type?: string; // The type of input (e.g., text, password).
//   placeholder?: string; // Placeholder text for the input field.
//   loading?: boolean; // A flag indicating if the form is in a loading state.

//   // Button Typings.
//   label?: string; // Label text for the button.
//   variant?: "abix"; // Variant for button styling.
//   disabled?: boolean; // Flag to disable the button.
// }

// // // ButtonInput component for rendering a button with a loading state.
// export function ButtonInput({
//   loading,
//   label,
//   variant,
//   disabled,
// }: FormInputProps) {
//   return (
//     <Button
//       variant={variant || "abix"} // Sets button variant, defaulting to "ticket".
//       disabled={loading || disabled} // Disables button if loading or disabled prop is true.
//       className="w-full" // Full width button.
//     >
//       {loading ? <FaSpinner className="animate-spin" /> : label}
//       {/* Displays spinner if loading, otherwise displays the button label. */}
//     </Button>
//   );
// }

// // FormInput component for rendering an input field with optional password visibility toggle.
// export function FormInput({
//   form,
//   name,
//   type,
//   placeholder,
//   loading,
// }: FormInputProps) {
//   const [eyeOpen, setEyeOpen] = useState<boolean>(false); // State to manage password visibility.
//   const [inputType, setInputType] = useState<string>(type!); // State to manage the input type (text or password).

//   // Function to toggle input type between text and password.
//   const toggleInputType = () => {
//     setEyeOpen(!eyeOpen); // Toggle eye icon state.
//     setInputType((prevType) => (prevType === "password" ? "text" : "password")); // Toggle input type.
//   };

//   return (
//     <FormField
//       control={form.control} // Passes form control to FormField.
//       name={name!} // Sets the name for the form field.
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <div className="relative">
//               {/* Container for input and visibility toggle. */}
//               <Input
//                 autoCapitalize="none"
//                 autoComplete={type === "password" ? "new-password" : "off"}
//                 autoCorrect="off"
//                 id={name}
//                 placeholder={placeholder}
//                 type={inputType}
//                 {...field}
//                 onChange={(e: any) => {
//                   form.setValue(name, e.target.value); // Updates form value on change.
//                 }}
//                 disabled={loading} // Disables input if loading is true.
//               />

//               {type === "password" && (
//                 <div
//                   className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-softWhite rounded-md select-none"
//                   onClick={toggleInputType} // Toggles password visibility on click.
//                 >
//                   {eyeOpen ? <FaEyeSlash /> : <FaEye />}
//                   {/* Shows eye icon for toggling password visibility. */}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//           <FormMessage className="text-red-500 text-xs font-normal" />
//           {/* Displays error message if form field has validation errors. */}
//         </FormItem>
//       )}
//     />
//   );
// }

import { Button } from "@/components/ui/button"; // Importing a button component.
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

interface FormInputProps {
  form?: UseFormReturn<FormValues>;
  name?: "password" | "email";
  type?: string;
  placeholder?: string;
  loading?: boolean;
  label?: string;
  variant?: "abix";
  disabled?: boolean;
}

export function FormInput({
  form,
  name,
  type,
  placeholder,
  loading,
}: FormInputProps) {
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type!);

  const toggleInputType = () => {
    setEyeOpen(!eyeOpen);
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <FormField
      control={form?.control}
      name={name!}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                autoCapitalize="none"
                autoComplete={type === "password" ? "new-password" : "off"}
                autoCorrect="off"
                id={name}
                placeholder={placeholder}
                type={inputType}
                {...field}
                onChange={(e) => {
                  form?.setValue(name!, e.target.value);
                }}
                disabled={loading}
              />

              {type === "password" && (
                <div
                  className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-softWhite rounded-md select-none"
                  onClick={toggleInputType}
                >
                  {eyeOpen ? <FaEyeSlash /> : <FaEye />}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-xs font-normal" />
        </FormItem>
      )}
    />
  );
}

// // ButtonInput component for rendering a button with a loading state.
export function ButtonInput({
  loading,
  label,
  variant,
  disabled,
}: FormInputProps) {
  return (
    <Button
      variant={variant || "abix"} // Sets button variant, defaulting to "ticket".
      disabled={loading || disabled} // Disables button if loading or disabled prop is true.
      className="w-full" // Full width button.
    >
      {loading ? <FaSpinner className="animate-spin" /> : label}
      {/* Displays spinner if loading, otherwise displays the button label. */}
    </Button>
  );
}
