import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ArticleDataTypes, UserTypes } from '../types/dataTypes';
import { articlesApi } from './api/articles.ts';
import { usersApi } from './api/users.ts';
import { commentsApi } from './api/comments.ts';
import { categoriesApi } from './api/categories.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface PopupTypes {
  isOpen: boolean;
  ids: number[];
  title?: string;
}

const initialSelectedItems: (ArticleDataTypes | UserTypes)[] = [];
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

const selectedUsersSlice = createSlice({
  name: 'selectedUsers',
  initialState: initialSelectedItems,
  reducers: {
    addUserSelected(state, action) {
      state.push(action.payload);
    },
    removeUserSelected(state, action) {
      return state.filter((selected) => selected.id !== action.payload.id);
    },
    clearUsersSelected() {
      return initialSelectedItems;
    },
  },
});

const selectedCommentsSlice = createSlice({
  name: 'selectedComments',
  initialState: initialSelectedItems,
  reducers: {
    addCommentSelected(state, action) {
      state.push(action.payload);
    },
    removeCommentSelected(state, action) {
      return state.filter((selected) => selected.id !== action.payload.id);
    },
    clearCommentsSelected() {
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
export const { addUserSelected, removeUserSelected, clearUsersSelected } =
  selectedUsersSlice.actions;
export const {
  addCommentSelected,
  removeCommentSelected,
  clearCommentsSelected,
} = selectedCommentsSlice.actions;
export const { switchPopup } = popupSlice.actions;
export const { setUser } = userSlice.actions;

export * from './api/articles.ts';
export * from './api/users.ts';
export * from './api/comments.ts';
export * from './api/categories.ts';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    selected: selectedSlice.reducer,
    selectedUsers: selectedUsersSlice.reducer,
    selectedComments: selectedCommentsSlice.reducer,
    user: userSlice.reducer,
    popup: popupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(usersApi.middleware)
      .concat(commentsApi.middleware)
      .concat(categoriesApi.middleware),
});
