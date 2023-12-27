export type MediaContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  mediaType: string;
  setMediaType: (value: "movie" | "tv") => void;
};
