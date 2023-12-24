import { useInView } from "react-intersection-observer";
import { useMoviesContext } from "../../context/MovieContext";
import { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import { useFetchMovies } from "../../hooks/useFetchMovies";
import SearchBox from "../SearchBar/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

const MoviesList = () => {
  const { ref, inView } = useInView();
  const { hasNextPage, fetchNextPage, isFetchingNextPage, isFetching, data } =
    useFetchMovies();

  const { movies } = useMoviesContext();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, debouncedSearch]);

  const filteredMovies =
    movies?.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];

  const filteredContent = filteredMovies.map((movie: Movie, index: number) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      innerRef={index === 0 ? ref : undefined}
    />
  ));

  return (
    <div className="bg-gray-800 font-mono">
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <SearchBox onChange={setSearch} />
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-4">
          {debouncedSearch
            ? filteredContent
            : data?.map((page: any) =>
                page.results.map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} innerRef={ref} />
                ))
              ) || []}
        </ul>
        <div>{(isFetching || isFetchingNextPage) && <Loader />}</div>
      </div>
    </div>
  );
};

export default MoviesList;
