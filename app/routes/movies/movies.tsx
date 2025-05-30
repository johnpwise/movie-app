import { useState } from 'react';

/// Stores
import { useMovieStore } from '../../stores/useMovieStore';

/// Types
import type { IMovie } from '../../features/movies/types';

/// Components
import BaseButton from '~/components/buttons/baseButton';

import MovieList from '../../features/movies/movieList/movieList';
import BaseModal from '../../components/modals/baseModal';
import UpsertMovieForm from '../../features/movies/upsertMovieForm/upsertMovieForm';

/// Initial movie state
const initialMovie: IMovie = {
    id: '',
    title: '',
    year: new Date().getFullYear(),
    studio: '',
    rating: 0,
    watched: false,
};

function Movies() {
    /// State
    const [showModal, setShowModal] = useState(false);
    const [movie, setMovie] = useState<IMovie>(initialMovie);
    const addMovieAsync = useMovieStore(state => state.addMovieAsync);
    const updateMovieAsync = useMovieStore(state => state.updateMovieAsync);

    /// Handlers
    const handleClose = () => setShowModal(false);

    const handleAddNew = () => {
        setMovie(initialMovie);
        setShowModal(true);
    };

    const handleSave = () => {
        if (movie.id) {
            updateMovieAsync(movie);
        } else {
            addMovieAsync({ ...movie, id: crypto.randomUUID() });
        }

        handleClose();
    };

    const handleSelectMovie = (selected: IMovie) => {
        setMovie(selected);
        setShowModal(true);
    };

    /// Render
    return (
        <div className="ma-movies">
            <h1>Movies</h1>
            <p>Manage your movie collection here.</p>

            <BaseButton
                variant="primary"
                dataId="ma-button-add-movie"
                icon="bi-plus-circle"
                text="Add movie"
                onClick={handleAddNew}
            />
            
            <hr />

            <BaseModal
                dataId="ma-modal-upsert-movie"
                title={movie.id ? 'Edit Movie' : 'Add Movie'}
                cancelText="Cancel"
                saveText="Save"
                showModal={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
            >
                <UpsertMovieForm movie={movie} onChange={setMovie} />
            </BaseModal>

            <MovieList onSelect={handleSelectMovie} />
        </div>
    );
}

export default Movies;
