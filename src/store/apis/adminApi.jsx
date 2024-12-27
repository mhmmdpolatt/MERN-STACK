import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://myblog-md-e9c7810a4c96.herokuapp.com/admin',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/fetchUser",
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: "DELETE"
      })
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/deleteBlog/${id}`,
        method: "DELETE"
      })
    }),
    updateUserRole: builder.mutation({
      query: (id) => ({
        url: `/updateUserRole/${id}`,
        method: "PATCH"
      })
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/deleteComment/${id}`,
        method: "DELETE"
      })
    }),
    fetchComplaint: builder.query({
      query: () => "/fetchComplaint"
    }),
    complaintResolved: builder.mutation({
      query: (id) => ({
        url: `/complaint/changeStatusResolved/${id}`,
        method: "PATCH"
      })
    }),
    complaintRejected: builder.mutation({
      query: (id) => ({
        url: `/complaint/changeStatusRejected/${id}`,
        method: "PATCH"
      })
    }),
    complaintExamine: builder.mutation({
      query: (id) => ({
        url: `/complaint/changeStatusExamine/${id}`,
        method: "PATCH"
      })
    }),
    deleteCompliant:builder.mutation({
      query:(id)=>({
        url:`/complaint/delete/${id}`,
        method:"DELETE"
      })
    })
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useDeleteBlogMutation, useUpdateUserRoleMutation, useDeleteCommentMutation, useFetchComplaintQuery, useComplaintResolvedMutation, useComplaintRejectedMutation,useComplaintExamineMutation,useDeleteCompliantMutation } = adminApi;
export default adminApi;
