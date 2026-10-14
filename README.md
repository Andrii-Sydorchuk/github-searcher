# GitHub Searcher

This project is a GitHub search interface built with Next.js, React, TypeScript, Redux Toolkit, and CSS Modules. It allows users to search for GitHub users or repositories, switch between result types, and see loading, empty, and error states.

## High-Level Solution

The application follows a simple, predictable state flow:

- The search bar captures the current text and selected entity type.
- A custom hook debounces user input before dispatching a search request.
- The Redux slice manages the search lifecycle, caches valid result sets, and preserves UI state such as loading and error messages.
- The shared API client calls the GitHub REST search endpoints and normalizes failures into user-friendly messages.
- The results grid renders either users or repositories using the same component structure, while remaining type-safe.

## Technical Decisions and Why They Were Chosen

### 1. Redux Toolkit for state management

I used Redux Toolkit instead of ad hoc component state because the search flow spans multiple UI concerns: input value, active entity type, cached results, loading status, and error state. Keeping this logic in a central slice makes the data flow easier to reason about and avoids prop-drilling.

### 2. Debounced search requests

The search hook delays execution after the user stops typing for a short period. This reduces unnecessary API requests, prevents excessive network churn, and keeps the interface responsive while still feeling immediate. It also helps avoid redundant searches for the same term when the user is typing quickly.

### 3. Query normalization and caching

Queries are trimmed and lowercased before they are used as lookup keys. This ensures that 'GitHub', 'github', and 'GITHUB' all resolve to the same cached request. Caching by entity type and normalized query avoids re-fetching identical searches and improves responsiveness for repeated lookups.

### 4. CSS Modules for styling

I used CSS Modules to keep styling scoped to each component without introducing a CSS framework. This matches the requirement to stay lightweight while preserving a clean component structure and reducing the risk of class-name collisions.

### 5. Session persistence for search state

The Redux store is persisted with 'redux-persist' using session storage. This keeps the selected entity type and recent cached searches available while the browser session remains active, improving continuity without introducing a heavier persistence layer or database setup.

### 6. Shared API abstraction

The GitHub API client sits behind a dedicated service layer so the UI does not directly handle request configuration or API-specific error parsing. This keeps the component layer focused on rendering and leaves the network logic in one reusable place.

## Notes on Behavior

- Searches are blocked for queries shorter than three characters to avoid noisy API requests.
- Clearing the input resets the interface state and removes the current result display.
- Switching entity types clears stale result data so the UI does not mix repository and user results unexpectedly.
- GitHub API failures are translated into readable messages when rate limits or network issues occur.
