import { useQuery } from "@tanstack/react-query";

const API_BASE_URL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMoviesGenre = async () => {
  const response = await fetch(`${API_BASE_URL}&api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  const data = await response.json();
  return data.genres;
};

export const useFetchGenre = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["genre"],
    queryFn: () => fetchMoviesGenre(),
  });

  const genreData = data || [];

  return {
    data: genreData,
    isLoading,
    isError,
  };
};
