# RazorTV: A Modern Movie Search Application

RazorTV is a responsive web application that allows users to search for movies, view detailed information, and manage reviews. It's built with modern web technologies and designed for a seamless user experience.

## Features

- **Movie Search:** Search for movies by title using the OMDb API.
- **Paginated Results:** Browse through search results with easy-to-use pagination.
- **Detailed Movie View:** Get comprehensive information for each movie, including poster, plot, director, actors, release date, runtime, and IMDb rating.
- **User Reviews:** Add, view, and delete reviews for any movie. Reviews are saved locally in the browser.
- **Curated Collections:** The homepage features curated collections like "Latest Movies" and "Editor's Picks".
- **Responsive Design:** A mobile-first design that looks great on all devices.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 14
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://reactjs.org/) 18
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching:** [React Query](https://tanstack.com/query/v5) for server state management and caching.
- **API:** [OMDb API](http://www.omdbapi.com/)
- **Testing:** [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- An API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd razortv
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

    Open `.env` and add your OMDb API key:

    ```
    OMDB_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Project Structure

The codebase is organized into the following main directories:

- `app/`: Contains the application's pages and API routes, following the Next.js App Router structure.
- `components/`: Reusable React components used throughout the application.
  - `components/ui`: Generic, reusable UI components (e.g., `Input`, `Select`, `Textarea`).
- `hooks/`: Custom React hooks for data fetching and other logic.
- `lib/`: Utility functions, type definitions, and client-side storage management.
