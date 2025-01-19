import React from 'react';
import { X } from 'lucide-react';
import type { Movie } from '../types';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
          <p className="text-gray-600 mb-4">{movie.overview}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Release Date: {new Date(movie.release_date).toLocaleDateString()}</span>
            <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}