/// Types
import type { IMovie } from '../../../features/movies/types';

/// Components
import WatchedIcon from '../../icons/watchedIcon';

interface MovieTileProps {
    movie: IMovie;
}

function MovieTile({ movie }: MovieTileProps) {
    return (
        <div className="ma-movie-tile-container">
            <h4 className="ma-movie-title">{movie.title}</h4>
            <div className="ma-movie-details">
                <div className="ma-movie-year">Year: {movie.year}</div>
                <div className="ma-movie-studio">Studio: {movie.studio}</div>
                {movie.rating && <div className="ma-movie-rating">Rating: {movie.rating}</div>}
            </div>
            <div className="ma-movie-actions">
                <WatchedIcon watched={movie.watched} />
            </div>
        </div>
    );
}

export default MovieTile;