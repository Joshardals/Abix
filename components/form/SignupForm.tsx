"use client"; // Ensures this file runs on the client side.

import { ButtonInput, SignupFormInput } from "@/components/form/FormInput"; // Import custom form components.
import { Form } from "@/components/ui/form"; // Import Form component for form management.
import Link from "next/link"; // Import Link for client-side navigation.
import { useForm } from "react-hook-form"; // Import useForm hook for managing form state.
// import { useRouter } from "next/navigation"; // Import useRouter hook for navigation.
import { useState } from "react"; // Import useState for managing component state.
// import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver to integrate Zod with react-hook-form.
// import { signupUser } from "@/lib/actions/auth.action"; // Import function for signing up users.
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null); // State for error messages.
  const [loading, setLoading] = useState<boolean>(false); // State for loading spinner.
  // const router = useRouter(); // Router instance for navigation.

  const formSchema = z
    .object({
      fullname: z
        .string()
        .min(3, "Fullname must be at least 3 characters long") // Validates that fullname is at least 3 characters.
        .max(200, "Fullname cannot exceed 200 characters"), // Validates that fullname does not exceed 200 characters.
      username: z
        .string()
        .min(3, "Username must be at least 3 characters long") // Validates that username is at least 3 characters.
        .max(200, "Username cannot exceed 200 characters"), // Validates that username does not exceed 200 characters.
      email: z.string().email("Invalid email address"), // Validates that email is in correct format.
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long") // Validates that password is at least 8 characters.
        .max(20, "Password cannot exceed 20 characters"), // Validates that password does not exceed 20 characters.
      confirmPassword: z.string(), // Validates that confirmPassword is a string (to be checked against password).
    })
    .refine((data) => data.password === data.confirmPassword, {
      // Custom validation to ensure passwords match.
      path: ["confirmPassword"], // Sets the path of the error to the confirmPassword field.
      message: "Passwords do not match!", // Custom error message if passwords do not match.
    });

  // Initialize useForm with Zod resolver for validation and default values.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
      setError(null); // Clear previous errors.

      // Attempt to sign up the user.
      //   const result = await signupUser({
      //     fullname: values.fullname,
      //     username: values.username,
      //     email: values.email,
      //     password: values.password,
      //   });

      // Check if the sign-up was successful.
      //   if (!result.success) {
      //     setError(result.msg); // Set error message if sign-up fails.
      //     return;
      //   }

      //   alert("User created successfully"); // Show success message.
      //   router.push("/home"); // Redirect to home page on successful sign-up.

      console.log(values);
    } catch (error) {
      console.log(`Error signing up: ${error}`); // Log any unexpected errors.
      setError("An unexpected error occurred. Please try again."); // Display a generic error message.
    } finally {
      setLoading(false); // End loading state.
    }
  };

  return (
    <Form {...form}>
      {" "}
      {/* Spread form methods and state into the Form component. */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Handle form submission.
        className="space-y-6 max-sm:w-full sm:w-96" // Responsive styling.
        autoComplete="off" // Disable browser autocomplete.
      >
        {/* Input fields for sign-up. */}
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

        {/* Display error message if any. */}
        {error && <p className="text-deepRed text-xs font-bold">{error}</p>}

        {/* Submit button for the form. */}
        <ButtonInput loading={loading} label="Sign Up" />

        {/* Link to login page for users who already have an account. */}
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
