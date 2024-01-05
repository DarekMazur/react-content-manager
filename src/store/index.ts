import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleDataTypes } from '../types/dataTypes';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const initialArticlesList: Array<ArticleDataTypes> = [];
const initialSelectedItems: Array<ArticleDataTypes> = [];
const initialUser = {};
const initialPopup = false;

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
    updateArticles: builder.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const { useGetArticlesQuery, useUpdateArticlesMutation } = articlesApi;

const articlesSlice = createSlice({
  name: 'articles',
  initialState: initialArticlesList,
  reducers: {
    updateArticle(state, action) {
      action.payload.forEach((item: ArticleDataTypes) => {
        const index = state.findIndex((article) => article.uuid === item.uuid);
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
export const { updateArticle, removeArticle } = articlesSlice.actions;
export const { switchPopup } = popupSlice.actions;
export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    articles: articlesSlice.reducer,
    selected: selectedSlice.reducer,
    user: userSlice.reducer,
    popup: popupSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});
