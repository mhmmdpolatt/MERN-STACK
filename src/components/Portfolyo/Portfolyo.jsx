import React from 'react'
import { IoLogoNodejs } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { SiMongodb } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import Resim from "../../assets/porfolyo.jpg"
import Resim2 from "../../assets/örnek.jpg"
import MyBlog from "../../assets/myblog.png"
import NodeShop from "../../assets/nodeshop.png"
import Movie from "../../assets/movie.png"
import Weather from "../../assets/weatherapp.png"
import { useState } from 'react';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import "../../index.css"


const Portfolyo = () => {
    const [isHovered, setIsHovered] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const projects = [
        { title: "MERN-Stack BlogApp", description: "A full-stack blogging application with user authentication, CRUD operations, and real-time updates.", image: MyBlog, link: "https://myblog-react-mdpol.netlify.app/#/" },
        { title: "MERN-Stack ShoppApp", description: "E-commerce platform built with MERN stack, featuring product management and user cart functionalities.", image: NodeShop, link: "https://myblog-react-mdpol.netlify.app/#/" },
        { title: "Movie App", description: "A movie information application with search, filter, and details features.", image: Movie, link: "https://myblog-react-mdpol.netlify.app/#/" },
        { title: "Weather App", description: "Provides real-time weather updates for specific locations.", image: Weather, link: "https://myblog-react-mdpol.netlify.app/#/" },
        { title: "Flip Card", description: "A simple flip card component showcasing various content types.", image: Resim2, link: "https://myblog-react-mdpol.netlify.app/#/" },
        {
            title: "FullRestApi",
            description: "A comprehensive REST API implementation supporting CRUD operations, authentication, and data validation.",
            image: Resim2,
            link: "https://myblog-react-mdpol.netlify.app/#/"
        }

    ];
    return (
        <div className='absolute top-0  bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900  w-full h-auto'>




            <div className=" flex flex-col md:flex-row md:justify-center items-center mx-auto mt-12 w-4/5 md:w-4/5 bg-gradient-to-br from-gray-800 to-gray-900  rounded-lg shadow-xl shadow-neutral-900 p-8 gap-x-5 hover:hue-rotate-30 hover:shadow-white hover:shadow-xl hover:scale-105  duration-200 ">

                {/* Resim Alanı */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                    <img
                        src={Resim} // Buraya kendi resminin yolu gelecek
                        alt="Your Name"
                        className="w-40 h-40 rounded-full border-4 border-purple-500 shadow-md hover:scale-150 duration-200"
                    />
                </div>
                {/* Metin ve Buton Alanı */}
                <div className="flex flex-col w-full md:p-1 items-start md:items-start">
                    <h1 className='text-xl  md:text-5xl  text-gray-200  font-bold'>
                        <span className="animate-typing  md:whitespace-nowrap ">
                            If You Can Dream it You Can Do It !
                        </span>
                    </h1>

                    <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 font-extrabold text-3xl md:text-4xl animate-fade-in mb-4">
                        Hi, I am a Full Stack Developer
                    </h1>
                    <p className="text-gray-300 text-lg animate-slide-in mb-4 text-left md:text-left">
                        Crafting scalable and engaging web applications with modern technologies.
                    </p>
                    <p className="text-indigo-400 text-lg font-medium animate-fade-in animation-delay-2 text-left md:text-left">
                        Specializing in the <span className="font-bold">MERN Stack</span> (MongoDB, Express, React, Node.js).
                    </p>
                    <div className="flex justify-center md:justify-start mt-5 space-x-4 animate-fade-in animation-delay-3">
                        <button
                            className="px-6 py-2 bg-purple-500 text-gray-800 font-semibold rounded-md hover:bg-transparent hover:text-purple-600
            hover:border border-purple-800 transition-all"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <a href="projects" className="block">
                                {isHovered ? 'Scroll Down Link Broken :/' : 'View Projects'}
                            </a>
                        </button>

                        <button className="px-6 py-2 border-2 border-purple-500 text-purple-500 font-semibold rounded-md hover:bg-purple-500  hover:rotate-45  hover:text-gray-800 transition-all">
                            Contact Me
                        </button>
                    </div>
                    <p className="text-gray-300 text-sm mt-6 flex items-center">
                        Visit my blog:{" "}
                        <a
                            href="https://myblog-react-mdpol.netlify.app/#/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-500 hover:underline hover:text-purple-400 flex items-center ml-2"
                        >

                            myblog-react-mdpol.netlify.app
                        </a>
                    </p>
                    <div className='flex flex-col md:flex-row justify-center items-center flex-wrap space-y-3 space-x-4 mt-6'>
                        <h1 className='text-white'>Visit My Accounst</h1>
                        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-gray-600">
                            <FaGithubSquare className="w-8 h-8" />
                        </a>
                        <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                            <FaLinkedin className="w-8 h-8" />
                        </a>
                        <a href="" className='flex justify-center items-center gap-x-3 text-wrap'><SiGmail className='w-8 h-8 text-red-500 hover:text-red-600' /> <p className='text-purple-500'>mhmdpolatt@gmail.com</p></a>
                    </div>




                </div>
            </div>




            {/* TEKNOLOJİLER */}
            <div className="ikonlar w-4/5 mx-auto flex flex-col items-center gap-8 mt-10 p-5 rounded-lg shadow-lg shadow-neutral-900 -hue-rotate-15">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 text-4xl font-bold text-shadow-lg">
                    What Technologies
                </h1>

                <div className="flex justify-center items-center flex-wrap p-8 md:p-2 gap-8">
                    <div className="group flex flex-col items-center text-center">
                        <IoLogoNodejs className="text-green-500 text-5xl md:text-7xl group-hover:scale-110 transition-transform" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-green-400">
                            Node.js
                        </span>
                    </div>
                    <div className="group flex flex-col items-center text-center">
                        <FaReact className="text-cyan-400 text-5xl md:text-7xl group-hover:rotate-180 transition-transform" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-cyan-500">
                            React
                        </span>
                    </div>
                    <div className="group flex flex-col items-center text-center">
                        <RiTailwindCssFill className="text-blue-400 text-5xl md:text-7xl group-hover:scale-125 transition-transform" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-blue-500">
                            Tailwind CSS
                        </span>
                    </div>
                    <div className="group flex flex-col items-center text-center">
                        <IoLogoJavascript className="text-yellow-400 text-5xl md:text-7xl group-hover:rotate-45 transition-transform" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-yellow-500">
                            JavaScript
                        </span>
                    </div>
                    <div className="group flex flex-col items-center text-center">
                        <SiMongodb className="text-green-400 text-5xl md:text-7xl group-hover:scale-110 transition-transform" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-green-500">
                            MongoDB
                        </span>
                    </div>
                    <div className="group flex flex-col items-center text-center">
                        <FaBootstrap className="text-purple-500 text-5xl md:text-7xl group-hover:scale-125 transition-transform" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-purple-400">
                            Bootstrap
                        </span>
                    </div>
                    <div className="group flex flex-col items-center text-center">
                        <RiNextjsFill className="text-gray-300 text-5xl md:text-7xl group-hover:text-white transition-colors" />
                        <span className="text-neutral-300 mt-2 text-sm group-hover:text-gray-100">
                            Next.js
                        </span>
                    </div>
                </div>
            </div>







            <div id='#projects' className='flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl shadow-neutral-900 mt-8 w-4/5 mx-auto'>
                <h1 className='text-center text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 text-4xl font-bold text-shadow-lg mt-8'>
                    Do you want to see my projects
                </h1>

                <div className='projects projeler flex flex-wrap justify-center gap-8 mt-12 px-8 md:p-5'>
                    {projects.map((project, index) => (
                        <div key={index} className="proje-card bg-gray-800 rounded-lg shadow-lg overflow-hidden w-auto  md:w-[33%] relative group">
                            <div className="relative">
                                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                                {/* Show Image Button */}
                                <button
                                    onClick={() => handleImageClick(project.image)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                                    <span className="text-white bg-purple-500 px-4 py-2 rounded">Show Image</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <h2 className="text-white font-bold text-xl">{project.title}</h2>
                                <p className="text-gray-300 text-sm mt-2">{project.description}</p>
                                <a href={project.link} className="mt-3 block text-center bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 rounded hover:bg-purple-600 transition-all">
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mx-auto my-8'>
                    <button className='bg-slate-800 px-5 py-3 rounded-lg text-white hover:scale-105 hover:bg-slate-950 duration-200'><a href="https://github.com/mhmmdpolatt?tab=repositories" target='_blank' className='flex flex-col justify-center items-center gap-y-2'>See More <FaGithubSquare className='text-2xl' /></a></button>
                </div>


                {/* Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <div className="relative">
                            <img src={selectedImage} alt="Selected" className="max-w-[75vw] max-h-full rounded" />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>


            <div className="text-center mt-12">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">Interested in Working Together?</h2>
                <p className="text-gray-300 mb-6">Feel free to reach out for collaborations, projects, or any inquiries.</p>
                <button className="px-6 py-2 bg-purple-500 text-gray-800 font-semibold rounded-md hover:bg-transparent hover:text-purple-600 transition-all">
                    Contact Me
                </button>
            </div>






            <footer className="bg-gray-900 text-gray-300 py-4 mt-8">
                <div className="flex justify-center space-x-4">
                    <h1>MDPOLAT</h1>
                </div>
            </footer>


        </div>
    )
}

export default Portfolyo