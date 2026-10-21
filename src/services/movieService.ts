import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieSearchResponse {
  results: Movie[];
}

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN as string;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<MovieSearchResponse>('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
    },
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  return data.results;
};
