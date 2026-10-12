# GitHub Searcher

This project is a single-page GitHub repository and user search application built with Next.js, React, and TypeScript.

## Solution and Technical Decisions

The application provides a responsive search interface styled entirely with Vanilla CSS Modules, complying with the requirement to avoid CSS frameworks while keeping styles modular and scoped. A custom debounce hook delays execution by 350ms, ensuring queries only run after the user pauses typing and enters at least three characters.

To prevent unauthenticated GitHub API rate limits (10 requests per minute) and provide consistent evaluation, search queries run against a realistic mock dataset with a simulated 300ms network delay to demonstrate loading skeletons and asynchronous transitions. Results are cached in memory using entity and query keys, returning instant responses for previously searched terms.

The search bar remains anchored at the top-left of the page to eliminate layout shift while typing. Clearing the input resets the interface immediately to prevent brief flashes of empty state messages, and runtime type checks in the results grid safely handle switching between users and repositories without component errors.
