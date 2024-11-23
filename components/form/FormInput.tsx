// Import Button from UI components and some icons from react-icons
import { Button } from "@/components/ui/button"; // Button for click action
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Eye icons for showing/hiding password
import { FaSpinner } from "react-icons/fa"; // Spinner icon for loading state

// Import Form components and Input field from UI library
import {
  FormControl, // Control input state
  FormField, // Field for form input
  FormItem, // Wrapper for input item
  FormMessage, // Show form error messages
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Input field for text

// React hook for handling state changes
import { useState } from "react"; // useState for managing component state
import { UseFormReturn } from "react-hook-form"; // Handling form data with react-hook-form

// Define types for form data (signup and login)
interface SignupFormValues {
  fullname: string; // User's full name
  username: string; // Username for login
  email: string; // User's email
  password: string; // Password
  confirmPassword: string; // Confirm password
}

interface LoginFormValues {
  email: string; // Email for login
  password: string; // Password for login
}

// Define types for login input component props
interface LoginFormInputProps {
  form?: UseFormReturn<LoginFormValues>; // Form hook return for login
  name?: "email" | "password"; // Name of the form input
  type?: string; // Type of the input field (text, password)
  placeholder?: string; // Placeholder text for the input field
  loading?: boolean; // Whether it's in a loading state
  label?: string; // Label for the input field
  variant?: "abix"; // Button style (optional)
  disabled?: boolean; // Disable input if true
}

// Define types for signup input component props
interface SignupFormInputProps {
  form?: UseFormReturn<SignupFormValues>; // Form hook return for signup
  name?: "fullname" | "username" | "email" | "password" | "confirmPassword"; // Field name
  type?: string; // Type of the input field (password, email, etc.)
  placeholder?: string; // Placeholder text for input field
  loading?: boolean; // Loading state for form input
}

// Define types for button component props
interface ButtonInputProps {
  loading?: boolean; // Loading state for the button
  label?: string; // Button label text
  variant?: "abix"; // Button variant (style)
  disabled?: boolean; // Disable button if true
}

// Login input form component for handling login fields
export function LoginFormInput({
  form, // Pass form methods for field control
  name, // Field name (email, password)
  type, // Field type (text, password)
  placeholder, // Field placeholder
  loading, // Loading state for the input field
}: LoginFormInputProps) {
  const [eyeOpen, setEyeOpen] = useState<boolean>(false); // Track if the password is visible
  const [inputType, setInputType] = useState<string>(type!); // Type of input (password or text)

  // Toggle between password and text visibility
  const toggleInputType = () => {
    setEyeOpen(!eyeOpen); // Flip visibility state
    setInputType((prevType) => (prevType === "password" ? "text" : "password")); // Change input type
  };

  return (
    <FormField
      control={form?.control} // Bind form control
      name={name!} // Set field name
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                autoCapitalize="none" // Disable auto-capitalization
                autoComplete={type === "password" ? "new-password" : "off"} // Disable autocomplete for password
                autoCorrect="off" // Disable auto-correct
                id={name} // Set input ID
                placeholder={placeholder} // Set input placeholder
                type={inputType} // Set input type (password/text)
                {...field} // Bind field data
                onChange={(e) => {
                  form?.setValue(name!, e.target.value); // Update form value on input change
                }}
                disabled={loading} // Disable input when loading
              />
              {type === "password" && (
                // Show eye icon to toggle password visibility
                <div
                  className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-softWhite rounded-md select-none"
                  onClick={toggleInputType}
                >
                  {eyeOpen ? <FaEyeSlash /> : <FaEye />} {/* Eye icons */}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-xs font-normal" />{" "}
          {/* Show error message */}
        </FormItem>
      )}
    />
  );
}

// Signup input form component for handling signup fields
export function SignupFormInput({
  form, // Pass form methods for field control
  name, // Field name (fullname, username, etc.)
  type, // Field type (password, text)
  placeholder, // Field placeholder
  loading, // Loading state for the input field
}: SignupFormInputProps) {
  const [eyeOpen, setEyeOpen] = useState<boolean>(false); // Track if the password is visible
  const [inputType, setInputType] = useState<string>(type!); // Type of input (password or text)

  // Toggle visibility for password field
  const toggleInputType = () => {
    setEyeOpen(!eyeOpen); // Flip visibility state
    setInputType((prevType) => (prevType === "password" ? "text" : "password")); // Change input type
  };

  return (
    <FormField
      control={form?.control} // Bind form control
      name={name!} // Set field name
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                autoCapitalize="none" // Disable auto-capitalization
                autoComplete={type === "password" ? "new-password" : "off"} // Disable autocomplete for password
                autoCorrect="off" // Disable auto-correct
                id={name} // Set input ID
                placeholder={placeholder} // Set input placeholder
                type={inputType} // Set input type (password/text)
                {...field} // Bind field data
                onChange={(e) => {
                  form?.setValue(name!, e.target.value); // Update form value on input change
                }}
                disabled={loading} // Disable input when loading
              />
              {type === "password" && (
                // Show eye icon to toggle password visibility
                <div
                  className="absolute top-0 right-0 h-full flex items-center px-5 cursor-pointer bg-softWhite rounded-md select-none"
                  onClick={toggleInputType}
                >
                  {eyeOpen ? <FaEyeSlash /> : <FaEye />} {/* Eye icons */}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-red-500 text-xs font-normal" />{" "}
          {/* Show error message */}
        </FormItem>
      )}
    />
  );
}

// Button component for submitting form or action
export function ButtonInput({
  loading, // Button loading state
  label, // Button label text
  variant, // Button variant (style)
  disabled, // Disable button state
}: ButtonInputProps) {
  return (
    <Button
      variant={variant || "abix"} // Set button variant (default "abix")
      disabled={loading || disabled} // Disable button if loading or disabled prop is true
      className="w-full" // Full width button
    >
      {loading ? <FaSpinner className="animate-spin" /> : label}{" "}
      {/* Show spinner or label */}
    </Button>
  );
}
