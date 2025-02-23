import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPeopleDetails, IResponse, ITableItem } from '../types.ts';
import { getIdFromUrl } from '../helpers.ts';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getItems: builder.query<
      IResponse<Array<ITableItem>>,
      { page: string; search: string }
    >({
      query: ({ page, search }) =>
        `/people?page=${page}&search=${search?.trim()}`,
      transformResponse: (res: IResponse<Array<ITableItem>>) => {
        if (!res || !res.results) {
          throw new Error('Error API response');
        }
        return {
          ...res,
          results: res.results.map((item) => ({
            ...item,
            id: getIdFromUrl(item.url),
          })),
        };
      },
    }),
    getItem: builder.query<IPeopleDetails, { id: string }>({
      query: ({ id }) => `/people/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetItemQuery } = api;
