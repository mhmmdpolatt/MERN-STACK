import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // CSS dosyasını unutmayın

import { useAllBlogQuery } from "../../store/apis/blogApi";

const BlogSliderAQ = () => {
    const { data: blogs, isLoading, error } = useAllBlogQuery();
    
    return (
        <div className=" p-0 md:p-1 bg-white  ">
            <h1 className="mx-auto text-center text-3xl font-bold text-slate-900">Senin İçin </h1>
            <div style={{
                border: `0.1px solid gray`,
                width: "75%",
                margin: "auto",
                marginTop: "5px",
                marginBottom:"8px"

            }}></div>
            {/* <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Öne Çıkan Bloglar</h2> */}
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={4000}
                showStatus={false}
                stopOnHover
                className="max-w-3xl mx-auto mt-12 shadow-2xl "
            >
                {blogs?.map((blog) => (
                    <div
                        key={blog._id}
                        className="relative group overflow-hidden rounded-lg w-full h-[350px] md:w-auto  md:h-[500px]"
                    // Yükseklik artırıldı
                    >
                        {/* Blog Resmi */}
                        {blog.image && (
                            <img
                                src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${blog.image}`}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}

                        {/* Karanlık Overlay */}
                        <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                        {/* Başlık ve İçerik */}
                        <div className="absolute  top-1/3 md:top-1/4 left-10 text-left">
                            {/* Başlık */}
                            <h3
                                className=" text-2xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
                                dangerouslySetInnerHTML={{
                                    __html: `<a href="/blog/${blog._id}" class="hover:underline">${blog.title}</a>`,
                                }}
                            ></h3>

                            {/* İçerik */}
                            <p
                                className="hidden md:block text-lg text-gray-300 max-w-3xl leading-relaxed drop-shadow-md"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        blog.content?.length > 200
                                            ? blog.content.slice(0, 200) + "..."
                                            : blog.content,
                                }}
                            ></p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );

};

export default BlogSliderAQ;
