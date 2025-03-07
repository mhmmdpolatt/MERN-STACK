import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mern-stack-server-czfb.onrender.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    endpoints: (builder) => ({

        createBlog: builder.mutation({
            query: (formData) => ({
                url: "/blog/createBlog",
                method: "POST",
                body: formData,
                // Authorization başlığına token eklemek için
               
            })


        }),
        getCategory: builder.query({
            query: () => '/blog/getCategory',
        }),
        getBlog: builder.query({
            query: ({ sort, limit, categories }) => {
                let query = '';
                if (!sort && !limit && !categories) {
                    return "/blog/getBlog"; // Tüm dataları al
                }
                if (sort) query += `sort=${sort}&`;
                if (limit) query += `limit=${limit}&`;
                if (categories) query += `categories=${categories}&`;
                
                // Sonuçta oluşan query'i kontrol et
                query = query.slice(0, -1); // Son '&' işaretini sil
                return `/blog/getBlog?${query}`;
            },
        }),
        allBlog:builder.query({
            query:()=>"/blog/allBlog"
        }),
        getBlogById: builder.query({
            query: (id) => `/blog/blog/${id}`, // Burada ID'yi dinamik olarak kullanıyoruz
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/blog/delete/${id}`,
                method: "DELETE",
             

            })
        }),
        archiveBlog: builder.mutation({
            query: (id) => ({
                url: `/blog/blog/archive/${id}`, // doğru URL ile istek gönderiyoruz
                method: "PATCH",
             
            })
        }),
        likeAdd: builder.mutation({
            query: (id) => ({
                url: `blog/blog/like/${id}`,
                method: "PUT",
             
            })
        }),
        addComment: builder.mutation({
            query: ({ id, commentContent }) => ({
                url: `blog/blog/comment/${id}`,
                method: "POST",
                body:{commentContent}, // Yorum içeriği
              
            }),
        }),
        getFollowingBlogs:builder.query({
            query:()=>"/blog/getFollowingBlogs",
           
        })


    }),
})

export const { useCreateBlogMutation, useGetCategoryQuery, useGetBlogQuery, useGetBlogByIdQuery, useDeleteBlogMutation, useArchiveBlogMutation, useLikeAddMutation, useAddCommentMutation,useAllBlogQuery ,useGetFollowingBlogsQuery} = blogApi;
export default blogApi; // userApi'yi varsayılan olarak dışa aktar