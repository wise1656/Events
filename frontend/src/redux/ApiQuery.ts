import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthService } from 'services/Auth.service';
import config from "../config/config";
import {EventC} from "../shared/event";

export const auth = {token: null};

export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.serverPort
            ? `${window.location.protocol}//${window.location.hostname}:${config.serverPort}/api/`
            : '/api',
        prepareHeaders: (headers) => {
            const token = AuthService.getInstance().getToken();
            if (token)
                headers.set("authorization", token);
            return headers;
        }
    }),
    endpoints: build => ({

        // список мероприятий для отображения
        getEvents: build.query<EventC[], void>({
            query: () => "events",
        }),

        // подписка на участие в мероприятии
        subscribe: build.mutation<void, Record<string, any>>({
            query: (data) => ({
                url: "subscribe",
                method: 'POST',
                body: data,
            })
        }),

        // отправка кода на емейл пользователю
        sendCode: build.mutation<void, string>({
            query: (email) => ({
                url: "code",
                method: 'POST',
                body: {email}
            })
        }),

        // вход в систему, сервер выставляет кук token
        login: build.mutation<string, {email: string, code: string}>({
            query: ({email, code}) => ({
                url: "login",
                method: 'POST',
                body: {email, code}
            }),
            transformResponse: (resp) => (typeof resp == "object") ? resp["token"] : null
        }),
    })
});

export const { useGetEventsQuery, useSubscribeMutation, useSendCodeMutation, useLoginMutation } = mainApi;

export const selectEvents = (state) => mainApi.endpoints.getEvents.select()(state).data;
export const selectEvent = (id: string) => (state) => selectEvents(state)?.find(e => e._id == id);