# Lumeo

Lumeo is a web application that allows users to search and view photos using the Unsplash API. The project is built using a monorepo structure with Nx, and it includes a frontend application built with React and Vite, and a backend server built with Express.

## Tech Stack

- **Frontend**: React, Vite
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Backend**: Express
- **API**: Unsplash API
- **Build Tool**: Nx
- **Bundler**: esbuild

## Prerequisites

- Node.js (version 14 or higher)
- Yarn package manager

## Environment Variables

Create a `.env.local` file in the `apps/lumeo-core` directory with the following content:

```plaintext
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Replace `your_unsplash_access_key` with your actual Unsplash API credentials.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ste7en/lumeo.git
cd lumeo
yarn install
```

## Running the Dev Server

To run the frontend and backend servers in development mode, use the following command:

```bash
yarn dev
```

The frontend server will be available at `http://localhost:4200`, and the backend server will be available at `http://localhost:3333`.

## Deployment

The project is configured to be deployed on Vercel.
