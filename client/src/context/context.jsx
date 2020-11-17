import React, { useState, useContext } from 'react';

export const Context = React.createContext();

export function UseSimeContext() {
    return useContext(Context);
}

export function ContextProvider(props) {
    const [project_id, setProject_id] = useState(null);
    return (
        <Context.Provider
            value={{
                project_id,
                setProject_id,
            }}
        >
            {props.children}
        </Context.Provider>
    )
}
