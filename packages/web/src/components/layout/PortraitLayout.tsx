import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {useLayoutContext} from './LayoutProvider';

// Portrait layout container
const PortraitContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

// Top header area for portrait mode
const Header = styled.header`
    height: 50px;
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    background: ${({theme}) => theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    font-size: ${({theme}) => theme.typography.fontSize.sm};
`;

// Chess board area for portrait mode - takes most of the space
const ChessBoardArea = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.colors.background};
    padding: ${({theme}) => theme.spacing.sm};
    min-height: 0; // Important for flexbox
    max-height: 65vh; // Leave room for bottom panels
`;

// Bottom panel area that can be collapsed/expanded
const BottomPanelArea = styled.div<{
    isExpanded: boolean;
    panelHeight: number;
}>`
    height: ${({isExpanded, panelHeight}) =>
            isExpanded ? `${panelHeight}px` : '60px'};
    background: ${({theme}) => theme.colors.backgroundSecondary};
    border-top: 1px solid ${({theme}) => theme.colors.border};
    transition: ${({theme}) => `height ${theme.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;

// Tab bar for bottom panels
const TabBar = styled.div`
    height: 60px;
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.spacing.xs};
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
    background: ${({theme}) => theme.colors.backgroundTertiary};
    overflow-x: auto;
    flex-shrink: 0;
`;

// Tab button for bottom panels
const TabButton = styled.button<{ isActive: boolean }>`
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 6px;
    background: ${({theme, isActive}) =>
            isActive ? theme.colors.primary : theme.colors.surface};
    color: ${({theme, isActive}) =>
            isActive ? theme.colors.textInverse : theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.xs};
    font-weight: ${({theme}) => theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: ${({theme}) => `all ${theme.transitions.fast}`};
    white-space: nowrap;
    min-width: 60px;

    &:hover {
        background: ${({theme, isActive}) =>
                isActive ? theme.colors.primaryHover : theme.colors.surfaceHover};
    }
`;

// Expand/collapse button
const ExpandButton = styled.button<{ isExpanded: boolean }>`
    margin-left: auto;
    padding: ${({theme}) => theme.spacing.xs};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 4px;
    background: ${({theme}) => theme.colors.surface};
    color: ${({theme}) => theme.colors.text};
    cursor: pointer;
    transition: ${({theme}) => `all ${theme.transitions.fast}`};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    &:hover {
        background: ${({theme}) => theme.colors.surfaceHover};
    }

    &::before {
        content: '${({isExpanded}) => isExpanded ? '▼' : '▲'}';
        font-size: 12px;
    }
`;

// Panel content area
const PanelContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme}) => theme.spacing.sm};
`;

// Swipeable content container for gesture support
const SwipeableContent = styled.div`
    width: 100%;
    height: 100%;
    touch-action: pan-y; // Allow vertical scrolling but capture horizontal swipes
`;

// Floating action button for quick actions
const FloatingActionButton = styled.button`
    position: fixed;
    bottom: 80px;
    right: 16px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.textInverse};
    font-size: 24px;
    cursor: pointer;
    box-shadow: ${({theme}) => theme.shadows.lg};
    transition: ${({theme}) => `all ${theme.transitions.fast}`};
    z-index: ${({theme}) => theme.zIndices.overlay};

    &:hover {
        background: ${({theme}) => theme.colors.primaryHover};
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

// Portrait layout component
interface PortraitLayoutProps {
    children?: ReactNode;
    chessBoardSlot?: ReactNode;
    headerSlot?: ReactNode;
    panelContent?: ReactNode;
    availableTabs?: string[];
    showFloatingButton?: boolean;
    onFloatingButtonClick?: () => void;
}

export const PortraitLayout: React.FC<PortraitLayoutProps> = ({
                                                                  children,
                                                                  chessBoardSlot,
                                                                  headerSlot,
                                                                  panelContent,
                                                                  availableTabs = ['chat', 'moves'],
                                                                  showFloatingButton = true,
                                                                  onFloatingButtonClick,
                                                              }) => {
    const {
        activePanels,
        togglePanel,
        dimensions,
    } = useLayoutContext();

    // Local state for portrait layout
    const [activeTab, setActiveTab] = React.useState(availableTabs[0]);
    const [isPanelExpanded, setIsPanelExpanded] = React.useState(false);
    const [panelHeight, setPanelHeight] = React.useState(200);

    // Calculate optimal panel height based on screen size
    React.useEffect(() => {
        const optimalHeight = Math.min(300, dimensions.height * 0.4);
        setPanelHeight(optimalHeight);
    }, [dimensions.height]);

    // Handle tab switching
    const handleTabClick = (tab: string) => {
        if (activeTab === tab && isPanelExpanded) {
            setIsPanelExpanded(false);
        } else {
            setActiveTab(tab);
            setIsPanelExpanded(true);
        }
    };

    // Handle panel expand/collapse
    const handleExpandToggle = () => {
        setIsPanelExpanded(!isPanelExpanded);
    };

    // Handle floating button click
    const handleFloatingClick = () => {
        if (onFloatingButtonClick) {
            onFloatingButtonClick();
        } else {
            // Default action: toggle chat panel
            handleTabClick('chat');
        }
    };

    return (
        <PortraitContainer>
            <Header>
                {headerSlot || (
                    <>
                        <div>Game Status</div>
                        <div>Time Controls</div>
                    </>
                )}
            </Header>

            <ChessBoardArea>
                <SwipeableContent>
                    {chessBoardSlot || children || (
                        <div style={{
                            width: '100%',
                            maxWidth: '350px',
                            aspectRatio: '1',
                            background: '#f0d9b5',
                            border: '2px solid #8b4513',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                        }}>
                            Chess Board
                        </div>
                    )}
                </SwipeableContent>
            </ChessBoardArea>

            <BottomPanelArea
                isExpanded={isPanelExpanded}
                panelHeight={panelHeight}
            >
                <TabBar>
                    {availableTabs.map(tab => (
                        <TabButton
                            key={tab}
                            isActive={activeTab === tab && isPanelExpanded}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </TabButton>
                    ))}

                    <ExpandButton
                        isExpanded={isPanelExpanded}
                        onClick={handleExpandToggle}
                    />
                </TabBar>

                {isPanelExpanded && (
                    <PanelContent>
                        {panelContent || (
                            <div>
                                <h4>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h4>
                                <p>Content for {activeTab} panel goes here.</p>
                                <p>This panel can be swiped or tapped to navigate between different sections.</p>
                            </div>
                        )}
                    </PanelContent>
                )}
            </BottomPanelArea>

            {showFloatingButton && (
                <FloatingActionButton onClick={handleFloatingClick}>
                    💬
                </FloatingActionButton>
            )}
        </PortraitContainer>
    );
};