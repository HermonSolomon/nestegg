import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
} from "react";
import { useFetchMedia } from "../hooks/useFetchMedia";
import { MediaContextType } from "../types/media-context";

export const MoviesContext = createContext<MediaContextType | undefined>(
  undefined
);

export const useMoviesContext = (): MediaContextType => {
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
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFetchMedia(mediaType);

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
