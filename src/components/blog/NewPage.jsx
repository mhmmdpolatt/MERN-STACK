import React, { useState } from 'react';
import { useAllBlogQuery, useGetCategoryQuery } from '../../store/apis/blogApi';

import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import icon from "../../assets/icon.png"



const NewPage = () => {
    console.log("BLOGS", useAllBlogQuery());
    const { data: blog, isLoading: load, error: eror } = useAllBlogQuery();
    const { data, isLoading, error } = useGetCategoryQuery();

    const [searchTerm, setSearchTerm] = useState('')

    const [filteredCategory, setFilteredCategory] = useState(null); // Seçili kategoriyi tutan state

    if (load) {
        return <div>Loading...</div>;
    }

    if (eror) {
        return <div>Error loading blogs!</div>;
    }

    // Filtrelenmiş bloglar
    const filteredBlogs = filteredCategory
        ? blog.filter((blog) => blog.categories.some(category => category._id === filteredCategory))
        : blog;

    const handleCategoryClick = (categoryId) => {
        setFilteredCategory(categoryId);
    };

    return (
        <>
            {/* <HomePage/> */}

            <div className="flex flex-col items-center  md:flex md:flex-row  w-full md:justify-center md:items-start mt-5">
                <h1 className="block md:hidden text-slate-800 text-xl font-bold mb-4">Kategoriler</h1>
                {/* Kategori Bölümü */}
                <div className="Category flex flex-row flex-wrap justify-center items-center  gap-1 md:block  bg-white text-slate-600 w-full md:w-[20%] p-2 ml-6">
                    <h1 className="hidden w-7  md:block text-slate-800 text-xl font-bold mb-4">Kategoriler</h1>
                    <input
                        type="text"
                        placeholder='Merak Ettiğinizi Arayın '
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='hidden md:block outline-none w-full md:w-full h-full p-5 overflow-hidden md:bg-gradient-to-r from-slate-600 to-slate-700 text-slate-900 md:text-neutral-200 placeholder:ml-8 placeholder:pl-4 placeholder:pt-2 shadow-lg border-b-2 text-center rounded-lg
                                '
                    />
                    {data ? data.map((category) => (
                        <h1
                            key={category._id}
                            className={`p-3 rounded-md md:rounded-none text-sm font-medium cursor-pointer ${filteredCategory === category._id
                                ? "bg-slate-900 text-white"
                                : "bg-gradient-to-r from-slate-600 to-slate-800 text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900"
                                }`}
                            style={{ border: "1px solid gray" }}
                            onClick={() => handleCategoryClick(category._id)} // Kategoriye tıklama işlemi
                        >
                            {category.name}
                        </h1>
                    )) : <p>No categories available</p>}

                    {/* Tümünü Göster Butonu */}
                    <button
                        onClick={() => setFilteredCategory(null)}
                        className="p-3 text-sm font-medium bg-gray-400 text-white mt-2 hover:bg-gray-600 w-full"
                    >
                        Tüm Bloglar
                    </button>
                </div>

                {/* Blog Bölümü */}
                <div className="w-full md:w-[70%]">
                    <h1 className="text-center font-bold text-xl">BLOGLAR</h1>
                    <h2 className="text-center font-light text-lg">{filteredBlogs.length} Adet Souç Bulundu |</h2>
                    <div className="flex flex-wrap justify-center items-center w-full gap-4 md:gap-6 md:gap-x-12 p-0 md:p-8 bg-white my-2">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs
                                .filter((blog) => !blog.isArchive) // Sadece isArchive: false olan blogları filtrele
                                .map((blog) => (
                                    <div
                                        key={blog._id}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden w-[330px] h-[auto] border border-gray-200 hover:shadow-2xl"
                                    >
                                        {/* Blog Resmi */}
                                        
                                        {blog.image ? (
                                            <img
                                                src={`https://mern-stack-server-czfb.onrender.com/${blog.image}`}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover"
                                                onError={(e) => { e.target.onerror = null; e.target.src = icon; }}
                                            />
                                        ) : (
                                            <img
                                                src={icon}
                                                alt="Defaults"
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
                                                            src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${blog.user.profilePicture}`}
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

                </div>
            </div>
        </>
    );
};

export default NewPage;
