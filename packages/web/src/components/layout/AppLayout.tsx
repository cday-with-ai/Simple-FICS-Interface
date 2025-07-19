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

const MainContent = styled.main`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const ChessArea = styled.div<{ $isVisible: boolean }>`
  flex: 1;
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  overflow: hidden;
`;

const ChatPanelContainer = styled.div<{ $isVisible: boolean; $fullWidth?: boolean }>`
  width: ${props => props.$fullWidth ? '100%' : props.$isVisible ? '600px' : '0'};
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  flex-direction: column;
  background-color: ${props => props.theme.colors.surface};
  border-left: ${props => props.$fullWidth ? 'none' : '1px solid ' + props.theme.colors.border};
  overflow: hidden;
  flex: ${props => props.$fullWidth ? '1' : 'initial'};
  
  @media (max-width: 768px) {
    width: ${props => props.$isVisible ? '100%' : '0'};
  }
`;

const Splitter = styled.div<{ $isVisible: boolean }>`
  width: ${props => props.$isVisible ? '4px' : '0'};
  display: ${props => props.$isVisible ? 'block' : 'none'};
  background-color: ${props => props.theme.colors.border};
  cursor: col-resize;
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2px;
    right: -2px;
  }
`;

export const AppLayout: React.FC = observer(() => {
  const { preferencesStore } = useRootStore();
  const { viewMode, autoViewMode } = preferencesStore.preferences;
  const layout = useLayout();
  const [chatPanelWidth, setChatPanelWidth] = useState(600); // Start fully expanded
  const [isResizing, setIsResizing] = useState(false);
  
  // Auto-select view mode based on viewport - only once at startup
  useEffect(() => {
    if (autoViewMode) {
      // Set initial view mode based on device type
      if (layout.isMobile || layout.isTablet) {
        preferencesStore.updatePreference('viewMode', 'chess-only');
      } else {
        preferencesStore.updatePreference('viewMode', 'chess-and-chat');
      }
      // Disable auto view mode after initial setup
      preferencesStore.updatePreference('autoViewMode', false);
    }
  }, []); // Empty dependency array - only run once on mount
  
  // Handle splitter resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };
  
  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      setChatPanelWidth(Math.max(300, Math.min(600, newWidth)));
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
  }, [isResizing]);
  
  // Determine what to show based on view mode
  const showChess = viewMode === 'chess-only' || viewMode === 'chess-and-chat';
  const showChat = viewMode === 'chat-only' || viewMode === 'chess-and-chat';
  const showSplitter = viewMode === 'chess-and-chat' && !layout.isMobile;
  
  return (
    <LayoutContainer>
      <AppHeader />
      
      <MainContent>
        <ChessArea $isVisible={showChess}>
          <ChessGameLayout hasChat={showChat} />
        </ChessArea>
        
        {showSplitter && (
          <Splitter 
            $isVisible={true}
            onMouseDown={handleMouseDown}
            style={{ cursor: isResizing ? 'col-resize' : 'ew-resize' }}
          />
        )}
        
        <ChatPanelContainer 
          $isVisible={showChat}
          $fullWidth={viewMode === 'chat-only'}
          style={{ width: viewMode === 'chat-only' ? undefined : (showChat && !layout.isMobile ? `${chatPanelWidth}px` : undefined) }}
        >
          <ChatPanelComponent />
        </ChatPanelContainer>
      </MainContent>
    </LayoutContainer>
  );
});

AppLayout.displayName = 'AppLayout';