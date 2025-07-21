import React, { useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  onHistoryNavigate?: (direction: 'up' | 'down') => void;
  placeholder?: string;
  disabled?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]};
  padding-top: ${props => props.theme.spacing[1]};
  background-color: ${props => props.theme.colors.surface};
  margin: ${props => props.theme.spacing[2]};
  margin-top: 0;
  border-radius: ${props => props.theme.borderRadius.container};
  box-shadow: ${props => props.theme.shadows.container};
  position: relative;
  z-index: 10;
  
  /* Ensure input is visible on mobile */
  @media (max-width: 768px) {
    padding-bottom: calc(${props => props.theme.spacing[2]} + env(safe-area-inset-bottom, 0px));
    margin-bottom: ${props => props.theme.spacing[1]};
    margin-left: ${props => props.theme.spacing[1]};
    margin-right: ${props => props.theme.spacing[1]};
    min-height: 60px;
    background-color: ${props => props.theme.colors.background};
    border: 2px solid ${props => props.theme.colors.primary};
  }
`;

const InputField = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing[2]};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.container};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-family: ${props => props.theme.typography.fontFamilyMono};
  box-shadow: ${props => props.theme.shadows.container};
  outline: none;
  transition: all ${props => props.theme.transitions.fast};
  
  /* iOS fixes to prevent zoom and ensure visibility */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-user-select: text;
  user-select: text;
  
  /* Ensure minimum 16px font size on mobile to prevent iOS zoom */
  @media (max-width: 768px) {
    font-size: 16px;
    min-height: 44px;
    padding: ${props => props.theme.spacing[3]};
    border-width: 2px;
    background-color: #ffffff;
    color: #000000;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.container}, 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
  
  @media (max-width: 768px) {
    &:focus {
      border-color: ${props => props.theme.colors.primary};
      background-color: #ffffff;
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}40;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textTertiary};
  }
  
  @media (max-width: 768px) {
    &::placeholder {
      color: #666666;
    }
  }
`;

const SendButton = styled.button`
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  outline: none;
  
  /* iOS fixes */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  /* Match input font size on mobile */
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryHover};
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}40;
  }
`;

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onHistoryNavigate,
  placeholder = 'Type a message...',
  disabled = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend(value.trim());
      }
    } else if (e.key === 'ArrowUp' && !value) {
      e.preventDefault();
      onHistoryNavigate?.('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryNavigate?.('down');
    }
  };

  const handleSendClick = () => {
    if (value.trim()) {
      onSend(value.trim());
    }
  };

  return (
    <InputContainer>
      <InputField
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        spellCheck="true"
      />
      <SendButton
        onClick={handleSendClick}
        disabled={disabled || !value.trim()}
        title="Send message (Enter)"
      >
        Send
      </SendButton>
    </InputContainer>
  );
};

ChatInput.displayName = 'ChatInput';