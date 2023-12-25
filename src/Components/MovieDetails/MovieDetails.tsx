import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useFetchMovie } from "../../hooks/useFetchMovie";

const MovieDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useFetchMovie(Number(id));

  if (isLoading) return <Loader />;

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="min-h-screen grid place-items-center font-mono bg-gray-900">
      <div className="bg-gray-900 rounded-md bg-gray-800 shadow-lg">
        <div className="md:flex px-4 leading-none max-w-4xl">
          <div className="flex-none" style={{ aspectRatio: "7 / 9" }}>
            {data?.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                alt="Movie Backdrop"
                className="object-cover w-full h-full rounded-lg"
                loading="lazy"
              />
            )}
          </div>

          <div className="flex-col text-gray-300">
            <p className="pt-4 text-2xl font-bold">
              {data?.title && data.title}
            </p>
            <hr className="hr-text" data-content="" />
            <div className="text-md flex justify-between px-4 my-2">
              <span className="font-bold">
                2h 2min | Crime, Drama, Thriller
              </span>
              <span className="font-bold"></span>
            </div>
            <p className="hidden md:block px-4 my-4 text-sm text-left">
              {data?.overview && data.overview}
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
