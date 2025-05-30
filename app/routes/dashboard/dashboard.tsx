import { useMovieStore } from "../../stores/useMovieStore";

/// Components
import Tile from "../../features/dashboard/tiles/tile";
import MovieTile from "../../components/tiles/movieTile/movieTile";

export async function loader() {
    // e.g. const stats = await fetchStats()
    return null;
}

function Dashboard() {
    /// State
    const movies = useMovieStore(state => state.movies);

    /// Constants
    const watchedCount = movies.filter(movie => movie.watched).length;
    const unwatchedCount = movies.length - watchedCount;

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