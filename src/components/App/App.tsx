import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        setMovies([]);
        setIsLoading(true);
        setIsError(false);

        const data = await fetchMovies(query);
        if (!data.length) {
          toast.error('No movies found for your request.');
          return;
        }
        setMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [query]);

  const handleSubmit = (value: string) => {
    setQuery(value);
  };

  const handleChange = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const closeModal = () => {
    setCurrentMovie(null);
  };

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleChange} />
      )}
      {currentMovie && <MovieModal movie={currentMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
