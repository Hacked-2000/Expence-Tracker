import { createSlice } from '@reduxjs/toolkit';

const getInitialMode = () => sessionStorage.getItem('theme') || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialMode(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      sessionStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      sessionStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
