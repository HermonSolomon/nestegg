import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";
import { useMoviesContext } from "../../context/MovieContext";

interface MovieCardProps {
  movie: Movie;
  innerRef?: (node?: Element | null | undefined) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, innerRef }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is in the favorites and set the initial state
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const isMovieFavorite = favorites.some(
        (favorite: Movie) => favorite.id === movie.id
      );
      setIsFavorite(isMovieFavorite);
    }
  }, [movie.id]);

  const handleAddToFavorites = () => {
    // Get favorites from localStorage or initialize as an empty array
    const favoritesString = localStorage.getItem("favorites") || "[]";
    const favorites = JSON.parse(favoritesString);

    if (!Array.isArray(favorites)) {
      alert("Error: Favorites is not an array.");
      return;
    }

    favorites.push({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path, // Use the correct property for the image path
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsFavorite(true);
  };

  return (
    <div ref={innerRef}>
      <li className="group relative">
        <div className="mt-4 flex justify-between flex-col gap-2 text-left">
          <div className="scale-100 hover:scale-105 ease-in duration-500">
            <div style={{ aspectRatio: "7/9" }}>
              <div className="absolute z-10 left-2">
                <button
                  className="cursor-pointer"
                  onClick={handleAddToFavorites}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFavorite ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt="Movie Backdrop"
                  className="object-cover w-full h-full rounded-lg "
                  loading="lazy"
                />
              </Link>
            </div>
            <h3
              className="text-sm text-white"
              data-testid={`movie-${movie.id}`}
            >
              <p>{movie.title}</p>
            </h3>
          </div>
        </div>
      </li>
    </div>
  );
};

export default MovieCard;
