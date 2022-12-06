import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { mainApi } from './ApiQuery';
import { uiSlice } from './UiSlice';
import userInfo from './UserInfo.slice';

export const store = configureStore({
    reducer: {
        uiSlice: uiSlice.reducer,
        userInfo,
        [mainApi.reducerPath]: mainApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
