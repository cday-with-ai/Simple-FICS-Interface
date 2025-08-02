import { MessageRendererRegistry } from './MessageRenderer';
import { SimpleDefaultRenderer } from './SimpleDefaultRenderer';
import {
  SimpleShoutRenderer,
  SimpleCShoutRenderer,
  SimpleNotificationRenderer,
  SimpleSeekAnnouncementRenderer,
  SimpleMatchRequestRenderer,
  SimpleIllegalMoveRenderer,
  SimpleDrawOfferRenderer,
  SimpleUnobserveRenderer,
  SimpleGameNotificationRenderer,
  SimpleWhoOutputRenderer,
  SimpleGamesOutputRenderer,
  SimpleFingerOutputRenderer,
  SimpleHistoryOutputRenderer,
  SimpleJournalOutputRenderer,
  SimpleSoughtOutputRenderer,
  SimpleChannelListOutputRenderer,
  SimpleNewsOutputRenderer,
  SimpleInOutputRenderer,
  SimpleLoginRenderer,
  SimplePasswordRenderer,
  SimpleGuestLoginConfirmationRenderer,
  SimpleSessionStartRenderer,
  SimpleSystemRenderer,
  SimpleRawRenderer,
  SimpleGameEndRenderer,
  SimpleGameStartRenderer
} from './SimpleConsoleRenderer';

// Register all simple renderers
function registerRenderers() {
  // Clear existing renderers
  MessageRendererRegistry.clear();
  
  // Register all simple renderers
  MessageRendererRegistry.register(new SimpleShoutRenderer());
  MessageRendererRegistry.register(new SimpleCShoutRenderer());
  MessageRendererRegistry.register(new SimpleNotificationRenderer());
  MessageRendererRegistry.register(new SimpleSeekAnnouncementRenderer());
  MessageRendererRegistry.register(new SimpleMatchRequestRenderer());
  MessageRendererRegistry.register(new SimpleIllegalMoveRenderer());
  MessageRendererRegistry.register(new SimpleDrawOfferRenderer());
  MessageRendererRegistry.register(new SimpleUnobserveRenderer());
  MessageRendererRegistry.register(new SimpleGameNotificationRenderer());
  
  // Command outputs
  MessageRendererRegistry.register(new SimpleWhoOutputRenderer());
  MessageRendererRegistry.register(new SimpleGamesOutputRenderer());
  MessageRendererRegistry.register(new SimpleFingerOutputRenderer());
  MessageRendererRegistry.register(new SimpleHistoryOutputRenderer());
  MessageRendererRegistry.register(new SimpleJournalOutputRenderer());
  MessageRendererRegistry.register(new SimpleSoughtOutputRenderer());
  MessageRendererRegistry.register(new SimpleChannelListOutputRenderer());
  MessageRendererRegistry.register(new SimpleNewsOutputRenderer());
  MessageRendererRegistry.register(new SimpleInOutputRenderer());
  
  // System messages
  MessageRendererRegistry.register(new SimpleLoginRenderer());
  MessageRendererRegistry.register(new SimplePasswordRenderer());
  MessageRendererRegistry.register(new SimpleGuestLoginConfirmationRenderer());
  MessageRendererRegistry.register(new SimpleSessionStartRenderer());
  MessageRendererRegistry.register(new SimpleSystemRenderer());
  MessageRendererRegistry.register(new SimpleRawRenderer());
  MessageRendererRegistry.register(new SimpleGameEndRenderer());
  MessageRendererRegistry.register(new SimpleGameStartRenderer());
  
  // Default fallback (must be last)
  MessageRendererRegistry.register(new SimpleDefaultRenderer());
}

// Register on import
registerRenderers();

// Export the registry
export { MessageRendererRegistry };
export * from './MessageRenderer';