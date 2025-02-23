import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Item {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  endpoints: (builder) => ({
    getItems: builder.query<Item[], () => void>({
      query: () => '/items',
    }),
  }),
});

export const { useGetItemsQuery } = api;
