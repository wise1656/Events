import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthService } from 'services/Auth.service';
import config from '../config/config';
import { EventC } from '../shared/event';
import { RootState } from './store';

export const auth = { token: null };

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: config.serverPort
            ? `${window.location.protocol}//${window.location.hostname}:${config.serverPort}/api/`
            : '/api',
        prepareHeaders: (headers) => {
            const token = AuthService.getInstance().getToken();
            if (token) headers.set('authorization', token);
            return headers;
        },
    }),
    tagTypes: ['events'],
    endpoints: (build) => ({
        // список мероприятий для отображения
        getEvents: build.query<EventC[], void>({
            query: () => 'events',
            providesTags: ['events'],
        }),

        // обновляет событие
        postEvent: build.mutation<string, EventC>({
            query: (event) => ({
                url: 'event',
                method: 'POST',
                body: event,
            }),
            invalidatesTags: ['events'],
            transformResponse: (resp) => (typeof resp == 'object' ? resp['id'] : null),
        }),

        // подписка на участие в мероприятии
        subscribe: build.mutation<void, Record<string, any>>({
            query: (data) => ({
                url: 'subscribe',
                method: 'POST',
                body: data,
            }),
        }),

        getSubscribers: build.query<Record<string, any>[], string>({
            query: (eventId: string) => `/subscribers?id=${eventId}`,
        }),

        // отправка кода на емейл пользователю
        sendCode: build.mutation<void, string>({
            query: (email) => ({
                url: 'code',
                method: 'POST',
                body: { email },
            }),
        }),

        // вход в систему, сервер выставляет кук token
        login: build.mutation<string, { email: string; code: string }>({
            query: ({ email, code }) => ({
                url: 'login',
                method: 'POST',
                body: { email, code },
            }),
            transformResponse: (resp) => (typeof resp == 'object' ? resp['token'] : null),
        }),
    }),
});

export const {
    useGetEventsQuery,
    useSubscribeMutation,
    useSendCodeMutation,
    useLoginMutation,
    usePostEventMutation,
    useGetSubscribersQuery
} = mainApi;

const getEventsSelector = mainApi.endpoints.getEvents.select();
const getTime = (date: string) => new Date(date).getTime();

export const selectEvents = createSelector(
    getEventsSelector,
    (events) => events.data && [...events.data].sort((a, b) => getTime(a.startDate) - getTime(b.startDate))
)
export const selectEvent = (id: string) => (state: RootState) => selectEvents(state)?.find((e) => e._id == id);
