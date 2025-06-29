import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {useLayoutContext} from './LayoutProvider';

// Landscape layout container
const LandscapeContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

// Main chess area in landscape mode
const ChessMainArea = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    background: ${({theme}) => theme.colors.background};
`;

// Top bar for game info in landscape mode
const TopBar = styled.header`
    height: 60px;
    padding: ${({theme}) => theme.spacing.sm} ${({theme}) => theme.spacing.md};
    background: ${({theme}) => theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
`;

// Chess board container in landscape mode
const ChessBoardContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({theme}) => theme.spacing.lg};
    min-height: 0; // Important for flexbox to allow shrinking
`;

// Resizable sidebar for landscape mode
const Sidebar = styled.aside<{ width: number; $isCollapsed: boolean }>`
    width: ${({width, $isCollapsed}) => $isCollapsed ? '0px' : `${width}px`};
    height: 100vh;
    background: ${({theme}) => theme.colors.backgroundSecondary};
    border-left: 1px solid ${({theme}) => theme.colors.border};
    transition: ${({theme}) => `width ${theme.transitions.normal}`};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`;

// Sidebar header with tabs
const SidebarHeader = styled.div`
    height: 60px;
    padding: ${({theme}) => theme.spacing.sm};
    border-bottom: 1px solid ${({theme}) => theme.colors.border};
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.spacing.sm};
    flex-shrink: 0;
`;

// Tab button for sidebar sections
const TabButton = styled.button<{ $isActive: boolean }>`
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 4px;
    background: ${({theme, $isActive}) =>
            $isActive ? theme.colors.primary : theme.colors.surface};
    color: ${({theme, $isActive}) =>
            $isActive ? theme.colors.textInverse : theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: ${({theme}) => `all ${theme.transitions.fast}`};

    &:hover {
        background: ${({theme, $isActive}) =>
                $isActive ? theme.colors.primaryHover : theme.colors.surfaceHover};
    }
`;

// Sidebar content area
const SidebarContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: ${({theme}) => theme.spacing.md};
`;

// Resize handle for sidebar
const ResizeHandle = styled.div`
    width: 4px;
    height: 100%;
    background: transparent;
    cursor: col-resize;
    position: absolute;
    left: -2px;
    top: 0;

    &:hover {
        background: ${({theme}) => theme.colors.primary};
    }
`;

// Landscape layout component
interface LandscapeLayoutProps {
    children?: ReactNode;
    chessBoardSlot?: ReactNode;
    topBarSlot?: ReactNode;
    sidebarContent?: ReactNode;
    availableTabs?: string[];
}

export const LandscapeLayout: React.FC<LandscapeLayoutProps> = ({
                                                                    children,
                                                                    chessBoardSlot,
                                                                    topBarSlot,
                                                                    sidebarContent,
                                                                    availableTabs = ['chat', 'moves', 'analysis'],
                                                                }) => {
    const {
        showSidebar,
        setSidebarVisible,
        activePanels,
        togglePanel,
    } = useLayoutContext();

    // Sidebar state (could be moved to context if needed)
    const [sidebarWidth, setSidebarWidth] = React.useState(350);
    const [activeTab, setActiveTab] = React.useState(availableTabs[0]);

    // Handle sidebar resize
    const handleResize = React.useCallback((e: React.MouseEvent) => {
        const startX = e.clientX;
        const startWidth = sidebarWidth;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (startX - moveEvent.clientX);
            setSidebarWidth(Math.max(250, Math.min(600, newWidth)));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [sidebarWidth]);

    return (
        <LandscapeContainer>
            <ChessMainArea>
                <TopBar>
                    {topBarSlot || (
                        <>
                            <div>Game Info</div>
                            <button onClick={() => setSidebarVisible(!showSidebar)}>
                                {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
                            </button>
                        </>
                    )}
                </TopBar>

                <ChessBoardContainer>
                    {chessBoardSlot || children || (
                        <div style={{
                            width: '400px',
                            height: '400px',
                            background: '#f0d9b5',
                            border: '2px solid #8b4513',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            Chess Board Placeholder
                        </div>
                    )}
                </ChessBoardContainer>
            </ChessMainArea>

            <Sidebar
                width={sidebarWidth}
                $isCollapsed={!showSidebar}
                style={{position: 'relative'}}
            >
                {showSidebar && (
                    <>
                        <ResizeHandle onMouseDown={handleResize}/>

                        <SidebarHeader>
                            {availableTabs.map(tab => (
                                <TabButton
                                    key={tab}
                                    $isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </TabButton>
                            ))}
                        </SidebarHeader>

                        <SidebarContent>
                            {sidebarContent || (
                                <div>
                                    <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                                    <p>Content for {activeTab} panel goes here.</p>
                                </div>
                            )}
                        </SidebarContent>
                    </>
                )}
            </Sidebar>
        </LandscapeContainer>
    );
};