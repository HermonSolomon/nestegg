import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Media } from "../../types/media";
import { useMoviesContext } from "../../context/MovieContext";

interface MovieCardProps {
  media: Media;
  innerRef?: (node?: Element | null | undefined) => void;
  mediaType: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  media,
  innerRef,
  mediaType,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { theme } = useMoviesContext();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      const isMediaFavorite = favorites.some(
        (favorite: Media) => favorite.id === media.id
      );
      setIsFavorite(isMediaFavorite);
    }
  }, [media.id]);

  const handleAddToFavorites = () => {
    const favoritesString = localStorage.getItem("favorites") || "[]";
    const favorites = JSON.parse(favoritesString);

    if (!Array.isArray(favorites)) {
      alert("Error: Favorites is not an array.");
      return;
    }

    favorites.push({
      id: media.id,
      title: media.title,
      name: media.name,
      image: media.poster_path,
      genre_ids: media.genre_ids ? media.genre_ids.flat() : [],
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
              <Link to={`/${mediaType}/${media.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${media.backdrop_path}`}
                  alt={`${media.title} Backdrop`}
                  className="object-cover w-full h-full rounded-lg "
                  loading="lazy"
                />
              </Link>
            </div>
            <h3
              className={`text-sm ${
                theme !== "light" ? "text-white" : "text-gray-800"
              }`}
              data-testid={`media-${media.id}`}
            >
              {mediaType === "movie" ? media.title : media.name}
            </h3>
          </div>
        </div>
      </li>
    </div>
  );
};

export default MovieCard;
