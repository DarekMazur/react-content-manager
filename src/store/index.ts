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
      action.payload.forEach((item: TablePostDataTypes) => {
        const index = state.findIndex((article) => article.id === item.id);
        if (index >= 0) {
          state[index] = item;
        }
      });
    },

    removeArticle(state, action) {
      return state.filter((article) => article.id !== action.payload.id);
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
    clearSelected() {
      return initialSelectedItems;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
});

export const { addSelected, removeSelected, clearSelected } =
  selectedSlice.actions;
export const { updateArticle, removeArticle } = articlesSlice.actions;

export const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
    selected: selectedSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
