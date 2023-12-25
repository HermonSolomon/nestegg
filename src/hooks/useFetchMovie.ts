import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMovieData = async (id: number) => {
  const response = await fetch(
    `${API_BASE_URL}movie/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  return response.json();
};

export const useFetchMovie = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieData(Number(id)),
  });

  return {
    data,
    isLoading,
    isError,
  };
};
