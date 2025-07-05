import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';

const TabsContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  overflow-x: auto;
  min-height: 32px;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.border} transparent;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.border};
    border-radius: 2px;
  }
`;

const Tab = styled.button<{ $active: boolean; $hasUnread: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border: none;
  background-color: ${props => props.$active 
    ? props.theme.colors.surface 
    : 'transparent'
  };
  color: ${props => props.$active 
    ? props.theme.colors.text 
    : props.theme.colors.textSecondary
  };
  cursor: pointer;
  white-space: nowrap;
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  min-width: 60px;
  
  &:hover {
    background-color: ${props => props.$active 
      ? props.theme.colors.surface
      : props.theme.colors.backgroundSecondary
    };
    color: ${props => props.theme.colors.text};
  }
  
  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${props.theme.colors.primary};
    }
  `}
`;

const TabName = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const UnreadBadge = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  padding: 0 4px;
  border-radius: 8px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin-left: ${props => props.theme.spacing[1]};
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.textTertiary};
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 12px;
  line-height: 1;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }
`;

const TabIcon = styled.span<{ $type: 'channel' | 'private' | 'console' }>`
  font-size: 12px;
  opacity: 0.7;
  
  ${props => props.$type === 'channel' && `
    &::before {
      content: '#';
    }
  `}
  
  ${props => props.$type === 'private' && `
    &::before {
      content: '@';
    }
  `}
  
  ${props => props.$type === 'console' && `
    &::before {
      content: '>';
    }
  `}
`;

export const ChatTabs: React.FC = observer(() => {
  const { chatStore } = useRootStore();
  const tabs = chatStore.sortedTabs;

  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          $active={tab.id === chatStore.activeTabId}
          $hasUnread={tab.unreadCount > 0}
          onClick={() => chatStore.setActiveTab(tab.id)}
        >
          <TabIcon $type={tab.type} />
          <TabName>{tab.name}</TabName>
          {tab.unreadCount > 0 && (
            <UnreadBadge>
              {tab.unreadCount > 99 ? '99+' : tab.unreadCount}
            </UnreadBadge>
          )}
          {tab.id !== 'console' && (
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                chatStore.closeTab(tab.id);
              }}
              title="Close tab"
            >
              ×
            </CloseButton>
          )}
        </Tab>
      ))}
    </TabsContainer>
  );
});

ChatTabs.displayName = 'ChatTabs';