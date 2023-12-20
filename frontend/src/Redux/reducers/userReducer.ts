import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UserCredentials } from "../../Types/UserCredentials";
import { Adduser } from "../../Types/Adduser";


const initialState: {
    users: Adduser[],
    currentUser?: Adduser
    loading: boolean,
    error: string
} = {
    users:[],
    loading: false,
    error: ""
}

export const createUser = createAsyncThunk(
    "users/createUser",  
    async (obj: Adduser, { rejectWithValue }) => {
        try {         
            const result = await axios.post<Adduser>("http://127.0.0.1:8000/api/register/", obj)
            return result.data
            
        }catch (e) {
            const error = e as AxiosError
            // Return only the error message not the whole AxiosError object
            return rejectWithValue(error.message)
        }
    }
)

export const UserLogin = createAsyncThunk(
    "users/UserLogin",  
    async ({ username, password }: UserCredentials, { rejectWithValue }) => {
        try {         
            const result = await axios.post("http://127.0.0.1:8000/api/login/", {username, password})
            const tokenId : string = result.data;
            localStorage.setItem("token", tokenId)
            //const decodedToken = jwt_decode<{[x: string]: any; sub: string }>(tokenId);
            //const userId = decodedToken.nameid;
            //console.log(userId)
        }catch (e) {
            const error = e as AxiosError
            // Return only the error message not the whole AxiosError object
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        cleanusers: ( ) => {
            return initialState
        }
    },
    extraReducers: (build) => {
        build
        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            // Check if the payload is a string (error message)
            if(typeof action.payload === "string") {
                state.error = action.payload
            } else { 
                state.users.push(action.payload)
            }
            state.loading = false;
        })
        .addCase(createUser.rejected, (state, action) =>{
            state.error = action.error.message || "Cannot fetch data"
            state.loading = false;
        })
        .addCase(UserLogin.fulfilled, (state, action) => {
            if(typeof action.payload === "string") {
                state.error = action.payload
            } else { 
                state.currentUser = action.payload
            }
        })
    }
})

const userReducer = userSlice.reducer
export const {cleanusers} = userSlice.actions
export default userReducer