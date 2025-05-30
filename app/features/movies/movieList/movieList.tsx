/// Stores
import { useMovieStore } from '../../../stores/useMovieStore';

/// Types
import type { Movie } from '../types';

/// Components
import BaseButton from '~/components/buttons/baseButton';
import WatchedIcon from '~/components/icons/watchedIcon';
import BaseBadge from '~/components/badges/baseBadge';

interface MovieListProps {
    onSelect: (movie: Movie) => void;
}

function MovieList({ onSelect }: MovieListProps) {
    /// State
    const movies = useMovieStore(state => state.movies);
    const remove = useMovieStore(state => state.remove);

    /// Handlers
    const handleRemove = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        remove(id);
    };

    const handleRowClick = (movie: Movie) => {
        onSelect(movie);
    };

    return (
        <div className="ma-movie-list-container">
            {movies.length === 0 ? (
                <div className="ma-movie-list">
                    <i className="bi bi-film" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                    <p className="mb-0">You haven't added any movies yet.</p>
                    <small>Use the "Add Movie" button to get started.</small>
                </div>
            ) : (
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
                        {movies.map((movie: Movie) => (
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
                                            text={movie.rating.toString()} />
                                    ) : (
                                        <span className="text-muted">N/A</span>
                                    )}
                                </td>
                                <td>
                                    <BaseButton
                                        variant="danger"
                                        icon="bi-trash"
                                        text='Remove'
                                        dataId={`ma-remove-movie-${movie.id}`}
                                        onClick={(e) => handleRemove(movie.id, e)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MovieList;
