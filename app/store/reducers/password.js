import {createSlice} from '@reduxjs/toolkit';

export const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    password: '',
  },
  reducers: {
    setUserPassword: (state, data) => {
      state.password = data.payload.password;
      return state;
    },
  },
});

export const {setUserPassword} = passwordSlice.actions;

export default passwordSlice.reducer;
