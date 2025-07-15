import React from 'react';
import { observer } from 'mobx-react-lite';
import { ChatMessage, useRootStore } from '@fics/shared';
import { MessageRendererRegistry } from './renderers';

interface MessageProps {
  message: ChatMessage;
  currentUsername: string;
  onCommandClick: (command: string) => void;
  onHover?: (timestamp: Date | string | number | null) => void;
}

export const Message: React.FC<MessageProps> = observer(({ 
  message, 
  currentUsername, 
  onCommandClick,
  onHover 
}) => {
  const { preferencesStore } = useRootStore();
  
  // Get styling for this message
  const consoleType = message.metadata?.consoleType;
  const channelNumber = message.metadata?.channelNumber;
  
  const color = consoleType 
    ? preferencesStore.getConsoleColor(consoleType, channelNumber) 
    : null;
    
  const fontFamily = consoleType
    ? preferencesStore.getConsoleFont(consoleType, channelNumber)
    : null;
    
  const fontStyle = consoleType
    ? preferencesStore.getConsoleFontStyle(consoleType, channelNumber)
    : null;
  
  
  // Add styling to metadata for renderer to use
  const messageWithStyling = {
    ...message,
    metadata: {
      ...message.metadata,
      color,
      fontFamily,
      fontStyle
    }
  };
  
  // Get the appropriate renderer
  const renderer = MessageRendererRegistry.getRenderer(messageWithStyling);
  
  if (!renderer) {
    // Fallback if no renderer found
    console.warn('No renderer found for message:', message);
    return <div>{message.content}</div>;
  }
  
  return (
    <div
      onMouseEnter={() => onHover?.(message.timestamp)}
      onMouseLeave={() => onHover?.(null)}
    >
      {renderer.render({
        message: messageWithStyling,
        currentUsername,
        onCommandClick,
        onHover
      })}
    </div>
  );
});

Message.displayName = 'Message';