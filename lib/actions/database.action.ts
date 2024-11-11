"use server";

import { databases } from "../appwrite.config";
import { ID, Query, Models } from "node-appwrite";
import { getCurrentUser } from "./auth.action";

const { DATABASE_ID, USERS_ID } = process.env;

interface User {
  email: string;
  userId: string;
  fullName: string;
  userName: string;
}

interface FetchUserInfoResponse {
  success: boolean;
  userInfo?: User;
  msg?: string;
}

interface UsersResponse {
  data?: User[];
  success: boolean;
  msg?: string;
  total?: number;
}

export async function createUserInfo(data: User) {
  try {
    await databases.createDocument(
      DATABASE_ID as string,
      USERS_ID as string,
      ID.unique(),
      {
        email: data.email,
        fullName: data.fullName,
        userId: data.userId,
        userName: data.userName,
      }
    );

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed to create user document in the DB: ${error.message}`);
      return { success: false, msg: error.message };
    }
    console.log(`Failed to create user document in the DB: Unknown error`);
    return { success: false, msg: "Unknown error occurred" };
  }
}

export async function fetchCurrentUserInfo(): Promise<FetchUserInfoResponse> {
  try {
    const user = await getCurrentUser();

    // Check if the user is an error message or a valid CurrentUser
    if (typeof user === "string") {
      return { success: false, msg: user }; // Return the error message if it's a string
    }

    // Now it's safe to access email since user is of type CurrentUser
    const userId = user.email;

    const data = await databases.listDocuments(
      DATABASE_ID as string,
      USERS_ID as string,
      [Query.equal("userId", userId)]
    );

    if (data.documents.length === 0) {
      return { success: false, msg: "User not found" };
    }

    const currentUserInfo: User = {
      email: data.documents[0].email || "",
      userId: data.documents[0].userId || "",
      fullName: data.documents[0].fullName || "",
      userName: data.documents[0].userName || "",
    };

    return { success: true, userInfo: currentUserInfo };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Failed to fetch User Info Document from the DB: ${error.message}`
      );
      return { success: false, msg: error.message };
    }
    console.error(
      `Failed to fetch User Info Document from the DB: Unknown error`
    );
    return { success: false, msg: "Unknown error occurred" };
  }
}
