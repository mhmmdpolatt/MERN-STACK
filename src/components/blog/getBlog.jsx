import React from 'react';
import { useGetBlogQuery } from '../../store/apis/blogApi';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";



const GetBlog = () => {
    const { data: latestBlogs, isLoading: loadingLatest,error } = useGetBlogQuery({ sort: 'latest', limit: 4 });
    
    
   

    


    if (loadingLatest) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading blogs!</div>;
    }

    return (
        <>
            {/* <BlogSlider /> */}

            <div className='mt-16  shadow-black border-stone-950 flex flex-col justify-center'>

                <h1 className=' text-3xl text-slate-900 text-starts  m-auto font-semibold'>Son Yazılar</h1>
                <div style={{
                    border: `1px solid gray`,
                    width: "75%",
                    margin: "auto",
                    marginTop: "5px"

                }}></div>
                <div className="flex flex-row justify-center flex-wrap items-center gap-6 gap-x-12 p-8  my-2">
                    {latestBlogs && latestBlogs.length > 0 ? (
                       latestBlogs
                            .filter((blog) => !blog.isArchive) // Sadece isArchive: false olan blogları filtrele
                            .map((blog) => (
                                <div
                                    key={blog._id}
                                    className="bg-gradient-to-r from-neutral-700 to-neutral-950  rounded-lg overflow-hidden  w-[310px] h-[auto]   shadow-xl hover:shadow-2xl hover:scale-110 duration-300"
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
                                        <h2 className=" text-base md:text-lg   text-white font-bold hover:scale-110 duration-200 hover:underline md:h-[5vh] p-1 text-center mb-8  text-wrap" title={`${blog.title}`}>
                                            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                                        </h2>

                                        {/* İçeriğin bir kısmı */}
                                        <p className="hidden md:block text-gray-100 text-sm text-left mt-3"
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
                                                        className="bg-gradient-to-r from-white to-gray-100 text-slate text-xs font-bold  py-1 px-2 rounded-full"
                                                    >
                                                        {category.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='flex items-center justify-between text-gray-400 pt-2'>
                                            {/* Profil Resmi ve Kullanıcı Adı */}
                                            <p className="text-sm text-gray-800 mt-2 flex items-center gap-2">
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
                                            <span className='flex justify-center items-center gap-2 text-white '> <MdFavoriteBorder className='text-3xl text-white hover:text-red-600' />{blog.likes.length}</span>
                                            <span className='flex justify-center items-center gap-2 text-white'><FaRegComment className='text-2xl text-white hover:text-blue-600' />{blog.comment.length}</span>
                                        </div>

                                    </div>
                                </div>
                            ))
                    ) : (
                        <p className="text-center text-gray-500">Henüz blog eklenmemiş.</p>
                    )}
                </div>

            </div>
        </>
    );
};

export default GetBlog;
