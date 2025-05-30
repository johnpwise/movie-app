import { useEffect, useState } from 'react';

/// Stores
import { useMovieStore } from '../../../stores/useMovieStore';

/// Types
import type { IMovie } from '../types';

/// Components
import BaseButton from '~/components/buttons/baseButton';
import WatchedIcon from '~/components/icons/watchedIcon';
import BaseBadge from '~/components/badges/baseBadge';

interface MovieListProps {
    onSelect: (movie: IMovie) => void;
}

function MovieList({ onSelect }: MovieListProps) {
    /// Store
    const movies = useMovieStore(state => state.movies);
    const remove = useMovieStore(state => state.remove);
    const fetchFromApi = useMovieStore(state => state.fetchFromApi);

    /// UI State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /// Effects
    useEffect(() => {
        fetchFromApi()
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [fetchFromApi]);

    /// Handlers
    const handleRemove = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await remove(id);
        } catch (err) {
            console.error('Failed to remove movie:', err);
            setError('Failed to remove movie');
        }
    };

    const handleRowClick = (movie: IMovie) => {
        onSelect(movie);
    };

    /// Render
    if (loading) {
        return (
            <div className="ma-movie-list text-center">
                <span className="spinner-border text-secondary" role="status" aria-hidden="true" />
                <p className="mt-2 mb-0">Loading movies...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ma-movie-list text-center text-danger">
                <i className="bi bi-exclamation-circle" style={{ fontSize: '2rem' }}></i>
                <p className="mb-0">An error occurred</p>
                <small>{error}</small>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="ma-movie-list text-center">
                <i className="bi bi-film" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                <p className="mb-0">You haven't added any movies yet.</p>
                <small>Use the "Add Movie" button to get started.</small>
            </div>
        );
    }

    return (
        <div className="ma-movie-list-container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Studio</th>
                        <th>Watched</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie: IMovie) => (
                        <tr key={movie.id} onClick={() => handleRowClick(movie)}>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.studio}</td>
                            <td>
                                <WatchedIcon watched={movie.watched} />
                            </td>
                            <td>
                                {movie.rating ? (
                                    <BaseBadge
                                        dataId={`ma-movie-rating-${movie.id}`}
                                        variant="secondary"
                                        text={movie.rating.toString()}
                                    />
                                ) : (
                                    <span className="text-muted">N/A</span>
                                )}
                            </td>
                            <td>
                                <BaseButton
                                    variant="danger"
                                    icon="bi-trash"
                                    text="Remove"
                                    dataId={`ma-remove-movie-${movie.id}`}
                                    onClick={(e) => handleRemove(movie.id, e)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovieList;
