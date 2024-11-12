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

interface SignupFormValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormInputProps {
  form?: UseFormReturn<LoginFormValues>;
  name?: "email" | "password";
  type?: string;
  placeholder?: string;
  loading?: boolean;
  label?: string;
  variant?: "abix";
  disabled?: boolean;
}

interface SignupFormInputProps {
  form?: UseFormReturn<SignupFormValues>;
  name?: "fullname" | "username" | "email" | "password" | "confirmPassword";
  type?: string;
  placeholder?: string;
  loading?: boolean;
}

interface ButtonInputProps {
  loading?: boolean;
  label?: string;
  variant?: "abix";
  disabled?: boolean;
}

export function LoginFormInput({
  form,
  name,
  type,
  placeholder,
  loading,
}: LoginFormInputProps) {
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

export function SignupFormInput({
  form,
  name,
  type,
  placeholder,
  loading,
}: SignupFormInputProps) {
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
}: ButtonInputProps) {
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
