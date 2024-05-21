import { configureStore } from '@reduxjs/toolkit';

// Define your initial state
const initialState = {
  isSidebarOpen: false
};

// Define your reducer function
function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      };
    default:
      return state;
  }
}

// Create a rootReducer by combining reducers (if you have more than one)
const rootReducer = {
  sidebar: sidebarReducer, // Add other reducers here if needed
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer, // Pass the rootReducer as the 'reducer' argument
});

export default store;