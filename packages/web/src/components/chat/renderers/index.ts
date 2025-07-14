import { MessageRendererRegistry } from './MessageRenderer';
import { DefaultRenderer } from './DefaultRenderer';
import { ChannelTellRenderer } from './ChannelTellRenderer';
import { DirectTellRenderer } from './DirectTellRenderer';
import { 
  GameStartRenderer, 
  GameEndRenderer, 
  Style12Renderer, 
  MovesListRenderer 
} from './GameRenderer';
import {
  ShoutRenderer,
  CShoutRenderer,
  NotificationRenderer,
  SeekAnnouncementRenderer,
  MatchRequestRenderer,
  IllegalMoveRenderer,
  DrawOfferRenderer,
  UnobserveRenderer,
  WhoOutputRenderer,
  GamesOutputRenderer,
  FingerOutputRenderer,
  HistoryOutputRenderer,
  JournalOutputRenderer,
  SoughtOutputRenderer,
  ChannelListOutputRenderer,
  NewsOutputRenderer,
  InOutputRenderer,
  LoginRenderer,
  PasswordRenderer,
  GuestLoginConfirmationRenderer,
  SessionStartRenderer,
  SystemRenderer,
  RawRenderer
} from './ConsoleRenderer';

// Register all renderers
function registerAllRenderers() {
  // Communication renderers
  MessageRendererRegistry.register(new ChannelTellRenderer());
  MessageRendererRegistry.register(new DirectTellRenderer());
  MessageRendererRegistry.register(new ShoutRenderer());
  MessageRendererRegistry.register(new CShoutRenderer());
  
  // Game renderers
  MessageRendererRegistry.register(new GameStartRenderer());
  MessageRendererRegistry.register(new GameEndRenderer());
  MessageRendererRegistry.register(new Style12Renderer());
  MessageRendererRegistry.register(new MovesListRenderer());
  MessageRendererRegistry.register(new IllegalMoveRenderer());
  MessageRendererRegistry.register(new DrawOfferRenderer());
  MessageRendererRegistry.register(new UnobserveRenderer());
  
  // Seek/match renderers
  MessageRendererRegistry.register(new SeekAnnouncementRenderer());
  MessageRendererRegistry.register(new MatchRequestRenderer());
  
  // Output renderers
  MessageRendererRegistry.register(new WhoOutputRenderer());
  MessageRendererRegistry.register(new GamesOutputRenderer());
  MessageRendererRegistry.register(new FingerOutputRenderer());
  MessageRendererRegistry.register(new HistoryOutputRenderer());
  MessageRendererRegistry.register(new JournalOutputRenderer());
  MessageRendererRegistry.register(new SoughtOutputRenderer());
  MessageRendererRegistry.register(new ChannelListOutputRenderer());
  MessageRendererRegistry.register(new NewsOutputRenderer());
  MessageRendererRegistry.register(new InOutputRenderer());
  
  // System renderers
  MessageRendererRegistry.register(new NotificationRenderer());
  MessageRendererRegistry.register(new LoginRenderer());
  MessageRendererRegistry.register(new PasswordRenderer());
  MessageRendererRegistry.register(new GuestLoginConfirmationRenderer());
  MessageRendererRegistry.register(new SessionStartRenderer());
  MessageRendererRegistry.register(new SystemRenderer());
  MessageRendererRegistry.register(new RawRenderer());
  
  // Default renderer (must be last as it matches everything)
  MessageRendererRegistry.register(new DefaultRenderer());
}

// Register all renderers on import
registerAllRenderers();

export { MessageRendererRegistry };
export * from './MessageRenderer';
export * from './InteractiveContent';
export * from './MessageStyles';