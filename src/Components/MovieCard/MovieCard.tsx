// MovieCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  innerRef?: (node?: Element | null | undefined) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, innerRef }) => {
  return (
    <div ref={innerRef}>
      <Link to={`/movies/${movie.id}`}>
        <li className="group relative">
          <div className="mt-4 flex justify-between flex-col gap-2 text-left">
            <div className="scale-100 hover:scale-105 ease-in duration-500">
              <div style={{ aspectRatio: "7/9" }}>
                <div className="absolute z-10 left-2">
                  <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                    New
                  </span>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt="Movie Backdrop"
                  className="object-cover w-full h-full rounded-lg "
                  loading="lazy"
                />
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
      </Link>
    </div>
  );
};

export default MovieCard;
