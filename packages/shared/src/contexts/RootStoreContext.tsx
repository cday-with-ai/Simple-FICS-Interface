import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import {RootStore} from '../models/RootStore';

const RootStoreContext = createContext<RootStore | null>(null);

interface RootStoreProviderProps {
    children: ReactNode;
    store?: RootStore;
}

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({
                                                                        children,
                                                                        store
                                                                    }) => {
    const rootStore = useMemo(() => store || new RootStore(), [store]);

    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = () => {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }
    return store;
};

// Convenience hooks for individual stores
export const useGameStore = () => useRootStore().gameStore;
export const useFICSStore = () => useRootStore().ficsStore;
export const useChatStore = () => useRootStore().chatStore;
export const usePreferencesStore = () => useRootStore().preferencesStore;
export const useAnalysisStore = () => useRootStore().analysisStore;
export const useSoundStore = () => useRootStore().soundStore;
export const useBackendStore = () => useRootStore().backendStore;