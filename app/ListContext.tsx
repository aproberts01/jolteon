import { createContext, useContext, useReducer } from "react";

interface State {
  drawerOpen: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const ListContext = createContext<State | null>(null);
const ListDispatchContext = createContext<React.Dispatch<any> | null>(null);

const initialState: State = {
  drawerOpen: false,
};

import { ReactNode } from "react";

export function ListProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  return (
    <ListContext.Provider value={state}>
      <ListDispatchContext.Provider value={dispatch}>
        {children}
      </ListDispatchContext.Provider>
    </ListContext.Provider>
  );
}

export function useListState() {
  return useContext(ListContext);
}

export function useListDispatch() {
  return useContext(ListDispatchContext);
}

function tasksReducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_DRAWER": {
        console.log(action.payload, "action.payload")
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
