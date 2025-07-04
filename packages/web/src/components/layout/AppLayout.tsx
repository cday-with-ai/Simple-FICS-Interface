import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { AppHeader } from './AppHeader';
import { ChessGameLayout } from '../chess/ChessGameLayout';
import { useViewport } from '../../theme/hooks';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
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

const ChatPanel = styled.div<{ $isVisible: boolean }>`
  width: ${props => props.$isVisible ? '384px' : '0'};
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  flex-direction: column;
  background-color: ${props => props.theme.colors.surface};
  border-left: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  
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

const ChatPlaceholder = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

export const AppLayout: React.FC = observer(() => {
  const { preferencesStore } = useRootStore();
  const { viewMode, autoViewMode } = preferencesStore.preferences;
  const viewport = useViewport();
  const [chatPanelWidth, setChatPanelWidth] = useState(384);
  const [isResizing, setIsResizing] = useState(false);
  
  // Auto-select view mode based on viewport
  useEffect(() => {
    if (autoViewMode) {
      if (viewport.isMobile) {
        preferencesStore.updatePreference('viewMode', 'chess-only');
      } else if (viewport.isTablet) {
        preferencesStore.updatePreference('viewMode', 'chess-only');
      } else {
        preferencesStore.updatePreference('viewMode', 'chess-and-chat');
      }
    }
  }, [viewport.isMobile, viewport.isTablet, autoViewMode, preferencesStore]);
  
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
  const showSplitter = viewMode === 'chess-and-chat' && !viewport.isMobile;
  
  return (
    <LayoutContainer>
      <AppHeader />
      
      <MainContent>
        <ChessArea $isVisible={showChess}>
          <ChessGameLayout />
        </ChessArea>
        
        {showSplitter && (
          <Splitter 
            $isVisible={true}
            onMouseDown={handleMouseDown}
            style={{ cursor: isResizing ? 'col-resize' : 'ew-resize' }}
          />
        )}
        
        <ChatPanel 
          $isVisible={showChat}
          style={{ width: showChat && !viewport.isMobile ? `${chatPanelWidth}px` : undefined }}
        >
          <ChatPlaceholder>
            Chat System Coming Soon
          </ChatPlaceholder>
        </ChatPanel>
      </MainContent>
    </LayoutContainer>
  );
});

AppLayout.displayName = 'AppLayout';