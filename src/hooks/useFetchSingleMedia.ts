import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMediaData = async (id: number, mediaType: string) => {
  const response = await fetch(
    `${API_BASE_URL}${mediaType}/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch media data");
  }
  return response.json();
};

export const useFetchSingleMedia = (id: number, mediaType: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [mediaType, id],
    queryFn: () => fetchMediaData(Number(id), mediaType),
  });

  return {
    data,
    isLoading,
    isError,
  };
};
