import { fetchCurrentUserInfo } from "@/lib/actions/database.action"; // Import function to fetch current user info.
import Avatar from "./Avatar"; // Import the Avatar component to display the user's avatar.

export default async function AvatarProfile() {
  // Fetch user info asynchronously.
  const { userInfo } = await fetchCurrentUserInfo();

  // If user info is not found, return null (nothing will be rendered).
  if (!userInfo) return null;

  const name = userInfo.userName; // Extract the username from the user info.

  // Generate the initials from the user's name.
  const initials = name
    .split(" ") // Split the name into words (assuming space-separated).
    .map((word: string) => word[0]) // Extract the first letter of each word.
    .join(""); // Join the letters together to form the initials.

  // Render the Avatar component, passing the initials as a prop.
  return <Avatar initials={initials} />;
}
