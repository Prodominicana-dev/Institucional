import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function TawkMessenger() {
    const tawkMessengerRef = useRef();
    const onLoad = () => {
    };
  
    return (
        <div className="App">
            <TawkMessengerReact
                propertyId="5b899dd9afc2c34e96e81b9f"
                widgetId="default"
                onLoad={onLoad}
                useRef={tawkMessengerRef}
            />
        </div>
    );
}