import React from 'react'
import { useFetchUsersQuery } from '../../store/apis/userApi'
import { GiPlagueDoctorProfile } from "react-icons/gi";

import { NavLink } from 'react-router-dom';
const ZiyaretEt = () => {
    const { data, isLoading, error } = useFetchUsersQuery();

    // Verilerin yüklenmesini bekliyoruz
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Hata durumunda mesaj gösteriyoruz
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Kullanıcıları karıştırma işlemi
    const shuffledUsers = [...data]  // Data'yı kopyala
        .sort(() => Math.random() - 0.5) // Karıştırma işlemi
        .slice(0, 5); // Sadece 5 kullanıcıyı alıyoruz

    return (
        <div className='bg-white'>
            <h2 className="text-center text-xl font-semibold">Takip Etmeye Başlayıp AnaSayfanı Zenginleştirebiliriz</h2>

            <div className="flex flex-wrap justify-center  gap-6 mt-6">
                {shuffledUsers.map((user) => (
                    <div key={user._id} className="bg-gradient-to-r from-slate-600 to-slate-700  text-white p-4 shadow-xl rounded-lg  gap-x-3 flex items-center justify-between w-[80vw] md:w-[18vw]">
                        {/* Profil Resmi ve Kullanıcı Adı */}
                        <div className="flex items-center  gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                                {user.profilePicture ? (
                                    <img
                                        src={`https://mern-stack-server-czfb.onrender.com/${user.profilePicture}`}
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <GiPlagueDoctorProfile className='w-1/2 h-full rounded-full mx-auto my-auto object-cover text-lg text-slate-800' />
                                )}
                            </div>

                            {/* Kullanıcı Adı */}
                            <h3 className="text-sm font-semibold">{user.username}</h3>
                        </div>

                        {/* Ziyaret Et Butonu */}
                        <button className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-2 rounded-md text-xs"> <NavLink to={`/user/${user._id}`} className="p-2 rounded-lg text-white text-nowrap w-full md:w-[33vw] text-sm shadow-lg">
                            Ziyaret
                        </NavLink></button>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default ZiyaretEt;
