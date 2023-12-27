import { useInView } from "react-intersection-observer";
import { Media } from "../../types/media";
import { useEffect, useState } from "react";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import SearchBox from "../SearchBar/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
import { useMoviesContext } from "../../context/MovieContext";

const MoviesList = () => {
  const { ref, inView } = useInView();
  //   const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const { theme, mediaType, setMediaType } = useMoviesContext();

  const { hasNextPage, fetchNextPage, isFetchingNextPage, isFetching, data } =
    useFetchMedia(mediaType as "movie" | "tv");

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, debouncedSearch, mediaType]);

  const filteredMedia = data?.flatMap((page: any) =>
    page.results.filter((media: Media) => {
      const lowercaseTitle =
        (media.title && typeof media.title === "string"
          ? media.title.toLowerCase()
          : "") ||
        (media.name && typeof media.name === "string"
          ? media.name.toLowerCase()
          : "");

      return lowercaseTitle.includes(debouncedSearch.toLowerCase());
    })
  );

  const mediaContent = filteredMedia?.map((media: Media, index: number) => (
    <MovieCard
      key={media.id}
      media={media}
      mediaType={mediaType}
      innerRef={index === 0 ? ref : undefined}
    />
  ));

  return (
    <div
      className={`bg-${theme === "light" ? "white" : "gray-800"} ${
        theme !== "light" ? "text-white" : "text-gray-800"
      } font-mono p-4`}
    >
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <SearchBox onChange={setSearch} />
          <label className="mr-2">Filter by:</label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as "movie" | "tv")}
            className="p-2 border rounded-md text-black sm:w-auto md:w-auto lg:w-auto xl:w-auto w-full"
          >
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-4">
          {debouncedSearch
            ? mediaContent
            : data?.map((page: any) =>
                page.results.map((media: Media) => (
                  <MovieCard
                    key={media.id}
                    media={media}
                    mediaType={mediaType}
                    innerRef={ref}
                  />
                ))
              )}
        </ul>
        <div>{(isFetching || isFetchingNextPage) && <Loader />}</div>
      </div>
    </div>
  );
};

export default MoviesList;
