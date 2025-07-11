import React from 'react';
import styled from 'styled-components';

interface LinkifiedTextProps {
  text: string;
  className?: string;
}

const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
  
  &:visited {
    color: ${props => props.theme.colors.primary}aa;
  }
`;

// Comprehensive URL regex that matches various URL formats
const URL_REGEX = /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;

export const LinkifiedText: React.FC<LinkifiedTextProps> = ({ text, className }) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  // Reset regex state
  URL_REGEX.lastIndex = 0;
  
  while ((match = URL_REGEX.exec(text)) !== null) {
    const url = match[0];
    const index = match.index;
    
    // Add text before the URL
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }
    
    // Prepare the href - add protocol if missing
    let href = url;
    if (!url.match(/^(?:https?|ftp):\/\//)) {
      // Check if it looks like a domain (has dots)
      if (url.includes('.')) {
        href = 'https://' + url;
      }
    }
    
    // Add the link
    parts.push(
      <Link
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        {url}
      </Link>
    );
    
    lastIndex = index + url.length;
  }
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  // If no links were found, return the original text
  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }
  
  return <span className={className}>{parts}</span>;
};

LinkifiedText.displayName = 'LinkifiedText';