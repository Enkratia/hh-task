import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { GetContactUsMessagesType } from "./types";

import { getSession } from "next-auth/react";

import { BACKEND_URL } from "../../utils/constants";

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.backendTokens?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET
    // getUserById: builder.query<UserType, string>({
    //   query: (id) => `users/${id}`,
    // }),

    // CREATE
    createUser: builder.mutation<any, FormData>({
      query: (body) => {
        return {
          url: "auth/register",
          method: "POST",
          body: body,
        };
      },
    }),

    // **
    // verifyReset: builder.query<any, string>({
    //   query: (token) => {
    //     return {
    //       url: `auth/verify-reset?token=${token}`,
    //       method: "POST",
    //     };
    //   },
    // }),
    // UPDATE
    // updateUser: builder.mutation<any, UpdateUserType>({
    //   query: ({ id, body }) => {
    //     return {
    //       url: `users/${id}`,
    //       method: "PATCH",
    //       body: body,
    //     };
    //   },
    // }),
    // DELETE
    // deletePost: builder.mutation<any, string>({
    //   query: (id) => {
    //     return {
    //       url: `posts/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    // }),
  }),
});

export const {
  // useGetUserByIdQuery,

  // **
  useCreateUserMutation,
} = backendApi;
