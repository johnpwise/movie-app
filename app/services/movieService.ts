/// Services
import { getAll, post, put, del } from './baseService';
import type { IMovie } from '../features/movies/types';

export async function getAllMoviesAsync(): Promise<IMovie[]> {
    return getAll<IMovie>('/api/movies');
}

export async function addMovieAsync(movie: Omit<IMovie, 'id'>): Promise<{ id: string }> {
    return post<Omit<IMovie, 'id'>, { id: string }>('/api/movies', movie);
}

export async function updateMovieAsync(movie: IMovie): Promise<void> {
    return put<IMovie>(`/api/movies/${movie.id}`, movie);
}

export async function deleteMovieAsync(id: string): Promise<void> {
    return del(`/api/movies/${id}`);
}
