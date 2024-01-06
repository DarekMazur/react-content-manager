import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleDataTypes } from '../types/dataTypes';

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

const articlesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleDataTypes[], void>({
      query: () => 'articles',
      providesTags: ['Articles'],
    }),
    updateArticle: builder.mutation({
      query: (body) => ({
        url: `articles/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
    removeArticle: builder.mutation({
      query: (id) => ({
        url: `articles/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Articles'],
    }),
    removeArticles: builder.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'DELETE',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useUpdateArticleMutation,
  useRemoveArticleMutation,
  useRemoveArticlesMutation,
} = articlesApi;

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

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    selected: selectedSlice.reducer,
    user: userSlice.reducer,
    popup: popupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});
