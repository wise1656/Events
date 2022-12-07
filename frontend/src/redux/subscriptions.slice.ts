import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface subscriptionState {
    eventsIds: string[];
}

const initialState: subscriptionState = {
    eventsIds: [],
};

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        setSubscribedEvents: (state: subscriptionState, action: PayloadAction<string[]>) => ({
            eventsIds: action.payload,
        }),
        addSubscribedEvent: (state: subscriptionState, action: PayloadAction<string>) => ({
            eventsIds: [...state.eventsIds, action.payload],
        }),
    },
});

export const { setSubscribedEvents, addSubscribedEvent } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;

// Selectors
export const selectSubscribed = (state: RootState) => state.subscriptions.eventsIds;
export const selectIsSubscribed = (id: string) => (state: RootState) => state.subscriptions.eventsIds.includes(id);