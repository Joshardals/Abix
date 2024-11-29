# Abix

**Abix** is a simple flight booking platform where users can effortlessly book flight tickets..

---

## Key Features

- **Flight Search**: Browse and filter flights by destination, date, price to find the best options.
- **Ticket Booking**: Book flights with ease.
- **User Profiles**: view ticket history.
- **Payment Integration**: Complete payments securely with Stripe for a seamless checkout experience.

--- 

## Technology Stack

- **Frontend**: Next.js
- **Backend**: Appwrite
- **Database**: Appwrite Database
- **Payment Gateway**: Stripe
- **Authentication**: Appwrite

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js**: [Download here](https://nodejs.org/) (v14+ recommended)
- **Yarn Package Manager**: [Installation guide](https://yarnpkg.com/getting-started/install)

---

### Installation

1. **Extract the project folder**: If you received a zipped file, extract it to your preferred directory.
2. **Install dependencies**: Run the following command in the project root to install all required packages:
   ```bash
   yarn install
   ```

# Environment Variables Setup

To run this project, you need to set up environment variables. Follow the instructions below to get started.

---

## Required Environment Variables

Provide the following variables in a `.env.local` file in the root directory of the project:

| Variable Name                 | Description                            |
| ----------------------------- | -------------------------------------- |
| APPWRITE_PROJECT_ID           | Your Appwrite project ID               |
| APPWRITE_API_KEY              | Your Appwrite API key                  |
| NEXT_PUBLIC_APPWRITE_ENDPOINT | The Appwrite endpoint URL              |
| APPWRITE_DATABASE_ID          | The Appwrite database ID               |
| APPWRITE_USERS_ID             | The Appwrite collection ID for users   |
| APPWRITE_TICKETS_ID           | The Appwrite collection ID for tickets |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | Your Stripe public key                 |
| STRIPE_SECRET_KEY             | Your Stripe secret key                 |

---

## Setting Up Environment Variables

1. **Create a `.env.local` file** in the root directory of your project.
2. Use the following structure and replace the placeholder values with your actual API keys and IDs:

   ```env
   APPWRITE_PROJECT_ID=your-appwrite-project-id
   APPWRITE_API_KEY=your-appwrite-api-key
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   APPWRITE_DATABASE_ID=your-database-id
   APPWRITE_USERS_ID=your-users-id
   APPWRITE_TICKETS_ID=your-tickets-id
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

## Running The Project

1. yarn dev
2. Open your browser and navigate to http://localhost:3000.


