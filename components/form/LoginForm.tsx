"use client"; // Indicates that this file should be run on the client side (not during server-side rendering).

import { ButtonInput, FormInput } from "@/components/form/FormInput"; // Import custom form components.
import { Form } from "@/components/ui/form"; // Import Form component for handling form state and submissions.
import Link from "next/link"; // Import Link component for client-side navigation.
import { useForm } from "react-hook-form"; // Import useForm hook from react-hook-form.
// import { useRouter } from "next/navigation"; // Import useRouter hook for navigation.
import { useState } from "react"; // Import useState for managing component state.
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver for using Zod with react-hook-form.
// import { signInUser } from "@/lib/actions/auth.action"; // Import signInUser function to handle authentication.

export function LoginForm() {
  const [error, setError] = useState<string | null>(null); // State for storing error messages.
  const [loading, setLoading] = useState<boolean>(false); // State for managing loading spinner.
  // const router = useRouter(); // Router instance for navigation.

  const formSchema = z.object({
    email: z.string().email(), // Validates that the email is a valid email address format.
    password: z.string().min(1, "Required field").max(20), // Ensures password is between 1 and 20 characters long.
  });

  // Initialize useForm with Zod resolver for validation and default values.
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
      //   setLoading(true); // Set loading state to true.
      //   setError(null); // Clear any previous error messages.

      //   // Attempt to sign in the user.
      //   const result = await signInUser({
      //     email: values.email,
      //     password: values.password,
      //   });

      //   // Check if the authentication was successful.
      //   if (!result.success) {
      //     setError(result.msg); // Set error message if authentication fails.
      //     return;
      //   }

      //   alert("User signed in successfully"); // Show success alert.
      //   router.push("/home"); // Redirect to home page on successful sign in.

      console.log(values);
    } catch (error) {
      console.log(`An unexpected error occurred: ${error}`); // Log unexpected errors.
      setError("An unexpected error occurred. Please try again."); // Set generic error message.
    } finally {
      setLoading(false); // Set loading state to false.
    }
  };

  return (
    <Form {...form}>
      {" "}
      {/* Spread form methods and state into the Form component. */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Handle form submission.
        className="space-y-6 max-sm:w-full sm:w-96" // Responsive width and spacing for form elements.
        autoComplete="off" // Disable browser autocomplete for this form.
      >
        {/* Input fields for email and password. */}
        <FormInput
          form={form}
          name="email"
          type="text"
          placeholder="Email"
          loading={loading}
        />

        <FormInput
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />

        {/* Display error message if there is one. */}
        {error && <p className="text-deepRed text-xs font-bold">{error}</p>}

        {/* Submit button for the form. */}
        <ButtonInput loading={loading} label="Login" />

        {/* Link to sign up page for users who don't have an account. */}
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
