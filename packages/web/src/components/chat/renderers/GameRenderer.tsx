import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { SystemMessageRow } from './MessageStyles';
import { InteractiveContent } from './InteractiveContent';

export class GameStartRenderer extends MessageRenderer {
  readonly type = 'gameStart';
  
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    
    return (
      <SystemMessageRow $color={message.metadata?.color}>
        <InteractiveContent
          content={message.content}
          elements={parsedMessage?.elements}
          onCommandClick={onCommandClick}
        />
      </SystemMessageRow>
    );
  }
}

export class GameEndRenderer extends MessageRenderer {
  readonly type = 'gameEnd';
  
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    
    return (
      <SystemMessageRow $color={message.metadata?.color}>
        <InteractiveContent
          content={message.content}
          elements={parsedMessage?.elements}
          onCommandClick={onCommandClick}
        />
      </SystemMessageRow>
    );
  }
}

export class Style12Renderer extends MessageRenderer {
  readonly type = 'style12';
  
  render({ message }: MessageRendererProps): React.ReactNode {
    // Style12 messages are board updates - usually we don't want to show them
    // But if they do appear in console, show them dimmed
    return (
      <SystemMessageRow $color={message.metadata?.color || '#666'}>
        {message.content}
      </SystemMessageRow>
    );
  }
}

export class MovesListRenderer extends MessageRenderer {
  readonly type = 'movesList';
  
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    
    return (
      <SystemMessageRow $color={message.metadata?.color}>
        <InteractiveContent
          content={message.content}
          elements={parsedMessage?.elements}
          onCommandClick={onCommandClick}
        />
      </SystemMessageRow>
    );
  }
}