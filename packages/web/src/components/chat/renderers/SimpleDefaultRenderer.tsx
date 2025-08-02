import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { SimpleFicsRenderer } from './SimpleFicsRenderer';
import styled from 'styled-components';

const MessageContainer = styled.div`
  margin: 0;
`;

export class SimpleDefaultRenderer extends MessageRenderer {
  readonly type = 'default';
  
  canRender(): boolean {
    // Default renderer can handle any message as fallback
    return true;
  }
  
  render({ message }: MessageRendererProps): React.ReactNode {
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