import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { SimpleFicsRenderer } from './SimpleFicsRenderer';
import styled from 'styled-components';
import { useRootStore } from '@fics/shared';

const MessageContainer = styled.div`
  margin: 0;
`;

const LoadMoreLink = styled.a`
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadMoreRenderer: React.FC<{ message: any }> = ({ message }) => {
  const { chatStore } = useRootStore();
  
  const handleClick = () => {
    console.log('Load more clicked, metadata:', message.metadata);
    const channelNumber = parseInt(message.metadata?.channelNumber || '0');
    console.log('Channel number:', channelNumber);
    if (channelNumber > 0) {
      console.log('Loading more messages for channel:', channelNumber);
      chatStore.loadMoreHistoricalMessages(channelNumber);
    } else {
      console.error('Invalid channel number:', channelNumber);
    }
  };
  
  return (
    <LoadMoreLink onClick={handleClick}>
      {message.content}
    </LoadMoreLink>
  );
};

export class SimpleDefaultRenderer extends MessageRenderer {
  readonly type = 'default';
  
  canRender(): boolean {
    // Default renderer can handle any message as fallback
    return true;
  }
  
  render({ message }: MessageRendererProps): React.ReactNode {
    // Check if this is a "load more" message
    if (message.metadata?.isLoadMore) {
      return (
        <MessageContainer>
          <LoadMoreRenderer message={message} />
        </MessageContainer>
      );
    }
    
    // Just render the raw FICS content with our simple renderer
    // Pass elements from parsed message if available
    const elements = message.metadata?.parsedMessage?.elements;
    return (
      <MessageContainer>
        <SimpleFicsRenderer content={message.content} elements={elements} />
      </MessageContainer>
    );
  }
}