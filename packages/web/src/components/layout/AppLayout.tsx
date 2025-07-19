import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { AppHeader } from './AppHeader';
import { ChessGameLayout } from '../chess/ChessGameLayout';
import { ChatPanel as ChatPanelComponent } from '../chat';
import { useLayout } from '../../theme/hooks';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${props => props.theme.colors.surface};
`;

const MainContent = styled.main<{ $isPortrait?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: ${props => props.$isPortrait ? 'column' : 'row'};
  overflow: hidden;
  position: relative;
`;

const ChessArea = styled.div<{ $isVisible: boolean; $isPortrait?: boolean; $height?: string }>`
  flex: ${props => props.$isPortrait && props.$height ? 'none' : '1'};
  height: ${props => props.$isPortrait && props.$height ? props.$height : 'auto'};
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  overflow: hidden;
  min-height: ${props => props.$isPortrait ? '300px' : 'auto'};
`;

const ChatPanelContainer = styled.div<{ $isVisible: boolean; $fullWidth?: boolean; $isPortrait?: boolean }>`
  width: ${props => props.$isPortrait ? '100%' : (props.$fullWidth ? '100%' : props.$isVisible ? '600px' : '0')};
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  flex-direction: column;
  background-color: ${props => props.theme.colors.surface};
  border-left: ${props => props.$isPortrait ? 'none' : (props.$fullWidth ? 'none' : '1px solid ' + props.theme.colors.border)};
  border-top: ${props => props.$isPortrait ? '1px solid ' + props.theme.colors.border : 'none'};
  overflow: hidden;
  flex: ${props => props.$fullWidth || props.$isPortrait ? '1' : 'initial'};
  min-height: ${props => props.$isPortrait ? '200px' : 'auto'};
  
  @media (max-width: 768px) {
    width: ${props => props.$isVisible ? '100%' : '0'};
  }
`;

const Splitter = styled.div<{ $isVisible: boolean; $isPortrait?: boolean }>`
  width: ${props => props.$isPortrait ? '100%' : (props.$isVisible ? '4px' : '0')};
  height: ${props => props.$isPortrait ? '4px' : '100%'};
  display: ${props => props.$isVisible ? 'block' : 'none'};
  background-color: ${props => props.theme.colors.border};
  cursor: ${props => props.$isPortrait ? 'row-resize' : 'col-resize'};
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    ${props => props.$isPortrait ? `
      left: 0;
      right: 0;
      top: -2px;
      bottom: -2px;
    ` : `
      top: 0;
      bottom: 0;
      left: -2px;
      right: -2px;
    `}
  }
`;

export const AppLayout: React.FC = observer(() => {
  const { preferencesStore } = useRootStore();
  const { viewMode, autoViewMode, chessOrientation } = preferencesStore.preferences;
  const layout = useLayout();
  const [chatPanelWidth, setChatPanelWidth] = useState(600); // Start fully expanded
  const [chessAreaHeight, setChessAreaHeight] = useState<number | null>(null); // Portrait mode height
  const [isResizing, setIsResizing] = useState(false);
  
  const isPortraitMode = chessOrientation === 'portrait';
  
  // Auto-select view mode based on viewport
  useEffect(() => {
    if (autoViewMode) {
      if (layout.isMobile) {
        preferencesStore.updatePreference('viewMode', 'chess-only');
      } else if (layout.isTablet) {
        preferencesStore.updatePreference('viewMode', 'chess-only');
      } else {
        preferencesStore.updatePreference('viewMode', 'chess-and-chat');
      }
    }
  }, [layout.isMobile, layout.isTablet, autoViewMode, preferencesStore]);
  
  // Handle splitter resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };
  
  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isPortraitMode) {
        // In portrait mode, adjust vertical split
        const newHeight = e.clientY - 50; // 50px for header
        const maxHeight = window.innerHeight - 250; // Leave space for chat
        const minHeight = 300;
        setChessAreaHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
      } else {
        // In landscape mode, adjust horizontal split
        const newWidth = window.innerWidth - e.clientX;
        setChatPanelWidth(Math.max(300, Math.min(600, newWidth)));
      }
      // Trigger a resize event so the chess board recalculates its size
      window.dispatchEvent(new Event('resize'));
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isPortraitMode]);
  
  // Determine what to show based on view mode
  const showChess = viewMode === 'chess-only' || viewMode === 'chess-and-chat';
  const showChat = viewMode === 'chat-only' || viewMode === 'chess-and-chat';
  const showSplitter = viewMode === 'chess-and-chat' && !layout.isMobile;
  
  return (
    <LayoutContainer>
      <AppHeader />
      
      <MainContent $isPortrait={isPortraitMode}>
        <ChessArea 
          $isVisible={showChess}
          $isPortrait={isPortraitMode}
          $height={isPortraitMode && chessAreaHeight ? `${chessAreaHeight}px` : undefined}
        >
          <ChessGameLayout hasChat={showChat} />
        </ChessArea>
        
        {showSplitter && (
          <Splitter 
            $isVisible={true}
            $isPortrait={isPortraitMode}
            onMouseDown={handleMouseDown}
            style={{ cursor: isResizing ? (isPortraitMode ? 'row-resize' : 'col-resize') : (isPortraitMode ? 'ns-resize' : 'ew-resize') }}
          />
        )}
        
        <ChatPanelContainer 
          $isVisible={showChat}
          $fullWidth={viewMode === 'chat-only'}
          $isPortrait={isPortraitMode}
          style={{ 
            width: viewMode === 'chat-only' || isPortraitMode ? undefined : (showChat && !layout.isMobile ? `${chatPanelWidth}px` : undefined),
            height: isPortraitMode && chessAreaHeight ? `calc(100% - ${chessAreaHeight}px - 4px)` : undefined
          }}
        >
          <ChatPanelComponent />
        </ChatPanelContainer>
      </MainContent>
    </LayoutContainer>
  );
});

AppLayout.displayName = 'AppLayout';