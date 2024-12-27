import React from 'react'
import { useSelector } from 'react-redux'

import { IoMdLogOut } from "react-icons/io";
// import LogoutIcon from '../../icon';
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice';
import { IoMdPerson } from "react-icons/io";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
    // const userr = { username: "DemoUser", _id: 1 }; // Örnek kullanıcı verisi
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth || { user: null }); // auth state'inden user bilgisi alınıyor
    console.log("USER: ", user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <div
            className=' bg-gradient-to-r from-slate-700 to-slate-950 w-[100vw] md:p-8'


        >

            <nav className="flex flex-row justify-between  items-center p-4  bg-gradient-to-r from-slate-700 to-slate-950 text-white shadow-sm text-lg relative">
                {/* Menü Butonu */}
                <div
                    className="block md:hidden cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className="bg-gray-100 w-8 h-1 my-1"></div>
                    <div className="bg-gray-100 w-8 h-1 my-1"></div>
                    <div className="bg-gray-100 w-8 h-1 my-1"></div>
                </div>

                {/* Logo */}
                <div className="block md:hidden font-bold text-xl  font-mono">
                    <h1>MyBlog</h1>
                </div>
                {user ? (<div className="block md:hidden">
                    <a href={`/user/${user._id}`} ><IoMdPerson size={25} /></a>

                </div>) : ("")}
                {/* Profil Butonu */}

                {/* ADMİN LİNKLERİ */}
                {user?.role == "admin" && (
                    <div className="relative">
                        <button
                            onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                            className="flex items-center gap-1 text-sm text-white hover:text-slate-800 transition"
                        >
                            Admin İşlemleri
                            <span className="ml-1">▼</span>
                        </button>
                        {adminDropdownOpen && (
                            <div className="absolute bg-white text-gray-800 rounded shadow-lg mt-2 w-48">
                                <a
                                    href="/admin/users"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Kullanıcılar
                                </a>
                                <a
                                    href="/admin/blogs"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Bloglar
                                </a>
                                <a
                                    href="/admin/reports"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Şikayetler
                                </a>
                                <a
                                    href="/admin/roles"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Roller
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Masaüstü Menü Linkleri */}
                <div className="hidden md:flex gap-4 text-base font-medium text-white">
                    <NavLink to="/" activeClassName="text-slate-800" className="hover:text-white transition duration-300">
                        Ana Sayfa
                    </NavLink>
                    <NavLink to="/blogs" activeClassName="text-slate-800" className="hover:text-white transition duration-300">
                        Kategoriler
                    </NavLink>
                    <NavLink to="/blog-add" activeClassName="text-slate-800" className="hover:text-white transition duration-300">
                        Blog Ekle
                    </NavLink>

                    {user ? (
                        <div className="flex items-center gap-3 text-sm text-white hover:scale-110">
                            <NavLink to={`/user/${user._id}`} activeClassName="text-slate-800" className="flex items-center gap-1">
                                <IoMdPerson size={18} />
                                <span>Merhaba, {user.username}</span>
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 hover:text-red-600 transition duration-300"
                            >
                                <IoMdLogOut size={18} />
                                <span>Çıkış</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/register" activeClassName="text-purple-500" className="hover:text-purple-500 transition duration-300">
                                Login/Sign
                            </NavLink>
                            <NavLink to="/register" activeClassName="text-purple-500" className="hover:text-purple-500 transition duration-300">
                                Giriş
                            </NavLink>
                        </>

                    )}
                </div>


                {/* Mobil Yan Menü */}
                <div
                    className={`fixed top-0 left-0 h-full  bg-gradient-to-b from-slate-500 to-slate-600 text-white w-64 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-transform duration-[0.8s] ease-in-out z-50`}
                >
                    <div className="p-4 flex justify-between items-center border-b border-gray-600">
                        <h1 className="font-bold text-xl">MyBlog</h1>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-300 hover:text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <a
                            href="/"
                            className="hover:scale-110transition duration-300"
                        >
                            Ana Sayfa
                        </a>
                        <a
                            href="/blogs"
                            className="hover:scale-110transition duration-300"
                        >
                            Kategoriler
                        </a>
                        <a
                            href="/blog-add"
                            className="hover:scale-110 transition duration-300"
                        >
                            Blog Ekle
                        </a>
                        {user ? (
                            <div className="flex flex-col gap-3 text-sm text-gray-300">
                                <a href={`/user/${user._id}`} className="flex items-center gap-1">
                                    <IoMdPerson size={18} />
                                    <span>Merhaba, {user.username}</span>
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 hover:text-red-400 transition duration-300"
                                >
                                    <IoMdLogOut size={18} />
                                    <span>Çıkış</span>
                                </button>
                            </div>
                        ) : (
                            <div> <a
                                href="/register"
                                className="hover:text-purple-400 transition duration-300"
                            >
                                Kayıt Ol
                            </a>
                                <a href="/login">Giriş</a>

                            </div>

                        )}
                    </div>
                </div>

                {/* Menü Açıkken Arkaplanı Kaplama */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )}
            </nav>




            {/* <div>
                {!isProfilePage ? (
                    <div className='İKONS my-2 w-full p-3 '>



                        <div className='container flex items-center justify-between p-2'>
                            <div style={{ height: "15vh" }} className='hover:shadow-gray-500 bg-slate-700 p-8 lg:p-4 rounded-lg text-gray[#10375C] text-white font-bold w-2/12  h-1/5 shadow-lg text-center flex flex-col items-center'>
                                <GiHealthPotion className='text-white' style={{ fontSize: "55px" }} />
                                Gündelik</div>
                            <div style={{ height: "15vh" }} className='hover:shadow-2xl hover:shadow-gray-500 transition duration-30 bg-white p-6 lg:p-4 rounded-lg text-gray[#10375C] font-bold w-2/12 h-1/5 shadow-lg text-center flex flex-col items-center'>
                                <RiComputerFill style={{ fontSize: "35px" }} />
                                <h3>Yazılım</h3>
                            </div>

                            <div style={{ height: "15vh" }} className='hover:shadow-gray-500 bg-slate-700 text-white p-12 lg:p-4 rounded-lg text-gray[#10375C] font-bold w-2/12  h-1/5 shadow-lg text-center flex flex-col items-center'>
                                <MdFoodBank className='text-white' style={{ fontSize: "45px" }} />
                                <h2>
                                    Yemek
                                </h2>
                            </div>
                            <div style={{ height: "15vh" }} className='hover:shadow-gray-500 bg-white p-6 lg:p-4 rounded-lg text-gray[#10375C] font-bold w-2/12  h-1/5 shadow-lg text-center flex flex-col items-center'>
                                <AiFillBulb style={{ fontSize: "35px" }} />
                                <h2 >Fikir</h2>
                            </div>
                        </div>




                    </div>
                )
                    : (
                        ""
                    )}
            </div> */}




        </div>


    )
}

export default Navbar