import React from 'react'

import { useGetBlogQuery } from '../../store/apis/blogApi';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

const PopularBlogs = () => {
    const { data: popularBlogs, isLoading: loadingPopular,error } = useGetBlogQuery({ sort: 'popular', limit: 4 });

    if (loadingPopular) {
        return <h1>Yükleniyor</h1>
    }

    if (error) {
        return <h1>Hata</h1>
    }
  
    

    return (
        <>
            <h1 className='text-center text-3xl font-bold p-2 text-slate-900 '>En Çok Beğenilenler</h1>
            <div style={{
                border: `0.1px solid gray`,
                width: "75%",
                margin: "auto",
                marginTop: "5px"

            }}></div>

            

            

            <div className="flex flex-row justify-center flex-wrap items-center gap-6 gap-x-12 p-8 bg-white
             my-2">
                {popularBlogs && popularBlogs.length > 0 ? (
                    popularBlogs
                        .filter((blog) => !blog.isArchive) // Sadece isArchive: false olan blogları filtrele
                        .map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white shadow-xl rounded-lg overflow-hidden w-[310px] h-[auto]  hover:shadow-2xl"
                            >
                                {/* Blog Resmi */}
                                {blog.image && (
                                    <img
                                        src={`https://mern-stack-server-czfb.onrender.com/${blog.image}`}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}

                                {/* İçerik */}
                                <div className="p-4">
                                    {/* Başlık */}
                                    <h2 className=" text-base md:text-lg font-normal  text-gray-800 hover:text-amber-900 hover:underline md:h-[5vh] p-1 text-center mb-8  text-wrap" title={`${blog.title}`}>
                                        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                                    </h2>

                                    {/* İçeriğin bir kısmı */}
                                    <p className="hidden md:block text-gray-700 text-sm text-left mt-3"
                                        dangerouslySetInnerHTML={{
                                            __html: blog.content.length > 100
                                                ? blog.content.slice(0, 50) + '...'
                                                : blog.content
                                        }} />

                                    {/* Kategoriler */}
                                    <div className="mt-4">
                                        <ul className="flex flex-wrap gap-2 mt-1">
                                            {blog.categories.map((category, index) => (
                                                <li
                                                    key={index}
                                                    className="bg-gray-600 text-xs text-white py-1 px-2 rounded-full"
                                                >
                                                    {category.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='flex items-center justify-between text-gray-400'>
                                        {/* Profil Resmi ve Kullanıcı Adı */}
                                        <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                                            {blog.user?.profilePicture ? (
                                                <img
                                                    src={`https://mern-stack-server-czfb.onrender.com/${blog.user.profilePicture}`}
                                                    alt="User Profile"
                                                    className="w-8 h-8 rounded-full object-cover" // Resim boyutunu büyütüyoruz
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-300 rounded-full" /> // Eğer profil resmi yoksa boş bir daire gösteririz
                                            )}
                                            <span className="font-semibold text-gray-600">{blog.user?.username || 'Bilinmiyor'}</span> {/* Kullanıcı adı */}
                                        </p>
                                        <p>|</p>
                                        <p className="text-sm text-gray-600 flex gap-1 items-center">
                                            {/* Tarih gösterme */}
                                            {new Date(blog.createdAt).toLocaleDateString('tr-TR') || 'Bilinmiyor'}
                                        </p>
                                    </div>
                                    {/* İKONLAr */}
                                    <div className='flex gap-2 justify-end'>
                                        <span className='flex justify-center items-center gap-2'> <MdFavoriteBorder className='text-3xl hover:text-red-600' />{blog.likes.length}</span>
                                        <span className='flex justify-center items-center gap-2'><FaRegComment className='text-2xl hover:text-blue-600' />{blog.comment.length}</span>
                                    </div>

                                </div>
                            </div>
                        ))
                ) : (
                    <p className="text-center text-gray-500">Henüz blog eklenmemiş.</p>
                )}
            </div>
        </>
    )
}

export default PopularBlogs