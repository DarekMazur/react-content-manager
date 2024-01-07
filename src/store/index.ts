import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ArticleDataTypes } from '../types/dataTypes';
import { articlesApi } from './api/articles.ts';
import { usersApi } from './api/users.ts';
import { commentsApi } from './api/comments.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface PopupTypes {
  isOpen: boolean;
  ids: number[];
  title?: string;
}

const initialSelectedItems: Array<ArticleDataTypes> = [];
const initialUser = {};
const initialPopup: PopupTypes = {
  isOpen: false,
  ids: [],
  title: undefined,
};

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
  reducers: {
    setUser(state, action) {
      return (state = action.payload);
    },
  },
});

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopup,
  reducers: {
    switchPopup(state, action) {
      return (state = action.payload);
    },
  },
});

export const { addSelected, removeSelected, clearSelected } =
  selectedSlice.actions;
export const { switchPopup } = popupSlice.actions;
export const { setUser } = userSlice.actions;

export * from './api/articles.ts';
export * from './api/users.ts';
export * from './api/comments.ts';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    selected: selectedSlice.reducer,
    user: userSlice.reducer,
    popup: popupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(usersApi.middleware)
      .concat(commentsApi.middleware),
});
