import { useInfiniteQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Update fetchMovies function to accept a search query
const fetchMovies = async ({
  pageParam,
  searchQuery,
}: {
  pageParam: number;
  searchQuery?: string;
}) => {
  // Include the search query in the API request if it's provided
  const apiUrl = searchQuery
    ? `${API_BASE_URL}?page=${pageParam}&api_key=${TMDB_API_KEY}&query=${searchQuery}`
    : `${API_BASE_URL}?page=${pageParam}&api_key=${TMDB_API_KEY}`;

  const res = await fetch(apiUrl);
  return res.json();
};

// Update useFetchMovies hook to accept a search query parameter
export const useFetchMovies = (
  searchQuery?: string
): {
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
    // Include the search query in the queryKey
    queryKey: ["movies", { searchQuery }],
    queryFn: ({ pageParam }) => fetchMovies({ pageParam, searchQuery }),
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
