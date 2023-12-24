import React, { createContext, useContext, ReactNode, FC } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { MoviesContextType } from "../types/movie-context";

export const MoviesContext = createContext<MoviesContextType | undefined>(
  undefined
);

export const useMoviesContext = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within a MoviesProvider");
  }
  return context;
};

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: FC<MoviesProviderProps> = ({ children }) => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFetchMovies();

  const contextValue = {
    movies: data[0]?.results || null,
    error,
    status: status as "error" | "loading" | "success" | "pending",
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
