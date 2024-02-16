import { configureStore, createSlice } from '@reduxjs/toolkit';
import { IFilterTypes } from '../types/dataTypes';
import { articlesApi } from './api/articles.ts';
import { usersApi } from './api/users.ts';
import { commentsApi } from './api/comments.ts';
import { categoriesApi } from './api/categories.ts';
import { IArticleData } from '../types/articleTypes.ts';
import { IUserData } from '../types/userTypes.ts';
import { ICategoryData } from '../types/categoryTypes.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IPopupTypes {
  isOpen: boolean;
  ids: number[];
  title?: string;
}

export interface ISortTypes {
  sortBy: string;
  order: string;
}

const initialSelectedItems: (IArticleData | IUserData | ICategoryData)[] = [];
const initialUser = {};
const initialPopup: IPopupTypes = {
  isOpen: false,
  ids: [],
  title: undefined,
};

const initialFilters: IFilterTypes[] = [];

const initialSorting = {
  sortBy: 'id',
  order: 'desc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    modifyFilter(_state, action) {
      return action.payload;
    },
    clearFilters() {
      return initialFilters;
    },
  },
});

const sortSlice = createSlice({
  name: 'sort',
  initialState: initialSorting,
  reducers: {
    createSort: (_state, action) => {
      return action.payload;
    },
    clearSort: () => {
      return initialSorting;
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

const selectedCategoriesSlice = createSlice({
  name: 'selectedCategories',
  initialState: initialSelectedItems,
  reducers: {
    addCategorySelected(state, action) {
      state.push(action.payload);
    },
    removeCategorySelected(state, action) {
      return state.filter((selected) => selected.id !== action.payload.id);
    },
    clearCategoriesSelected() {
      return initialSelectedItems;
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
  },
});

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopup,
  reducers: {
    switchPopup(_state, action) {
      return action.payload;
    },
  },
});

export const { addSelected, removeSelected, clearSelected } =
  selectedSlice.actions;
export const { addUserSelected, removeUserSelected, clearUsersSelected } =
  selectedUsersSlice.actions;

export const { createSort, clearSort } = sortSlice.actions;

export const {
  addCategorySelected,
  removeCategorySelected,
  clearCategoriesSelected,
} = selectedCategoriesSlice.actions;
export const {
  addCommentSelected,
  removeCommentSelected,
  clearCommentsSelected,
} = selectedCommentsSlice.actions;
export const { switchPopup } = popupSlice.actions;
export const { setUser } = userSlice.actions;

export const { modifyFilter, clearFilters } = filtersSlice.actions;

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
    filters: filtersSlice.reducer,
    sort: sortSlice.reducer,
    selected: selectedSlice.reducer,
    selectedUsers: selectedUsersSlice.reducer,
    selectedComments: selectedCommentsSlice.reducer,
    selectedCategories: selectedCategoriesSlice.reducer,
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
