
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";
import { ErrorAlert, SuccessAlert } from "../../components/Alert/alert.js";


export const registerUser = createAsyncThunk(
  "RegisterUser",
  async (data) => {
    try {
      const response = await API.registerUser({ ...data });
      const res = JSON.parse(response)
      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);

export const login = createAsyncThunk(
  "Login",
  async (data) => {
    try {
      const response = await API.login({ ...data });
      const res = JSON.parse(response)
      if (res.code == 200) {
        SuccessAlert(res.message);
      }
      else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      console.log("error",error);
      
      // ErrorAlert(error);
    }
  }
);


export const logout = createAsyncThunk(
  "Logout",
  async (data) => {
    try {
      const response = await API.logout({ ...data });
      const res = JSON.parse(response)
      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);

export const editProfile = createAsyncThunk(
  "EditProfile",
  async (data) => {
    try {
      const response = await API.editProfile({ ...data });
      const res = JSON.parse(response)
      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);

export const userProfile = createAsyncThunk(
  "UserProfile",
  async (data) => {
    try {
      const response = await API.userDetails({ ...data });
      const res = JSON.parse(response)
      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "ChangePassword",
  async (data) => {
    try {
      const response = await API.changePassword({ ...data });
      const res = JSON.parse(response)
      console.log(res);

      if (res?.code == 200) {
        SuccessAlert(res.message);
      } else {
        ErrorAlert(res.message);
      }
      return res;
    } catch (error) {
      ErrorAlert(error);
    }
  }
);


const initialState = {
  Login: {
    data: [],
    error: null,
  },
  UserProfile: {
    data: [],
    error: null,
  },
  Logout: {
    data: [],
    error: null,
  },
  RegisterUser: {
    data: [],
    error: null,
  },
  EditProfile: {
    data: [],
    error: null,
  },
  ChangePassword: {
    data: [],
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state) => {
      state.leadByIDGet.data = [];
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.Login.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.Login.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.Logout.data = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.Logout.error = action.error.message;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.UserProfile.data = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.UserProfile.error = action.error.message;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.EditProfile.data = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.EditProfile.error = action.error.message;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.ChangePassword.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.ChangePassword.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.RegisterUser.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.RegisterUser.error = action.error.message;
      })
  }
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
