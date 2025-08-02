import React from 'react';
import { ChatMessage } from '@fics/shared';

export interface MessageRendererProps {
  message: ChatMessage;
  currentUsername: string;
  onCommandClick: (command: string) => void;
  onHover?: (timestamp: Date | string | number | null) => void;
}

export abstract class MessageRenderer<T = any> {
  abstract readonly type: string;
  
  abstract render(props: MessageRendererProps & { message: ChatMessage & { metadata?: T } }): React.ReactNode;
  
  canRender(message: ChatMessage): boolean {
    return message.metadata?.consoleType === this.type || message.type === this.type;
  }
}

// Registry for all message renderers
export class MessageRendererRegistry {
  private renderers = new Map<string, MessageRenderer>();
  
  register(renderer: MessageRenderer) {
    this.renderers.set(renderer.type, renderer);
  }
  
  clear() {
    this.renderers.clear();
  }
  
  getRenderer(message: ChatMessage): MessageRenderer | null {
    // First try to match by consoleType
    if (message.metadata?.consoleType) {
      const renderer = this.renderers.get(message.metadata.consoleType);
      if (renderer) return renderer;
    }
    
    // Then try to match by message type
    const renderer = this.renderers.get(message.type);
    if (renderer) return renderer;
    
    // Check all renderers to see if any can handle this message
    for (const [, renderer] of this.renderers) {
      if (renderer.canRender(message)) {
        return renderer;
      }
    }
    
    return null;
  }
  
  getAllRenderers(): MessageRenderer[] {
    return Array.from(this.renderers.values());
  }
  
  // Keep static methods for backward compatibility, delegating to a singleton
  private static instance = new MessageRendererRegistry();
  
  static register(renderer: MessageRenderer) {
    this.instance.register(renderer);
  }
  
  static getRenderer(message: ChatMessage): MessageRenderer | null {
    return this.instance.getRenderer(message);
  }
  
  static getAllRenderers(): MessageRenderer[] {
    return this.instance.getAllRenderers();
  }
  
  static clear() {
    this.instance.clear();
  }
}