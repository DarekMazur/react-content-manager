import { configureStore, createSlice } from '@reduxjs/toolkit';
import { mockTempPosts } from '../__mock__/mockTempPosts';
import { TablePostDataTypes } from '../components/Organisms/Table/Table';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const initialArticlesList = mockTempPosts;
const initialSelectedItems: Array<TablePostDataTypes> = [];
const initialUser = {};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: initialArticlesList,
  reducers: {
    updateArticle(state, action) {
      const index = state.findIndex(
        (article) => article.id === action.payload.id,
      );
      if (index >= 0) {
        console.log(state[index]);
        state[index] = action.payload;
      }
    },
  },
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
export const { updateArticle } = articlesSlice.actions;

export const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    selected: selectedSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
