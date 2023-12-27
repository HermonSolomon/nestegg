import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
} from "react";
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
  const [mediaType, setMediaType] = useState<"movie" | "tv">("tv");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = {
    theme,
    toggleTheme,
    mediaType,
    setMediaType,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
