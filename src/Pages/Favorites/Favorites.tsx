import React, { useEffect, useState } from "react";
import { useFetchGenre } from "../../hooks/useFetchGenre";
import { useMoviesContext } from "../../context/MovieContext";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  name: string;
  image: string;
  genre_ids: number[];
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<MovieCardProps[]>([]);
  const [sortBy, setSortBy] = useState<"title" | "genre">("title");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { data } = useFetchGenre();
  const { theme, mediaType } = useMoviesContext();

  const genreNames = Array.isArray(data) ? data : [];

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem("favorites");

    if (storedFavoritesString) {
      const storedFavorites = JSON.parse(storedFavoritesString).map(
        (favorite: MovieCardProps) => ({
          ...favorite,
          genre_ids: favorite.genre_ids.flat(),
        })
      );

      if (Array.isArray(storedFavorites)) {
        setFavorites(storedFavorites);
      } else {
        console.error("Error: favorites is not an array.");
      }
    } else {
      setFavorites([]);
    }
  }, []);

  const handleRemoveFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const sortedAndFilteredFavorites = favorites
    .filter((favorite) =>
      selectedGenre
        ? favorite.genre_ids &&
          favorite.genre_ids.some((genreId) => genreId === selectedGenre)
        : true
    )
    .sort((a, b) => {
      if (sortBy === "title") {
        return (a.title ?? "").localeCompare(b.title ?? "");
      } else if (sortBy === "genre") {
        return a.genre_ids && b.genre_ids ? a.genre_ids[0] - b.genre_ids[0] : 0;
      }
      return 0;
    });

  return (
    <div
      className={` bg-${theme === "light" ? "white" : "gray-800"} text-${
        theme === "light" ? "black" : "white"
      }`}
    >
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <label className="mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "title" | "genre")}
              className="text-black px-2 rounded-sm"
            >
              <option value="title">Title</option>
              <option value="genre">Genre</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Filter by Genre:</label>
            <select
              className="text-black px-2 rounded-sm"
              value={selectedGenre || ""}
              onChange={(e) =>
                setSelectedGenre(
                  e.target.value ? parseInt(e.target.value, 10) : null
                )
              }
            >
              <option value="">All Genres</option>
              {genreNames.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {sortedAndFilteredFavorites.length === 0 && (
          <div className="h-screen flex items-center justify-center">
            <p className="text-center">
              Your favorites list is currently empty. Start adding movies you
              love!
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-4">
          {sortedAndFilteredFavorites.map((favorite) => {
            return (
              <div
                key={favorite.id}
                className="mt-4 flex justify-between flex-col text-left"
              >
                <div className="">
                  {favorite.image && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${favorite.image}`}
                      alt="Movie Backdrop"
                      className="object-cover w-full rounded-lg"
                      loading="lazy"
                    />
                  )}
                  <h3
                    className={`text-sm py-3 ${
                      theme !== "light" ? "text-white" : "text-gray-800"
                    }`}
                    data-testid={`media-${favorite.id}`}
                  >
                    {mediaType === "movie"
                      ? favorite.title
                      : favorite.name || favorite.title}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
