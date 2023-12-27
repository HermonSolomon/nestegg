export type MediaContextType = {
  movies: Movie[] | null;
  // setMovies: (value: Movie[]) => void;
  error: Error | null;
  status: "error" | "loading" | "success" | "pending";
  theme: "light" | "dark";
  toggleTheme: () => void;
  mediaType: string;
};
