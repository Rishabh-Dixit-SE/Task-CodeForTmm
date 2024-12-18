import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  page: 1,
  search: '',
  loading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    onDelete(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export default dataSlice.reducer;
export const {
  setData,
  setPage,
  setSearch,
  setLoading,
  onDelete,
} = dataSlice.actions;