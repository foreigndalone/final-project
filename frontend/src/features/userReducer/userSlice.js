import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
    "user/signUp",
    async ({ email, username, password }, { rejectWithValue }) => {
        try {
        const res = await fetch("http://localhost:5001/api/user/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return rejectWithValue(errorData.message || "Failed to register");
        }

        const data = await res.json(); // обычно { user: {...}, token: "..." }
        return data;
        } catch (err) {
        return rejectWithValue(err.message);
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
        const res = await fetch("http://localhost:5001/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return rejectWithValue(errorData.message || "Failed to login");
        }

        const data = await res.json();
        return data; 
        } catch (err) {
        return rejectWithValue(err.message);
        }
    }
);

const initialState = {
    user: {
        id: null,
        email: null,
        name: null,
        status: "guest",
        description: null,
    },
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action) {
        state.user = { ...state.user, ...action.payload };
        state.isAuthenticated = true;
        state.error = null;
        },
        updateUser(state, action) {
        state.user = { ...state.user, ...action.payload };
        },
    },
extraReducers: (builder) => {
  builder
    .addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    })
    .addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    }
});

export const { setUserData, updateUser } = userSlice.actions;
export default userSlice.reducer;