import { configureStore, createSlice } from '@reduxjs/toolkit';
import { mockTempPosts } from '../__mock__/mockTempPosts';

const initialArticlesList = mockTempPosts;
const initialSelectedItems: [] = [];
const initialUser = {};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: initialArticlesList,
  reducers: {},
});

const selectedSlice = createSlice({
  name: 'selected',
  initialState: initialSelectedItems,
  reducers: {
    addSelected(state, action) {
      state.push(action.payload);
    },
    removeSelected(state, action) {
      return state.filter((selected) => selected.id !== action.payload.id);
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
});

export const { addSelected, removeSelected } = selectedSlice.actions;

export const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    selected: selectedSlice.reducer,
    user: userSlice.reducer,
  },
});
