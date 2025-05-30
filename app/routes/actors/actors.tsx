import { useState } from 'react';

/// Stores
import { useActorStore } from '../../stores/useActorStore';

/// Types
import type { IActor } from '../../features/actors/types';

/// Components
import BaseButton from '~/components/buttons/baseButton';
import BaseModal from '../../components/modals/baseModal';

/// Initial actor state
const initialActor: IActor = {
    id: '',
    name: '',
};

function Actors() {
    /// State
    const [showModal, setShowModal] = useState(false);
    const [actor, setActor] = useState<IActor>(initialActor);
    const add = useActorStore(state => state.add);
    const updateMovieAsync = useActorStore(state => state.updateMovieAsync);
    // const actors = useActorStore(state => state.actors);

    /// Handlers
    const handleClose = () => setShowModal(false);

    const handleAddNew = () => {
        setActor(initialActor);
        setShowModal(true);
    };

    const handleSave = () => {
        if (actor.id) {
            updateMovieAsync(actor);
        } else {
            add({ ...actor, id: crypto.randomUUID() });
        }
        handleClose();
    };

    // const handleSelectActor = (selected: IActor) => {
    //     setActor(selected);
    //     setShowModal(true);
    // };

    /// Render
    return (
        <div className="ma-actors">
            <h1>Actors</h1>
            <p>Manage your actor collection here.</p>

            <BaseButton
                variant='primary'
                dataId='add-new-actor-button'
                icon='bi-plus-circle'
                text='Add actor'
                onClick={handleAddNew}
            />

            {showModal && (
                <BaseModal
                    dataId='ma-modal-upsert-actor'
                    title={actor.id ? 'Edit Actor' : 'Add Actor'}
                    cancelText='Cancel'
                    showModal={showModal}
                    handleClose={handleClose}
                    handleSave={handleSave}
                >
                    {/* <UpsertActorForm actor={actor} onSave={handleSave} /> */}
                    <p>Upsert Actor Form</p>
                </BaseModal>
            )}
        </div>
    );
}

export default Actors;