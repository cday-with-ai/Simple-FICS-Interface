import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { MessageRow, SystemMessageRow, Sender, Content, MessageSpacer } from './MessageStyles';
import { InteractiveContent } from './InteractiveContent';
import { PlayerName } from '../../ui/PlayerName';

export class DefaultRenderer extends MessageRenderer {
  readonly type = 'default';
  
  canRender(): boolean {
    // Default renderer can handle any message as fallback
    return true;
  }
  
  render({ message, currentUsername, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    const isGroupedMessage = message.metadata?.isGroupedMessage;
    
    // System messages
    if (message.type === 'system') {
      return (
        <SystemMessageRow $color={message.metadata?.color || undefined}>
          <InteractiveContent
            content={parsedMessage?.content || message.content}
            elements={parsedMessage?.elements}
            onCommandClick={onCommandClick}
          />
        </SystemMessageRow>
      );
    }
    
    // Regular chat messages (whisper, message, etc)
    const isYou = message.sender && message.sender.toLowerCase() === currentUsername.toLowerCase();
    
    // For grouped messages, only show content
    if (isGroupedMessage || !message.sender) {
      return (
        <MessageRow $color={message.metadata?.color || undefined}>
          <MessageSpacer />
          <Content>
            <InteractiveContent
              content={parsedMessage?.content || message.content}
              elements={parsedMessage?.elements}
              onCommandClick={onCommandClick}
            />
          </Content>
        </MessageRow>
      );
    }
    
    return (
      <MessageRow $color={message.metadata?.color || undefined}>
        <Sender $isYou={isYou || undefined}>
          {isYou ? message.sender : <PlayerName name={message.sender} />}
        </Sender>
        <Content>
          <InteractiveContent
            content={parsedMessage?.content || message.content}
            elements={parsedMessage?.elements}
            onCommandClick={onCommandClick}
          />
        </Content>
      </MessageRow>
    );
  }
}