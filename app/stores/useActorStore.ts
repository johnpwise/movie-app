import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/// Types
import type { IActor } from '../features/actors/types';

interface ActorStore {
    actors: IActor[];
    add: (actor: IActor) => void;
    remove: (id: string) => void;
    set: (actors: IActor[]) => void;
    update: (updated: IActor) => void;
}

export const useActorStore = create<ActorStore>()(
    persist(
        (set) => ({
            actors: [],
            add: (actor) => set((state) => {
                if (state.actors.find(a => a.id === actor.id)) return state;
                return { actors: [...state.actors, actor] };
            }),
            remove: (id) => set((state) => ({ actors: state.actors.filter((a) => a.id !== id) })),
            set: (actors) => set({ actors }),
            update: (updated: IActor) => set((state) => ({
                actors: state.actors.map(a => a.id === updated.id ? updated : a)
            }))
        }),
        {
            name: 'actor-store', // Key used in localStorage
        }
    )
);