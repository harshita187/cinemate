import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { fetchTrendingMovies, searchMovies } from './api';
import type { Movie } from './types';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies(page);
        if (data && data.results) {
          setMovies(prev => (page === 1 ? data.results : [...prev, ...data.results]));
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      }
      setLoading(false);
    };

    const searchForMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(searchQuery, page);
        if (data && data.results) {
          setMovies(prev => (page === 1 ? data.results : [...prev, ...data.results]));
        }
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Failed to search movies. Please try again later.');
      }
      setLoading(false);
    };

    if (searchQuery) {
      searchForMovies();
    } else {
      loadMovies();
    }
  }, [searchQuery, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">CineMate</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;