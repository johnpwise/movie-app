import type { IMovie } from '../features/movies/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getAllMovies(): Promise<IMovie[]> {
    const res = await fetch(`${BASE_URL}/api/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    
    console.log('Fetching movies from API:', res.url);
    console.log('Response status:', res);

    return await res.json();
}

export async function addMovie(movie: Omit<IMovie, 'id'>): Promise<{ id: string }> {
    const res = await fetch(`${BASE_URL}/api/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
    });
    if (!res.ok) throw new Error('Failed to add movie');
    return await res.json();
}

export async function updateMovie(movie: IMovie): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/movies/${movie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
    });
    if (!res.ok) throw new Error('Failed to update movie');
}

export async function deleteMovie(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/movies/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete movie');
}