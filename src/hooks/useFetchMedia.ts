import { useInfiniteQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://api.themoviedb.org/3/discover";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchMedia = async ({
  pageParam,
  searchQuery,
  category,
  mediaType,
}: {
  pageParam: number;
  searchQuery?: string;
  category?: string;
  mediaType: "movie" | "tv";
}) => {
  let apiUrl = `${API_BASE_URL}/${mediaType}`;

  if (searchQuery) {
    apiUrl += `?page=${pageParam}&api_key=${TMDB_API_KEY}&query=${searchQuery}`;
  } else {
    apiUrl += `?page=${pageParam}&api_key=${TMDB_API_KEY}`;
  }

  if (category) {
    apiUrl += `&with_genres=${category}`;
  }

  const res = await fetch(apiUrl);
  return res.json();
};

export const useFetchMedia = (
  mediaType: "movie" | "tv",
  searchQuery?: string,
  category?: string
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
    queryKey: [mediaType, { searchQuery, category }],
    queryFn: ({ pageParam }) =>
      fetchMedia({ pageParam, searchQuery, category, mediaType }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
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
