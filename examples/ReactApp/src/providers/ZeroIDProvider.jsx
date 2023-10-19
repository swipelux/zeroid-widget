import {createContext, useContext, useEffect, useState} from 'react';

const ZeroIDContext = createContext();

export function useZeroID() {
    const zeroID = useContext(ZeroIDContext);
    return zeroID;
}

export const ZeroIDProvider = ({children}) => {
    const [zeroID, setZeroID] = useState();

    useEffect(() => {
        if (!zeroID) {
            const script = document.createElement('script');
            script.src = "https://zeroid.swipelux.com/sdk.js";
            script.async = true;
            script.onload = () => {
                console.log("ZeroId loaded", ZeroIdSdk);
                setZeroID(ZeroIdSdk);
            }
            document.body.appendChild(script);
        }
    }, [zeroID]);

    return (
        <ZeroIDContext.Provider value={zeroID}>
            {children}
        </ZeroIDContext.Provider>
    );
};
