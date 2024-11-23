"use client"; // Ensures this file runs on the client side, not during server-side rendering.

import { ButtonInput, SignupFormInput } from "@/components/form/FormInput"; // Import custom form components for inputs.
import { Form } from "@/components/ui/form"; // Import Form component for form state management and UI rendering.
import Link from "next/link"; // Import Link component for navigation between pages.
import { useForm } from "react-hook-form"; // Import useForm hook to handle form state and validation.
import { useRouter } from "next/navigation"; // Import useRouter hook for programmatic navigation.
import { useState } from "react"; // Import useState to manage component states like loading and error.
import { z } from "zod"; // Import zod for schema validation.
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to integrate Zod validation with react-hook-form.
import { registerUser } from "@/lib/actions/auth.action"; // Function to handle user registration.

// Define the SignupForm component for user registration.
export function SignupForm() {
  const [error, setError] = useState<string | null>(null); // State to store error messages.
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading spinner.
  const router = useRouter(); // Router instance for navigation after successful registration.

  // Define Zod schema for form validation.
  const formSchema = z
    .object({
      fullname: z
        .string()
        .min(3, "Fullname must be at least 3 characters long") // Validates that fullname is at least 3 characters.
        .max(200, "Fullname cannot exceed 200 characters"), // Ensures fullname doesn't exceed 200 characters.
      username: z
        .string()
        .min(3, "Username must be at least 3 characters long") // Validates that username is at least 3 characters long.
        .max(200, "Username cannot exceed 200 characters"), // Ensures username doesn't exceed 200 characters.
      email: z.string().email("Invalid email address"), // Validates email format.
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long") // Ensures password is at least 8 characters long.
        .max(20, "Password cannot exceed 20 characters"), // Ensures password doesn't exceed 20 characters.
      confirmPassword: z.string(), // Ensures confirmPassword is a string to compare with password.
    })
    .refine((data) => data.password === data.confirmPassword, {
      // Custom refinement to check if password and confirmPassword match.
      path: ["confirmPassword"], // Display the error on the confirmPassword field.
      message: "Passwords do not match!", // Error message if passwords don't match.
    });

  // Initialize the form with react-hook-form and Zod for validation.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Use Zod resolver for validation.
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Function to handle form submission.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true); // Start loading state.
      setError(null); // Reset error message.

      // Call the registerUser function to register the user.
      const result = await registerUser({
        fullName: values.fullname,
        userName: values.username,
        email: values.email,
        password: values.password,
      });

      // If registration is unsuccessful, show the error message.
      if (!result.success) {
        setError(result.msg || ""); // Set error message returned by the backend.
        return;
      }

      alert("User created successfully"); // Show success alert.
      router.push("/home"); // Redirect to the home page after successful registration.
    } catch (error) {
      console.log(`Error signing up: ${error}`); // Log unexpected errors for debugging.
      setError("An unexpected error occurred. Please try again."); // Display a generic error message.
    } finally {
      setLoading(false); // Reset loading state.
    }
  };

  return (
    <Form {...form}>
      {" "}
      {/* Spread form methods and state into the Form component. */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Handle form submission using react-hook-form.
        className="space-y-6 max-sm:w-full sm:w-96" // Styling for responsive form layout.
        autoComplete="off" // Disable browser auto-complete.
      >
        {/* Input fields for user sign-up: fullname, username, email, password, confirmPassword. */}
        <SignupFormInput
          form={form}
          name="fullname"
          type="text"
          placeholder="Fullname"
          loading={loading}
        />
        <SignupFormInput
          form={form}
          name="username"
          type="text"
          placeholder="Username"
          loading={loading}
        />
        <SignupFormInput
          form={form}
          name="email"
          type="text"
          placeholder="Email"
          loading={loading}
        />
        <SignupFormInput
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />
        <SignupFormInput
          form={form}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          loading={loading}
        />

        {/* Display the error message if any validation error occurs. */}
        {error && (
          <p className="text-red-500 text-xs text-center font-bold">{error}</p>
        )}

        {/* Submit button for the form. */}
        <ButtonInput loading={loading} label="Sign Up" />

        {/* Link to the login page for users who already have an account. */}
        <p className="text-sm text-center">
          <span className="opacity-70">Already have an account?</span>{" "}
          <Link href="/" className="text-deepRed font-semibold">
            Log in here
          </Link>
        </p>
      </form>
    </Form>
  );
}
