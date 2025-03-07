# Subscription CRUD App

A modern subscription management application built with **Next.js**, **Prisma**, and **PostgreSQL**. This app allows users to manage their subscriptions.

## Features

- **Subscription Management**: Add, update, and delete subscriptions.
- **Dashboard**: A user-friendly dashboard to view all subscriptions at a glance.
- **Responsive Design**: Fully responsive design for mobile and desktop.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Install dependencies**

    ```bash
    npm install
    ```
3. **Set up environment variables**

  Create a .env file in the root directory and add the DATABASE_URL
      ```
      DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
      ```

4. **Run the database migrations**

    ```
    npx prisma migrate dev --name init
    ```

5. **Start the development server**

    ```
    npm run dev
    ```
The app should now be running on http://localhost:3000.

## Database Schema
The database schema is defined using Prisma. Below is a simplified version of the schema:
  ````
  model Subscription {
    id        Int      @id @default(autoincrement())
    name      String
    price     Float
    dueDate   DateTime
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ````
