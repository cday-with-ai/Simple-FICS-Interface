import React, { useState } from 'react';
import styled from 'styled-components';
import { ChannelHistory } from './ChannelHistory';
import { UserHistory } from './UserHistory';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.colors.background};
`;

const TabBar = styled.div`
  display: flex;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.backgroundTertiary};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

type TabType = 'channels' | 'users';

export const BackendDataPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('channels');

  return (
    <Container>
      <TabBar>
        <Tab 
          $active={activeTab === 'channels'} 
          onClick={() => setActiveTab('channels')}
        >
          Channel History
        </Tab>
        <Tab 
          $active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          User History
        </Tab>
      </TabBar>
      <Content>
        {activeTab === 'channels' && <ChannelHistory />}
        {activeTab === 'users' && <UserHistory />}
      </Content>
    </Container>
  );
};