import { useEffect, useState } from "react";

/// Stores
import { useMovieStore } from "../../stores/useMovieStore";

/// Services
import { getAllMoviesAsync } from '../../services/movieService';

/// Types
import type { IMovie } from '../../features/movies/types';

/// Components
import Tile from "../../features/dashboard/tiles/tile";
import MovieTile from "../../components/tiles/movieTile/movieTile";

export async function loader() {
    // e.g. const stats = await fetchStats()
    return null;
}

function Dashboard() {
    /// State
    const [movies, setMovies] = useState<IMovie[]>([]);

    /// UI State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /// Constants
    const watchedCount = movies.filter(movie => movie.watched).length;
    const unwatchedCount = movies.length - watchedCount;

    /// Effects
    useEffect(() => {
        setLoading(true);
        getAllMoviesAsync()
            .then(setMovies)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    /// Render
    return (
        <main className="ma-dashboard-container">
            <div className="ma-dashboard">
                <header className="ma-dashboard-header">
                    <h1>Movie App Dashboard</h1>
                </header>
                <div className="ma-welcome-message-container">
                    <p className="ma-welcome-message">
                        Welcome to your dashboard!
                    </p>
                </div>
                <div className="ma-tiles-container">
                    <Tile title="Watched" value={watchedCount} total={movies.length} />
                    <Tile title="Unwatched" value={unwatchedCount} total={movies.length} />
                </div>

                <div>
                    {movies.length > 0 ? (
                        <div className="ma-movie-list-container">
                            {movies.map(movie => (
                                <MovieTile key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <p>No movies available.</p>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Dashboard;