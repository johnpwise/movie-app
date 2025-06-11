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
    const [reloadKey, setReloadKey] = useState(0);
    const addMovieAsync = useMovieStore(state => state.addMovieAsync);
    const updateMovieAsync = useMovieStore(state => state.updateMovieAsync);

    const triggerReload = () => setReloadKey(prev => prev + 1);

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

        setTimeout(() => {
            triggerReload();
            handleClose();
        }, 100); // Delay to ensure modal closes before reloading
    };

    const handleSelectMovie = (selected: IMovie) => {
        setMovie(selected);
        setShowModal(true);
    };

    /// Data IDs
    const dataId = {
        addButton: 'ma-button-add-movie',
        modal: 'ma-modal-upsert-movie',
        title: 'ma-movies-title',
        description: 'ma-movies-description',
    };

    /// Render
    return (
        <div className="ma-movies">
            <h1 data-id={dataId.title}>Movies</h1>
            <p data-id={dataId.description}>Manage your movie collection here.</p>

            <BaseButton
                variant="primary"
                dataId={dataId.addButton}
                icon="bi-plus-circle"
                text="Add movie"
                onClick={handleAddNew}
            />

            <hr />

            <BaseModal
                dataId={dataId.modal}
                title={movie.id ? 'Edit Movie' : 'Add Movie'}
                cancelText="Cancel"
                saveText="Save"
                showModal={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
            >
                <UpsertMovieForm movie={movie} onChange={setMovie} />
            </BaseModal>

            <MovieList onSelect={handleSelectMovie} reloadKey={reloadKey} />
        </div>
    );
}

export default Movies;
