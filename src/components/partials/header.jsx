import React from 'react'
import { MdFoodBank } from "react-icons/md";
import { AiFillBulb } from "react-icons/ai";
import { RiComputerFill } from "react-icons/ri";
import { GiHealthPotion } from "react-icons/gi";





const Header = () => {
    return (
        <>

            



                <div className="container flex  items-center justify-center p-2 gap-4 text-center">
                    <div className="hover:shadow-2xl hover:shadow-slate-800 transition duration-300 bg-white p-4 lg:p-6 rounded-lg text-slate-600 font-bold w-[35vw] h-[15vh]  md:w-1/3  flex flex-col items-center shadow-white shadow-md">
                        <RiComputerFill className="text-4xl " />
                        <h3 className="mt-2 text-sm sm:text-base">Yazılım</h3>
                    </div>
                    <div className="hover:shadow-2xl hover:shadow-slate-800 transition duration-300 bg-white p-4 lg:p-6 rounded-lg text-slate-600 font-bold w-[35vw]  md:w-1/3 h-[15vh] flex flex-col items-center shadow-white shadow-md">
                        <GiHealthPotion className="text-4xl " />
                        <h3 className="mt-2 text-sm sm:text-base">Gündelik</h3>
                    </div>
                    <div className="hover:shadow-2xl hover:shadow-slate-800 transition duration-300 bg-white p-4 lg:p-6 rounded-lg text-slate-600 font-bold w-[35vw]  md:w-1/3 h-[15vh] flex flex-col items-center shadow-white shadow-md">
                        <MdFoodBank className="text-4xl " />
                        <h3 className="mt-2 text-sm sm:text-base">Yemek</h3>
                    </div>
                    <div className="hover:shadow-3xl hover:shadow-slate-800 transition duration-300 bg-white p-4 lg:p-6 rounded-lg text-slate-600 font-bold w-[35vw]  md:w-1/3 h-[15vh] flex flex-col items-center shadow-white shadow-md">
                        <AiFillBulb className="text-4xl " />
                        <h3 className="mt-2 text-sm sm:text-base">Fikir</h3>
                    </div>
                </div>





            

        </>
    )
}

export default Header