# NestEgg

This React TypeScript application functions as a streamlined movie website, seamlessly fetching an extensive list of movies and TV shows from a TMDB API endpoint and showcasing them on the site. Key functionalities such as filtering, sorting, and debounced searching enhance the user experience. To ensure efficient state management, the application leverages the React Context API and TanStack React Query, incorporating robust caching mechanisms. This choice not only provides global handling of asynchronous state but also enables users to add movies and TV shows to their favorites seamlessly, maintaining state coherence across page refreshes.

## Table of Contents

1. [Installation](#installation)
2. [Folder Structure](#folder-structure)
3. [Component Architecture](#component-architecture)
4. [State Management](#state-management)
5. [Styling](#styling)

## Installation

To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/HermonSolomon/nestegg.git

# Navigate to the project directory
cd nestegg

# Install dependencies
npm install
```

## Folder Structure

This app uses modular approach in organising the folder structure. The UI is split from the business logic for better readability and maintenance

```bash
src/
|-- components/
   |-- Header/
       |--Header.tsx
   |-- Home/
       |--Home.tsx
   |-- MediaCard/
       |--MediaCard.tsx
   |-- MediaDetails/
       |--MediaDetails.tsx
   |-- RootLayout/
       |--RootLayout.tsx
|-- context/
    |-- MediaContext.ts
|-- hooks/
    |-- useDebounce.tsx
    |-- useFetchGenre.ts
    |-- useFetchMedia.ts
    |-- useFetchSingleMedia.ts
|-- pages/
   |-- Favorites/
       |--Favorites.tsx
   |-- Home/
       |--Home.tsx
   |-- MediaDetails/
       |--MediaDetails.tsx
   |-- RootLayout/
       |--RootLayout.tsx
|-- types/
    |-- media-context.d.ts
    |-- media.d.ts

```

## Component Architecture

The movie website is built with the following components:

- **Header**: Displays the logo and navigation links.
- **Movie/TV List**: Displays a list of movie or tv retrieved from the API.
- **Movie Detail**: Displays details of a selected movie or tv.
- **Favorites**: Displays items added to the Favorites.

## State Management

The application efficiently manages state through the React Context API and React Query. Users can seamlessly integrate movies and TV shows into their favorites, with the application intelligently preserving state across page refreshes. It's important to highlight that, despite the potential suitability of React's built-in Context for this task given the project's size and complexity, the deliberate choice of React Query demonstrates a nuanced understanding of state management in the context of larger applications.

## Styling

The styling of components is achieved through the Tailwind CSS framework, ensuring simplicity and user-friendly design. It embraces responsive principles, catering to optimal user experiences on both desktop and mobile screens.
