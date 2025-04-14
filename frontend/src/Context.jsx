import axios from "axios";
import { createContext } from "react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
    const url = "http://127.0.0.1:5000";

    const contextValue = {
        url
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;