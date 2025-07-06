/**
 * Smart scrolling utilities for chat components
 * Based on the implementation from scripts/chat.js and scripts/fics.js
 */

/**
 * Checks if a scrollable element is at or near the bottom
 * @param element - The scrollable element
 * @param threshold - Distance from bottom to consider "at bottom" (default: 10px)
 * @returns true if the element is near the bottom
 */
export function isScrolledToBottom(element: HTMLElement, threshold: number = 10): boolean {
  return element.scrollHeight - element.scrollTop <= element.clientHeight + threshold;
}

/**
 * Scrolls an element to the bottom
 * @param element - The element to scroll
 */
export function scrollToBottom(element: HTMLElement): void {
  element.scrollTop = element.scrollHeight;
}

/**
 * Smart scroll: only scrolls to bottom if already near bottom
 * @param element - The scrollable element
 * @param threshold - Distance from bottom to consider "at bottom" (default: 10px)
 */
export function smartScrollToBottom(element: HTMLElement, threshold: number = 10): void {
  const isNearBottom = isScrolledToBottom(element, threshold);
  
  if (isNearBottom) {
    scrollToBottom(element);
  }
}

/**
 * Scrolls all chat text areas to bottom using requestAnimationFrame for smooth scrolling
 */
export function scrollAllChatAreasToBottom(): void {
  requestAnimationFrame(() => {
    // Find all chat message containers
    const chatContainers = document.querySelectorAll(
      '.chat-messages-container, .tab-text-area, .unified-tab-content .tab-text-area'
    );
    
    chatContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        scrollToBottom(container);
      }
    });
  });
}