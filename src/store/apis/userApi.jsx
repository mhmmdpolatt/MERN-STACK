import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://myblog-md-e9c7810a4c96.herokuapp.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: () => '/users',
        }),
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/users/register",
                method: "POST",
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUserById: builder.query({
            query: (id) => `/users/user/${id}`,
        }),
        // Profil Güncelleme isteği
        updateUser: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/users/update/${id}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        followUser: builder.mutation({
            query: (id) => ({
                url: `/users/user/follow/${id}`,
                method: "PUT",
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`,  // Token'ı localStorage'dan alıyoruz
                // }
            })
        }),
        complaintForBlog: builder.mutation({
            query: ({ id, formData }) => ({
                url: `users/complaintForBlog/${id}`,
                method: 'POST',
                body: formData
            }),
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem('token')}`,  // Token'ı localStorage'dan alıyoruz
            // }
        }),
        complaintForUser:builder.mutation({
            query:({id,formData})=>({
                url:`users/complaintForUser/${id}`,
                method:"POST",
                body:formData
            })
        }),
        complaintForComment:builder.mutation({
            query:({id,formData})=>({
                url:`users/complaintForComment/${id}`,
                method:"POST",
                body:formData
            })
        })


    }),
});

export const {
    useFetchUsersQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useFollowUserMutation,
    useComplaintForBlogMutation,
    useComplaintForCommentMutation,
    useComplaintForUserMutation, // Hook'u dışa aktar
} = userApi;

export default userApi;
