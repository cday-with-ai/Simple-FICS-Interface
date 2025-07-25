import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { PreformattedMessageRow, CommandLink } from './MessageStyles';

export class GameNotificationRenderer extends MessageRenderer {
  readonly type = 'gameNotification';
  
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    const gameNumber = parsedMessage?.metadata?.gameNumber;
    
    const handleClick = () => {
      const command = `observe ${gameNumber}`;
      if (onCommandClick) {
        onCommandClick(command);
      }
    };
    
    return (
      <PreformattedMessageRow 
        $color={message.metadata?.color || undefined}
        $fontFamily={message.metadata?.fontFamily || undefined}
        $fontStyle={message.metadata?.fontStyle || undefined}
      >
        <CommandLink
          onClick={handleClick}
          style={{ 
            display: 'inline-block',
            textDecoration: 'none',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {message.content}
        </CommandLink>
      </PreformattedMessageRow>
    );
  }
}