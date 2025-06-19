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

import Speedometer from '../../components/widgets/speedometer/speedometer';
import TorusGauge from '../../components/widgets/torusGauge/torusGauge';
import ArcGauge from '../../components/widgets/arcGauge/arcGauge';
import ColumnGauge from '../../components/widgets/columnGauge/columnGauge';
import BarGauge from '../../components/widgets/barGauge/barGauge';

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
        }, 100);
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
        <div className="ma-movies text-gray-500 dark:text-gray-300">
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

            <div className="mt-8">
                {/* <h2 className="text-lg font-semibold mb-4">Movie Statistics</h2> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-auto mr-auto max-w-6xl vertical-center">
                    <TorusGauge 
                        value={29}
                        lowerThreshold={25}
                        upperThreshold={75}
                        thickness={14}
                        scale={0.75} 
                        colors={['#4caf50', '#ff9800', '#f44336']}
                        demoMode={true} />

                    <TorusGauge 
                        value={29}
                        lowerThreshold={25}
                        upperThreshold={75}
                        thickness={14}
                        scale={0.75} 
                        demoMode={true} />

                    <TorusGauge 
                        value={29}
                        lowerThreshold={33}
                        upperThreshold={66}
                        thickness={14}
                        scale={0.75} 
                        colors={['#34ebeb', '#ffeb34', '#eb3434']}
                        demoMode={true} />

                    <ArcGauge 
                        value={10.5}
                        scale={0.75}
                        label={(value: number) => `${value}°C`}
                        demoMode={true} />

                    <ArcGauge 
                        value={10.5}
                        scale={0.75}
                        color="#4caf50"
                        label={(value: number) => `£${value}`}
                        demoMode={true} />

                    <BarGauge
                        value={75}
                        target={80}
                        total={100}
                        width={300}
                        height={50}
                        scale={1.5}
                        duration={1.5}
                        demoMode={true} />

                    <Speedometer 
                        value={5} 
                        min={0} 
                        max={10} 
                        scale={0.75} 
                        gaugeText='MPH' 
                        demoMode={true} />

                    <Speedometer 
                        value={5} 
                        min={0} 
                        max={10} 
                        scale={0.75} 
                        gaugeText='KPH' 
                        demoMode={true} />

                    <ColumnGauge
                        value={85}
                        target={70}
                        total={100}
                        width={68}
                        height={200}
                        scale={1.5}
                        duration={1.5}
                        demoMode={true} />
                </div>
            </div>
        </div>
    );
}

export default Movies;
