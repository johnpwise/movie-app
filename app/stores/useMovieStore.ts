import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/// Services
import { getAllMovies, addMovie, updateMovie, deleteMovie } from '../services/movieService';

/// Types
import type { IMovie } from '../features/movies/types';

interface MovieStore {
    movies: IMovie[];

    // Mutators
    add: (m: IMovie) => Promise<void>;
    remove: (id: string) => Promise<void>;
    update: (updated: IMovie) => Promise<void>;

    // Bulk setter
    set: (ms: IMovie[]) => void;

    // Sync from API
    fetchFromApi: () => Promise<void>;
}

export const useMovieStore = create<MovieStore>()(
    persist(
        (set, get) => ({
            movies: [],

            fetchFromApi: async () => {
                try {
                    const data = await getAllMovies();
                    set({ movies: data });
                } catch (err) {
                    console.error('Failed to fetch movies:', err);
                }
            },

            add: async (movie) => {
                try {
                    const { id } = await addMovie(movie);
                    const newMovie = { ...movie, id };
                    set((state) => ({
                        movies: [...state.movies, newMovie]
                    }));
                } catch (err) {
                    console.error('Failed to add movie:', err);
                }
            },

            remove: async (id) => {
                try {
                    await deleteMovie(id);
                    set((s) => ({
                        movies: s.movies.filter((m) => m.id !== id)
                    }));
                } catch (err) {
                    console.error('Failed to delete movie:', err);
                }
            },

            update: async (updated) => {
                try {
                    await updateMovie(updated);
                    set((s) => ({
                        movies: s.movies.map((m) =>
                            m.id === updated.id ? updated : m
                        )
                    }));
                } catch (err) {
                    console.error('Failed to update movie:', err);
                }
            },

            set: (ms) => set({ movies: ms })
        }),
        {
            name: 'movie-store', // persists to localStorage
        }
    )
);
