import { createContext, useState } from "react";

const OnboardContext = createContext();

export function OnboardProvider({ children }) {

    const [onboard, setOnboard] = useState(true);

    const done = () => {
        setOnboard(false);
    };

    return (
        <OnboardContext.Provider value={{onboard, done}}>
            {children}
        </OnboardContext.Provider>
    )

};

export default OnboardContext;