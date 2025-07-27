import styled from 'styled-components';

export const MessageRow = styled.div<{ $color?: string; $fontFamily?: string; $fontStyle?: string }>`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.spacing[1]};
  font-size: 11px;
  font-family: ${props => props.$fontFamily || "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${props => props.$fontStyle || 'normal'};
  line-height: 1.3;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  flex: 1;
  color: ${props => props.$color || props.theme.colors.text};
`;

export const SystemMessageRow = styled(MessageRow)`
  color: ${props => props.$color || props.theme.colors.textSecondary};
`;

export const PreformattedMessageRow = styled.div<{ $color?: string; $fontFamily?: string; $fontStyle?: string }>`
  font-size: 11px;
  font-family: ${props => props.$fontFamily || "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"};
  font-style: ${props => props.$fontStyle || 'normal'};
  line-height: 1.3;
  white-space: pre;
  color: ${props => props.$color || props.theme.colors.textSecondary};
`;

export const Sender = styled.span<{ $isYou?: boolean }>`
  color: ${props => props.$isYou 
    ? props.theme.colors.primary 
    : props.theme.colors.text
  };
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  min-width: 80px;
  display: inline-block;
  
  &::after {
    content: ':';
  }
`;

export const MessageSpacer = styled.span`
  min-width: 80px;
  display: inline-block;
  flex-shrink: 0;
`;

export const Content = styled.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
  
  &:visited {
    color: inherit;
  }
`;

export const CommandLink = styled.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

export const PlayerLink = styled(CommandLink)`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const ChannelLink = styled(CommandLink)`
  &::before {
    content: '(';
  }
  &::after {
    content: ')';
  }
`;

export const GameNumberLink = styled(CommandLink)`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

export const SeekLink = styled(CommandLink)`
  display: inline-block;
  padding: 0 2px;
  border-radius: 2px;
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
  }
`;