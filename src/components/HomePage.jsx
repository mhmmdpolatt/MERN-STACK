import React from 'react';
import Header from './partials/header';

import GetBlog from './blog/getBlog';
import ZiyaretEt from './partials/ZiyaretEt';

import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import { useEffect } from 'react';
import { useAllBlogQuery } from '../store/apis/blogApi';
import Fuse from "fuse.js";
import NewPage from './blog/NewPage';
import PopularBlogs from './blog/PopularBlogs';
import RandomBLog from './blog/RandomBLog';
import FollowingBLogs from './blog/FollowingBLogs';

import BlogSliderAQ from './blog/BlogSliderAQ';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    const user = localStorage.getItem("user");


    const [searchTerm, setSearchTerm] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const { data, isLoading, isError } = useAllBlogQuery();;

    useEffect(() => {
        if (data && !isLoading) {
            if (searchTerm.trim() === "") {
                setFilteredData(data); // Arama terimi boşsa tüm datayı göster.
            } else {
                // Fuse.js ayarları
                const options = {
                    keys: ["title"], // Sadece title alanında arama yap.
                    threshold: 0.3, // Eşleşme toleransı (0 tam eşleşme, 1 her şey eşleşir).
                };

                const fuse = new Fuse(data, options);
                const result = fuse.search(searchTerm);
                setFilteredData(result.map((res) => res.item));
                
                // Fuse sonuçlarından item'ları al.
            }
        }
    }, [searchTerm, data, isLoading]);


    return (
        <>
            {/* Ana Sayfa İçeriği */}
            <main className="home-container bg-gray-50 min-h-screen">

                {/* Hero Bölümü */}
                <section className="hero-section  bg-gradient-to-r from-slate-700 to-slate-950 text-white py-20">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center gap-y-2">
                        <h1 className="text-2xl md:p-3 md:text-5xl font-bold mb-4">
                            MYB'loga Hoşgeldin
                        </h1>
                        <p className="text-base p-2 md:p-3 md:text-xl font-bold md:font-normal mb-6">
                            İlginç blog yazıları keşfedin, fikirlerinizi paylaşın! <br />
                            <p className='hidden md:block'> Kategoriler Sayfasına Gidip Alanınla İlgili Yazıları Bulabilirsin</p> <br />
                            <p className='hidden md:block'>Ya da Merak Ettiğini Arayabilirsin</p>
                        </p>
                        <button className='hover:scale-125 transition duration-300'>
                            <a
                                href="#blog-section"
                                className="bg-gradient-to-r from-slate-700 to-slate-950 text-gray-200 py-2 px-6 rounded-full text-lg"
                            >
                                Blogları Keşfet
                            </a>
                        </button>
                        <div className='relative mx-auto w-full p-3 md:w-1/2 mt-5 md:hover:scale-125 transition duration-300'>
                            <input
                                type="text"
                                placeholder='Merak Ettiğinizi Arayın / Kullanıcı Arayın '
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='outline-none w-[75vw] md:w-full h-full rounded-full p-5 overflow-hidden bg-white md:bg-gradient-to-r from-slate-700 to-slate-900 text-slate-900 placeholder:text-xs md:text-neutral-200 placeholder:ml-9 placeholder:pl-4 placeholder:pt-2 shadow-lg border-b-2 text-center
                                '
                            />
                            <CiSearch className='absolute left-14 top-10 md:top-1/2 -translate-y-1/2 md:left-5 md:right-0 text-3xl text-gray-800 md:text-gray-200 font-bold hover:scale-125' />
                            {searchTerm ?
                                <div className='bg-black bg-opacity-50 w-full h-full z-50'>

                                    <div className={`absolute md:fixed top-full left-0 w-full  h-[50vh] overflow-y-auto ${filteredData.length > 2 ? 'md:h-[26vh] ' :
                                        "h-[12vh]"} bg-gradient-to-r from-slate-600 to-slate-700   z-50 flex flex-col items-baseline`} >
                                        <p className='text-center text-xs underline mx-auto pt-1'>Aramanızla Eşleşen {filteredData.length}  Sonuç</p>
                                        {filteredData?.map((blog) => (
                                            <div className='p-2 flex justify-around items-center border-w w-full hover:bg-slate-900 border-b border-white' key={blog._id}>
                                                <NavLink to={`/blog/${blog._id}`} className='text-[15px] p-2'>
                                                    {blog.title}
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                : null}

                        </div>
                    </div>
                    <div className='hidden   md:flex justify-center p-1'>
                        <Header />
                    </div>

                </section>



                <section className='mt-8'>

                    <BlogSliderAQ />
                </section>

                {/* Blog İçerikleri */}
                <section id="blog-section" className="bg-white py-16">
                    <div className="container mx-auto text-center">

                        <GetBlog />
                    </div>
                </section>

                <section id='blog-section ' className='bg-white py-8'>
                    <PopularBlogs />
                </section>

                <section id='blog-section ' className='bg-white py-8'>
                    <RandomBLog />
                </section>
                {user ? <section id='blog-section ' className='bg-white py-8'>
                    <FollowingBLogs />
                </section> : null}



                {/* Profil Sayfaları */}
                <ZiyaretEt />

                {/* Footer */}

            </main>
        </>
    );
};

export default HomePage;
