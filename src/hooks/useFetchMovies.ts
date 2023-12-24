import { useInfiniteQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMovies = async ({ pageParam }: { pageParam: number }) => {
  const res = await fetch(
    `${API_BASE_URL}?page=${pageParam}&api_key=${TMDB_API_KEY}`
  );
  return res.json();
};

export const useFetchMovies = (): {
  data: any;
  status: string;
  error: Error | null;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isFetching: boolean;
} => {
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    // Set the stale time to 5 minutes (300,000 milliseconds)
    staleTime: 300000,
  });

  return {
    data: data ? data.pages : [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  };
};
