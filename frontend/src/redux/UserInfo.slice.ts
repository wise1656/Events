import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface UserInfo {
    name: string
    lastName: string
    birthday: string
    city: string
    church: string
}

const initialState: UserInfo = {
    name: '',
    lastName: '',
    birthday: '',
    city: '',
    church: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state = {...action.payload};
        }
    }
});

export const { setUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.userInfo;

export default userSlice.reducer;