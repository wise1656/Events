import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from "../config/config";
import {EventC} from "../shared/event";

export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.serverPort
            ? `${window.location.protocol}//${window.location.hostname}:${config.serverPort}/api/`
            : '/api',
    }),
    endpoints: build => ({

        // список мероприятий для отображения
        getEvents: build.query<EventC[], void>({
            query: () => "events"
        }),

        // подписка на участие в мероприятии
        subscribe: build.mutation<void, Record<string, any>>({
            query: (data) => ({
                url: "subscribe",
                method: 'POST',
                body: data,
            })
        })
    })
});

export const { useGetEventsQuery, useSubscribeMutation } = mainApi;

export const selectEvents = (state) => mainApi.endpoints.getEvents.select()(state).data;
export const selectEvent = (id: string) => (state) => selectEvents(state)?.find(e => e._id == id);