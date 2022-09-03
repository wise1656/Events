import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "./store";
import {EventC} from "../../../shared/event";
import {EventsService} from "../services/events.service";


interface ApiConfig {
    dispatch: AppDispatch;
    state: RootState;
}

export const getEvents = createAsyncThunk<EventC[], void, ApiConfig>('events/getEvents', async () => {
    return await EventsService.getEvents();
});

