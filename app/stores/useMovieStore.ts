import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/// Types
import type { IMovie } from '../features/movies/types';

interface MovieStore {
    movies: IMovie[];
    add: (m: IMovie) => void;
    remove: (id: string) => void;
    set: (ms: IMovie[]) => void;
    update: (updated: IMovie) => void;
}

export const useMovieStore = create<MovieStore>()(
    persist(
        (set) => ({
            movies: [],
            add: m => set(s => {
                if (s.movies.find(movie => movie.id === m.id)) return s;
                return { movies: [...s.movies, m] };
            }),
            remove: (id) => set((s) => ({ movies: s.movies.filter((m) => m.id !== id) })),
            set: (ms) => set({ movies: ms }),
            update: (updated: IMovie) => set(s => ({
                movies: s.movies.map(m => m.id === updated.id ? updated : m)
            }))
        }),
        {
            name: 'movie-store', // Key used in localStorage
        }
    )
);
