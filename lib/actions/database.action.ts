"use server";

import { databases } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { getCurrentUser } from "./auth.action";
import { revalidatePath } from "next/cache";

const { DATABASE_ID, USERS_ID, TICKETS_ID } = process.env;

interface User {
  email: string;
  userId: string;
  fullName: string;
  userName: string;
}

interface CreateTicketParams {
  from: string;
  to: string;
  price: number;
}

interface TicketParams {
  from: string;
  to: string;
  price: number;
  purchaseDate: string;
  userId: string;
  ticketId: string;
}

interface FetchUserInfoResponse {
  success: boolean;
  userInfo?: User;
  msg?: string;
}

interface FetchUserTicketResponse {
  success: boolean;
  data?: TicketParams[];
  msg?: string;
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

// Function to create a ticket document after a user purchases an event ticket

export async function createTicketInfo(data: CreateTicketParams) {
  try {
    // Retrieve the current logged-in user
    const user = await getCurrentUser();

    // Check if the user is an error message or a valid CurrentUser
    if (typeof user === "string") {
      return { success: false, msg: user }; // Return the error message if it's a string
    }

    const userId = user.email;

    // Create a new document in the Tickets collection with ticket information
    await databases.createDocument(
      DATABASE_ID as string, // Database ID
      TICKETS_ID as string, // Tickets collection ID
      ID.unique(), // Generate a unique document ID
      {
        ticketId: ID.unique(), // Generate a unique ticket ID
        from: data.from, // Event name
        to: data.to, // Event ID
        userId, // User ID
        purchaseDate: new Date(), // Current date and time
        price: data.price, // Ticket price
      }
    );

    // Revalidate the path to refresh the ticket list on the client-side
    revalidatePath("/my-tickets");

    // Return success status with a message
    return { success: true, msg: "Ticket created Successfully!" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        `Failed to create ticket document in the DB: ${error.message}`
      );
      return { success: false, msg: error.message };
    }
    console.log(`Failed to create ticket document in the DB: Unknown error`);
    return { success: false, msg: "Unknown error occurred" };
  }
}

// Function to get all tickets of the current logged-in user
export async function fetchCurrentUserTicket(): Promise<FetchUserTicketResponse> {
  try {
    // Retrieve the current logged-in user
    const user = await getCurrentUser();

    // Check if the user is an error message or a valid CurrentUser
    if (typeof user === "string") {
      return { success: false, msg: user }; // Return the error message if it's a string
    }

    const userId = user.email; // Extract user ID from the user object

    // Query the Tickets collection to find all tickets matching the current user's ID
    const data = await databases.listDocuments(
      DATABASE_ID as string, // Database ID
      TICKETS_ID as string, // Tickets collection ID
      [Query.equal("userId", userId)] // Query filter to match user ID
    );

    if (data.documents.length === 0) {
      return { success: false, msg: "User not Found" };
    }

    // Map documents to TicketParams[]
    const tickets: TicketParams[] = data.documents.map((doc) => ({
      userId: doc.userId || "",
      from: doc.from || "",
      to: doc.to || "",
      price: doc.price || 0,
      purchaseDate: doc.purchaseDate || "",
      ticketId: doc.ticketId || "",
    }));

    // Return success status with the list of user tickets
    return { success: true, data: tickets };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Failed to fetch User Ticket Info Document from the DB: ${error.message}`
      );
      return { success: false, msg: error.message };
    }
    console.error(
      `Failed to fetch User Ticket Info Document from the DB: Unknown error`
    );
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
