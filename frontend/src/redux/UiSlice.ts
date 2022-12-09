import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
    currentEventId: string
    IsLogin: boolean
}

const initialState: UiState = {
    currentEventId: null,
    IsLogin: false
}

export const uiSlice = createSlice({
    name: "UiSlice",
    initialState,
    reducers: {
        setCurrentEvent: (state: UiState, {payload: currentEventId}: PayloadAction<string>) => 
            ({...state, currentEventId}),
        setIsLogin: (state: UiState, {payload: IsLogin}: PayloadAction<boolean>) => 
            ({...state, IsLogin})        
    }
});

export const { setCurrentEvent, setIsLogin } = uiSlice.actions;

// Selectors
export const selectCurrentEventId = (state: RootState) => state.ui.currentEventId;
export const selectIsLogin = (state: RootState) => state.ui.IsLogin;