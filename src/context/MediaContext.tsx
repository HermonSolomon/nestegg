import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
} from "react";
import { MediaContextType } from "../types/media-context";

export const MediaContext = createContext<MediaContextType | undefined>(
  undefined
);

export const useMediaContext = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaContext must be used within a MoviesProvider");
  }
  return context;
};

interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: FC<MediaProviderProps> = ({ children }) => {
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
    <MediaContext.Provider value={contextValue}>
      {children}
    </MediaContext.Provider>
  );
};
