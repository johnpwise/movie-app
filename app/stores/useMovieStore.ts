import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/// Services
import { getAllMoviesAsync, addMovieAsync, updateMovieAsync, deleteMovieAsync } from '../services/movieService';

/// Types
import type { IMovie } from '../features/movies/types';

interface MovieStore {
    movies: IMovie[] | [];

    // Mutators
    addMovieAsync: (m: IMovie) => Promise<void>;
    removeMovieAsync: (id: string) => Promise<void>;
    updateMovieAsync: (updated: IMovie) => Promise<void>;

    // Bulk setter
    set: (ms: IMovie[]) => void;

    // Sync from API
    getAllMoviesAsync: () => Promise<void>;
}

export const useMovieStore = create<MovieStore>()(
    persist(
        (set, get) => ({
            movies: [],

            getAllMoviesAsync: async () => {
                try {
                    const data = await getAllMoviesAsync();
                    set({ movies: data });
                } catch (err) {
                    console.error('Failed to fetch movies:', err);
                }
            },

            addMovieAsync: async (movie) => {
                try {
                    await addMovieAsync(movie);
                    const newMovie = { ...movie };
                    set((state) => ({
                        movies: [...state.movies, newMovie]
                    }));
                } catch (err) {
                    console.error('Failed to add movie:', err);
                }
            },

            removeMovieAsync: async (id) => {
                try {
                    await deleteMovieAsync(id);
                    set((s) => ({
                        movies: s.movies.filter((m) => m.id !== id)
                    }));
                } catch (err) {
                    console.error('Failed to delete movie:', err);
                }
            },

            updateMovieAsync: async (updated) => {
                try {
                    await updateMovieAsync(updated);
                    set((s) => ({
                        movies: s.movies.map((m) =>
                            m.id === updated.id ? updated : m
                        )
                    }));
                } catch (err) {
                    console.error('Failed to updateMovieAsync movie:', err);
                }
            },

            get: () => get().movies,
            set: (ms) => set({ movies: ms })
        }),
        {
            name: 'movie-store', // persists to localStorage
        }
    )
);
