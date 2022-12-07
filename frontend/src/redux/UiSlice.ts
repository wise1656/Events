import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
    currentEventId: string
}

const initialState: UiState = {
    currentEventId: null
}

export const uiSlice = createSlice({
    name: "UiSlice",
    initialState,
    reducers: {
        setCurrentEvent: (state: UiState, {payload: currentEventId}: PayloadAction<string>) => 
            ({...state, currentEventId})        
    }
});

export const { setCurrentEvent } = uiSlice.actions;

// Selectors
export const selectCurrentEventId = (state: RootState) => state.ui.currentEventId;