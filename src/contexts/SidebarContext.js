import React, {createContext, useState} from 'react'


const SidebarContext = createContext();

const sidebarContextProvider = ({children}) => {
    const [collapsed, setCollapsed] = useState(false)
}

return (
    <SidebarContext.Provider
        value={{
            collapsed,
            setCollapsed
        }}
        >
            {children}
        </SidebarContext.Provider>
)

export {sidebarContextProvider, SidebarContext}