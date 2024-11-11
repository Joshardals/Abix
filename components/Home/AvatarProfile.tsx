import { fetchCurrentUserInfo } from "@/lib/actions/database.action";
import Avatar from "./Avatar";

export default async function AvatarProfile() {
  const { userInfo } = await fetchCurrentUserInfo();

  if (!userInfo) return null;

  const name = userInfo.userName;

  const initials = name
    .split(" ") // Split the name into words
    .map((word: any) => word[0]) // Extract the first letter of each word
    .join(""); // Join the letters to form the initials

  return <Avatar initials={initials} />;
}
