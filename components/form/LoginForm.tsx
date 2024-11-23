"use client"; // Tell Next.js this file runs on the client side (not during SSR).

import { ButtonInput, LoginFormInput } from "@/components/form/FormInput"; // Get custom input components.
import { Form } from "@/components/ui/form"; // Form component to manage form state.
import Link from "next/link"; // Link component for routing.
import { useForm } from "react-hook-form"; // Hook to manage form state with React Hook Form.
import { useRouter } from "next/navigation"; // Hook to handle navigation after form submission.
import { useState } from "react"; // useState to manage local component state.
import { z } from "zod"; // Zod for form validation.
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to use Zod with React Hook Form.
import { signInUser } from "@/lib/actions/auth.action"; // Function to authenticate user.

export function LoginForm() {
  const [error, setError] = useState<string | null>(null); // Store error message from failed sign-in.
  const [loading, setLoading] = useState<boolean>(false); // Track loading state for form.
  const router = useRouter(); // Use the router for page navigation.

  const formSchema = z.object({
    email: z.string().email(), // Validate email format.
    password: z.string().min(1, "Required field").max(20), // Password must be between 1 and 20 characters.
  });

  // Setup useForm hook with Zod validation and default form values.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to handle form submission.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true); // Show loading spinner.
      setError(null); // Clear previous errors.

      // Call sign-in function.
      const result = await signInUser({
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        setError(result.msg || "error"); // Set error if sign-in fails.
        return;
      }

      alert("User signed in successfully"); // Show success message.
      router.push("/home"); // Redirect to home page after successful login.

    } catch (error) {
      console.log(`An unexpected error occurred: ${error}`); // Log unexpected errors.
      setError("An unexpected error occurred. Please try again."); // Generic error message.
    } finally {
      setLoading(false); // Hide loading spinner when done.
    }
  };

  return (
    <Form {...form}> 
      {/* Spread form methods for easy access in the form */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Handle form submission with onSubmit.
        className="space-y-6 max-sm:w-full sm:w-96" // Responsive form styling.
        autoComplete="off" // Disable browser autocomplete.
      >
        {/* Email input */}
        <LoginFormInput
          form={form}
          name="email"
          type="text"
          placeholder="Email"
          loading={loading}
        />

        {/* Password input */}
        <LoginFormInput
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />

        {/* Display error message if there is one */}
        {error && (
          <p className="text-red-500 text-xs text-center font-bold">{error}</p>
        )}

        {/* Submit button */}
        <ButtonInput loading={loading} label="Login" />

        {/* Link to sign-up page for new users */}
        <p className="text-sm text-center">
          <span className="opacity-70">Don&apos;t have an account?</span>{" "}
          <Link href="/signup" className="text-deepRed font-semibold">
            Sign up here
          </Link>
        </p>
      </form>
    </Form>
  );
}
