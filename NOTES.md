# Technical Notes & Architectural Overview

This document provides an in-depth look at the planning, architecture, and technical decisions made during the development of the RazorTV application.

## 1. Plan of Attack & Time Estimation

The project was broken down into the following tasks with estimated completion times.

| Task                                                 | Estimated Time |
| ---------------------------------------------------- | :------------: |
| Scaffold Next.js, TypeScript, and Tailwind CSS       |      1 hr      |
| Set up React Query for data fetching                 |      1 hr      |
| Create OMDb API proxy routes (search & details)      |     3 hrs      |
| Build Home, Search, and Movie Detail pages           |     5 hrs      |
| Implement client-side reviews with `localStorage`    |     2 hrs      |
| Polish UI for Hero Carousel and Collection Rows      |     2 hrs      |
| Implement logic for "Latest" collections             |    1.5 hrs     |
| Refine Search UX (debounce, min-length, empty state) |      1 hr      |
| Finalize README and technical notes                  |    0.5 hrs     |
| **Total Estimated Time**                             | **~17 hours**  |

### Retrospective

The initial time estimates were largely accurate. The use of Next.js and React Query streamlined the development process, particularly for data fetching and state management. The most time-consuming part was fine-tuning the UI and ensuring a smooth user experience across different states (loading, error, empty).

## 2. Architectural Decisions & Workarounds

- **OMDb API Limitations:** The OMDb API does not provide a "trending" or "latest" endpoint. To create the curated collections on the homepage, I implemented a workaround using seeded searches. The application searches for a list of common or genre-specific keywords (e.g., "love", "star", "pixar") and then enriches these search results with detailed information. The results are then filtered by `imdbVotes` (as a proxy for popularity) and sorted by release date.

- **Client-Side Reviews:** As per the requirements, reviews are stored in the browser's `localStorage`. This is a simple and effective solution for a single-user, client-side experience. The `lib/reviews-store.ts` module abstracts the `localStorage` API, providing a clean interface for reading and writing reviews.

- **Search Result Enrichment:** The OMDb search endpoint (`s=...`) returns a limited set of data for each movie. To display richer information on the search results page (like director and actors), each item in the search results is individually fetched using the details endpoint (`i=...`). React Query's caching mechanism makes this efficient, as subsequent requests for the same movie details are served from the cache.

- **Smart Back Navigation:** The `BackBar` component provides a better user experience than a simple "back to home" link. It uses `window.history.length` to determine if the user can navigate back in their history. If not (e.g., if they landed directly on a movie page), it provides a fallback link to the homepage.

## 3. Component Structure & State Management

The application follows a modern React architecture, emphasizing component composition and separation of concerns.

- **Component Structure:**

  - **`app/`**: Pages and layouts are defined here, following the Next.js App Router paradigm.
  - **`components/`**: Contains reusable UI components. These are further organized into subdirectories based on their context (e.g., `components/home`, `components/movie`).
  - **`hooks/`**: Custom hooks encapsulate data fetching and other complex logic, making components cleaner and more focused on rendering.
  - **`lib/`**: Contains shared utilities, type definitions, and business logic (like the review store).

- **State Management:**
  - **Server State:** [React Query](https://tanstack.com/query/v5) is used for all interactions with the OMDb API. It handles caching, background refetching, and loading/error states, significantly simplifying data fetching logic.
  - **Client State:** For UI-related state (e.g., input values, component visibility), React's built-in `useState` and `useRef` hooks are used. There is no need for a global state management library like Redux or Zustand for this application's scope.

## 4. Future Extensions

- **User Authentication:** Integrate a service like NextAuth.js to allow users to sign up, log in, and manage their own profiles.
- **Database-Backed Reviews:** With authentication in place, reviews could be stored in a database (e.g., PostgreSQL, MongoDB) instead of `localStorage`, allowing them to be shared and persisted across devices.
- **User Favorites/Watchlist:** Authenticated users could save movies to their personal "favorites" or "watchlist".
- **Advanced Filtering & Sorting:** Enhance the search page with options to filter by year, genre, or other criteria, and to sort results by different metrics.

## 5. Technical Considerations

- **Performance:**

  - **Caching:** React Query's caching is central to the performance strategy.
  - **Debouncing:** The search input is debounced to prevent excessive API calls while the user is typing.
  - **Image Optimization:** Next.js's built-in `Image` component is used for automatic image optimization, resizing, and lazy loading.
  - **Code Splitting:** Next.js automatically splits code by page, so users only download the JavaScript needed for the page they are visiting.

- **Security:**

  - **API Key Protection:** The OMDb API key is stored in an environment variable and used only in server-side API routes (`app/api/omdb/*`). This prevents the key from being exposed to the client.

- **Accessibility:**

  - Semantic HTML is used where appropriate.
  - Form inputs have `aria-label` attributes for screen readers.
  - Focus rings are styled for better keyboard navigation.

- **Testing:**
  - **`vitest.config.ts` TypeScript Error:** There is a known issue with how some editors' TypeScript language servers interact with Vite projects, which can cause a "Cannot find module" error for `@vitejs/plugin-react` in `vitest.config.ts`. This error does not affect the test execution, and all tests pass successfully.
