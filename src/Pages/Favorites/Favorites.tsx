import React, { useEffect, useState } from "react";

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<MovieCardProps[]>([]);

  useEffect(() => {
    const storedFavoritesString = localStorage.getItem("favorites");

    if (storedFavoritesString) {
      const storedFavorites = JSON.parse(storedFavoritesString);

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

  return (
    <div className="bg-gray-800">
      {favorites.length === 0 && (
        <div className="h-screen flex items-center justify-center">
          <p className="text-center">
            Your favorites list is currently empty. Start adding movies you
            love!
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-4">
        {favorites.map((favorite) => {
          return (
            <div
              key={favorite.id}
              className="mt-4 flex justify-between flex-col gap-2 text-left"
            >
              <div className="flex-grow">
                {favorite.image && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${favorite.image}`}
                    alt="Movie Backdrop"
                    className="object-cover w-full rounded-lg"
                    loading="lazy"
                  />
                )}
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
  );
};

export default Favorites;
