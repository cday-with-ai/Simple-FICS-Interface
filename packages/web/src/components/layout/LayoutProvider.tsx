import React, {createContext, useContext, ReactNode, useState, useEffect, useMemo} from 'react';
import {usePreferencesStore} from '@fics/shared';
import {useLayout, LayoutState, OrientationType} from '../../theme/hooks';

// Layout context interface
interface LayoutContextType extends LayoutState {
    // Layout preferences
    layoutPreference: 'auto' | 'landscape' | 'portrait';
    setLayoutPreference: (preference: 'auto' | 'landscape' | 'portrait') => void;

    // Active layout mode (considering both device orientation and user preference)
    activeLayout: OrientationType;

    // Layout utilities
    isCompactMode: boolean;
    showSidebar: boolean;
    setSidebarVisible: (visible: boolean) => void;

    // Panel management
    activePanels: string[];
    togglePanel: (panelId: string) => void;

    // Transition state
    isTransitioning: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Hook to use layout context
export const useLayoutContext = (): LayoutContextType => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayoutContext must be used within a LayoutProvider');
    }
    return context;
};

// Layout provider component
interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({children}) => {
    const preferencesStore = usePreferencesStore();
    const deviceLayout = useLayout();

    // Local state for UI elements
    const [showSidebar, setSidebarVisible] = useState(true);
    const [activePanels, setActivePanels] = useState<string[]>(['chat', 'moves']);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Get layout preference from store
    const layoutPreference = preferencesStore.preferences.layout;

    // Determine active layout based on preference and device capabilities
    const activeLayout = useMemo(() => {
        if (layoutPreference === 'auto') {
            return deviceLayout.orientation;
        }
        return layoutPreference as OrientationType;
    }, [layoutPreference, deviceLayout.orientation]);

    // Determine if we should be in compact mode
    const isCompactMode = useMemo(() => {
        return deviceLayout.isMobile || deviceLayout.dimensions.width < 768;
    }, [deviceLayout.isMobile, deviceLayout.dimensions.width]);

    // Handle layout preference changes
    const setLayoutPreference = (preference: 'auto' | 'landscape' | 'portrait') => {
        preferencesStore.updatePreference('layout', preference);
    };

    // Panel management
    const togglePanel = (panelId: string) => {
        setActivePanels(prev => {
            if (prev.includes(panelId)) {
                return prev.filter(id => id !== panelId);
            } else {
                return [...prev, panelId];
            }
        });
    };

    // Handle orientation/layout changes with smooth transitions
    useEffect(() => {
        setIsTransitioning(true);

        // Adjust sidebar visibility based on layout and screen size
        setSidebarVisible(prevVisible => {
            const newVisible = !isCompactMode;
            return prevVisible !== newVisible ? newVisible : prevVisible;
        });

        // Auto-adjust panel visibility for compact layouts
        setActivePanels(prevPanels => {
            if (isCompactMode && activeLayout === 'portrait') {
                // In portrait compact mode, minimize panels
                const newPanels = ['chat'];
                return JSON.stringify(prevPanels) !== JSON.stringify(newPanels) ? newPanels : prevPanels;
            } else if (activeLayout === 'landscape' && !isCompactMode) {
                // In landscape desktop mode, show more panels
                const newPanels = ['chat', 'moves', 'analysis'];
                return JSON.stringify(prevPanels) !== JSON.stringify(newPanels) ? newPanels : prevPanels;
            }
            return prevPanels;
        });

        // End transition after animation duration
        const transitionTimeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 300); // Match this with CSS transition duration

        return () => clearTimeout(transitionTimeout);
    }, [activeLayout, isCompactMode]);

    // Context value
    const contextValue: LayoutContextType = {
        // Device layout state
        ...deviceLayout,

        // Layout preferences
        layoutPreference,
        setLayoutPreference,

        // Active layout
        activeLayout,

        // Layout utilities
        isCompactMode,
        showSidebar,
        setSidebarVisible,

        // Panel management
        activePanels,
        togglePanel,

        // Transition state
        isTransitioning,
    };

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
};