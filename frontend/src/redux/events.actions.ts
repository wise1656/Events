import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "./store";
import {EventC} from "../../../shared/event";
import {RequestService} from "../services/request.service";


interface ApiConfig {
    dispatch: AppDispatch;
    state: RootState;
}

export const getEvents = createAsyncThunk<EventC[], void, ApiConfig>('events/getEvents', async () => {
    return await RequestService.getInstance().get('/api/events');
});

