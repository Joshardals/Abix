// Interface defining the shape of data used for authentication validation.
// It includes fields for email and password, with optional fields for user registration.
export interface AuthValidationType {
  // Email address of the user, required for authentication and registration.
  email: string;

  // Password for the user account, required for authentication and registration.
  password: string;

  // Optional confirmation password, used to ensure that the user has typed the same password twice during registration.
  confirmPassword?: string;

  // Optional full name of the user, relevant for registration processes.
  fullname?: string;

  // Optional username chosen by the user, relevant for registration processes.
  username?: string;
}
