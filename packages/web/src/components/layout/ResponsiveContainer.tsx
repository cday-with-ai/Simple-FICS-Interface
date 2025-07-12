import React, {ReactNode} from 'react';
import styled, {css} from 'styled-components';
import {useLayoutContext} from './LayoutProvider';
import {useTheme} from '../../theme';

// Container for the entire application layout
const AppContainer = styled.div<{ isTransitioning: boolean }>`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: ${({isTransitioning, theme}) =>
    isTransitioning ? `all ${theme.transitions.normal}` : 'none'};
`;

// Main content wrapper that switches between layouts
const MainContent = styled.main<{
    activeLayout: 'portrait' | 'landscape';
    isCompactMode: boolean;
}>`
    flex: 1;
    display: flex;
    overflow: hidden;

    ${({activeLayout, isCompactMode}) => {
    if (activeLayout === 'portrait' || isCompactMode) {
        return css`
                flex-direction: column;
            `;
    } else {
        return css`
                flex-direction: row;
            `;
    }
}}
`;

// Chess board area
const ChessBoardArea = styled.div<{
    activeLayout: 'portrait' | 'landscape';
    isCompactMode: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.colors.background};

    ${({activeLayout, isCompactMode}) => {
    if (activeLayout === 'portrait' || isCompactMode) {
        return css`
                flex: 1;
                width: 100%;
                max-height: 60vh;
            `;
    } else {
        return css`
                flex: 1;
                height: 100%;
                min-width: 400px;
            `;
    }
}}
`;

// Sidebar/panel area
const PanelArea = styled.aside<{
    activeLayout: 'portrait' | 'landscape';
    isCompactMode: boolean;
    showSidebar: boolean;
}>`
    background: ${({theme}) => theme.colors.backgroundSecondary};
    border: 1px solid ${({theme}) => theme.colors.border};
    transition: ${({theme}) => `all ${theme.transitions.normal}`};
    overflow: hidden;

    ${({activeLayout, isCompactMode, showSidebar}) => {
    if (!showSidebar) {
        return css`
                width: 0;
                height: 0;
                opacity: 0;
                border: none;
            `;
    }

    if (activeLayout === 'portrait' || isCompactMode) {
        return css`
                width: 100%;
                height: 40vh;
                border-top: 1px solid ${({theme}) => theme.colors.border};
                border-left: none;
                border-right: none;
                border-bottom: none;
            `;
    } else {
        return css`
                width: 350px;
                height: 100%;
                border-left: 1px solid ${({theme}) => theme.colors.border};
                border-top: none;
                border-right: none;
                border-bottom: none;
            `;
    }
}}
`;

// Responsive grid for layout primitives
export const ResponsiveGrid = styled.div<{
    columns?: number;
    gap?: string;
    minColumnWidth?: string;
}>`
    display: grid;
    grid-template-columns: repeat(
    auto-fit,
    minmax(${({minColumnWidth}) => minColumnWidth || '250px'}, 1fr)
  );
    grid-gap: ${({gap, theme}) => gap || theme.spacing.md};
    width: 100%;

    @media (max-width: ${({theme}) => theme.breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }
`;

// Flexible container for content sections
export const FlexContainer = styled.div<{
    direction?: 'row' | 'column';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    align?: 'start' | 'center' | 'end' | 'stretch';
    gap?: string;
    wrap?: boolean;
}>`
    display: flex;
    flex-direction: ${({direction}) => direction || 'row'};
    justify-content: ${({justify}) => justify || 'start'};
    align-items: ${({align}) => align || 'stretch'};
    gap: ${({gap, theme}) => gap || theme.spacing.md};
    flex-wrap: ${({wrap}) => wrap ? 'wrap' : 'nowrap'};

    @media (max-width: ${({theme}) => theme.breakpoints.tablet}) {
        flex-direction: column;
    }
`;

// Responsive container component
interface ResponsiveContainerProps {
    children: ReactNode;
    chessBoardSlot?: ReactNode;
    panelSlot?: ReactNode;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
                                                                            children,
                                                                            chessBoardSlot,
                                                                            panelSlot,
                                                                        }) => {
    const {
        activeLayout,
        isCompactMode,
        showSidebar,
        isTransitioning
    } = useLayoutContext();

    return (
        <AppContainer isTransitioning={isTransitioning}>
            <MainContent
                activeLayout={activeLayout}
                isCompactMode={isCompactMode}
            >
                <ChessBoardArea
                    activeLayout={activeLayout}
                    isCompactMode={isCompactMode}
                >
                    {chessBoardSlot || children}
                </ChessBoardArea>

                <PanelArea
                    activeLayout={activeLayout}
                    isCompactMode={isCompactMode}
                    showSidebar={showSidebar}
                >
                    {panelSlot}
                </PanelArea>
            </MainContent>
        </AppContainer>
    );
};

// Breakpoint-aware component wrapper
export const BreakpointContainer = styled.div<{
    showOn?: ('mobile' | 'tablet' | 'desktop')[];
    hideOn?: ('mobile' | 'tablet' | 'desktop')[];
}>`
    ${({showOn, hideOn, theme}) => {
    let styles = '';

    if (hideOn?.includes('mobile')) {
        styles += `
        @media (max-width: ${theme.breakpoints.tablet}) {
          display: none;
        }
      `;
    }

    if (hideOn?.includes('tablet')) {
        styles += `
        @media (min-width: ${theme.breakpoints.tablet}) and (max-width: ${theme.breakpoints.desktop}) {
          display: none;
        }
      `;
    }

    if (hideOn?.includes('desktop')) {
        styles += `
        @media (min-width: ${theme.breakpoints.desktop}) {
          display: none;
        }
      `;
    }

    if (showOn?.length) {
        styles += 'display: none;';

        if (showOn.includes('mobile')) {
            styles += `
          @media (max-width: ${theme.breakpoints.tablet}) {
            display: block;
          }
        `;
        }

        if (showOn.includes('tablet')) {
            styles += `
          @media (min-width: ${theme.breakpoints.tablet}) and (max-width: ${theme.breakpoints.desktop}) {
            display: block;
          }
        `;
        }

        if (showOn.includes('desktop')) {
            styles += `
          @media (min-width: ${theme.breakpoints.desktop}) {
            display: block;
          }
        `;
        }
    }

    return css`${styles}`;
}}
`;