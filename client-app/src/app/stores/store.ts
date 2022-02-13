import * as React from "react"
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

const store: Store = {
    activityStore: new ActivityStore()
}

const StoreContext = React.createContext(store)
const StoreProvider = StoreContext.Provider;

function useStore() {
    const context = React.useContext(StoreContext)

    if (context === undefined){
        throw new Error("useStore must be used within a StoreProvider")
    }

    return context
}


export { StoreProvider, useStore, store }