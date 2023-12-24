import React from "react";
import { useParams } from "react-router-dom";
import { useMoviesContext } from "../../context/MovieContext";

const MovieDetails = () => {
  const { movies, status } = useMoviesContext();
  const { id } = useParams();

  const isSuccess = status === "success";

  const selectedMovie = isSuccess
    ? movies?.find((movie) => movie.id.toString() === id)
    : null;

  if (!isSuccess || !selectedMovie) {
    return <p>Can't find the movie you've selected</p>;
  }

  return (
    <div className="min-h-screen grid place-items-center font-mono bg-gray-900">
      <div className="bg-gray-900 rounded-md bg-gray-800 shadow-lg">
        <div className="md:flex px-4 leading-none max-w-4xl">
          <div className="flex-none" style={{ aspectRatio: "7 / 9" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt="backdrop_path"
              className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg object-cover w-full h-full"
            />
          </div>

          <div className="flex-col text-gray-300">
            <p className="pt-4 text-2xl font-bold">{selectedMovie.title}</p>
            <hr className="hr-text" data-content="" />
            <div className="text-md flex justify-between px-4 my-2">
              <span className="font-bold">
                2h 2min | Crime, Drama, Thriller
              </span>
              <span className="font-bold"></span>
            </div>
            <p className="hidden md:block px-4 my-4 text-sm text-left">
              {selectedMovie.overview}
            </p>

            <p className="flex text-md px-4 my-2">
              Rating: 9.0/10
              <span className="font-bold px-2">|</span>
              Mood: Dark
            </p>

            <div className="text-xs">
              <button
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                TRAILER
              </button>

              <button
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                IMDB
              </button>

              <button
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                AMAZON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
