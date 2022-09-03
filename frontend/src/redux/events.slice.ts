import {EventC} from "../../../shared/event";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {getEvents} from "./events.actions";

interface InitialState {
    events: EventC[]
}

const initialState: InitialState = {
    events: []
}

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<EventC[]>) => {
            state.events = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.events = action.payload;
        })
    }
});


export const { setEvents } = eventsSlice.actions;

export const selectEvents = (state: RootState) => state.events.events;

export default eventsSlice.reducer;
