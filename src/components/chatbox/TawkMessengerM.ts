declare module '@tawk.to/tawk-messenger-react' {
    import { ComponentType } from 'react';
  
    export interface TawkMessengerProps {
      propertyId: string;
      widgetId: string;
      onLoad: Function;
      onBeforeLoad : Function;
      onStatusChange: Function;
      onChatMinimized : Function;
      useRef: any;
    }
  
    const TawkMessenger: ComponentType<TawkMessengerProps>;
    export default TawkMessenger;
  }