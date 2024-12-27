import React from 'react'
import { useRegisterUserMutation } from '../../store/apis/userApi'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { BLog } from "../../assets/blogging-backdrop-with-laptop-msaf9d67o4r5dl74.jpg";
// import '../../user.css';
const UserRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData).unwrap();
            alert('Kayıt başarılı');
            navigate('/login'); // Başarılı kayıt sonrası yönlendirme
        } catch (error) {
            console.error('Hata:', error);
            alert('Kayıt işlemi sırasında hata oluştu');
        }
    };
    return (
        <>
            <div style={{
                backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.8), /* İlk renk ve opaklık */
        rgba(0, 0, 0, 0.8) /* İkinci renk ve opaklık */
    ),url("https://wallpapers.com/images/hd/blogging-backdrop-with-laptop-msaf9d67o4r5dl74.jpg")`, // Resim URL'sini buraya ekleyin
            }} className="flex flex-col md:flex md:flex-row h-screen bg-gray-100 mt-4 ">
                {/* Sol taraf: Resim + Karartma */}
                <div className="relative w-1/2 h-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                    // style={{
                    //     backgroundImage: `url("https://wallpapers.com/images/hd/blogging-backdrop-with-laptop-msaf9d67o4r5dl74.jpg")`, // Resim URL'sini buraya ekleyin
                    // }}
                    ></div>
                    {/* Karartma katmanı */}


                    {/* Tanıtım Yazısı */}
                    <div className="hidden  absolute inset-0 md:flex justify-center items-center text-center">
                        <div className="text-white p-4 border-b-2 ms-14">
                            <h2 className="text-3xl font-extrabold mb-2">MYB'LOGA Hoş Geldiniz!</h2>
                            <p className="text-lg font-bold">
                                Kendi blogunuzu oluşturun ve eşsiz içeriklerle dolu bir dünya keşfedin.
                                Binlerce yazıya ulaşarak ilham alın, deneyimlerinizi paylaşın!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sağ taraf: Form */}
                <div className="w-full  mb-[75%] md:w-1/2 flex justify-center items-center">
                    <form
                        className="flex flex-col justify-center items-start md: bg-gradient-to-r from-slate-700 to-slate-950 opacity-90 shadow-2xl w-96 p-6 rounded-lg  gap-4  md:absolute right-16 top-1/2 -translate-y-1/4"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-white text-center mx-auto my-6 border-b text-2xl font-semibold">HESAP OLUŞTUR</h1>


                        <div className="flex justify-between items-center w-full">
                            <label className="w-24 text-[#e0e0e0] font-semibold">Kullanıcı Adı:</label>
                            <input
                                className="w-3/5 p-2 rounded-lg border border-white   bg-gradient-to-r from-slate-700 to-slate-950 text-white placeholder-[#d3c4c4] focus:outline-none focus:ring-2 focus:ring-[#b08875]"
                                type="text"
                                name="username"
                                placeholder="Kullanıcı adınızı girin"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <label className="w-24 text-[#e0e0e0] font-semibold">Email:</label>
                            <input
                                className="w-3/5 p-2 rounded-lg border border-white   bg-gradient-to-r from-slate-700 to-slate-950 text-white placeholder-[#d3c4c4] focus:outline-none focus:ring-2 focus:ring-[#b08875]"
                                type="email"
                                name="email"
                                placeholder="Email adresinizi girin"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <label className="w-24 text-[#e0e0e0] font-semibold">Şifre:</label>
                            <input
                                className="w-3/5 p-2 rounded-lg border border-white  bg-gradient-to-r from-slate-700 to-slate-950 text-white placeholder-[#d3c4c4] focus:outline-none focus:ring-2 focus:ring-[#b08875]"
                                type="password"
                                name="password"
                                placeholder="Şifrenizi girin"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <span className='text-white'>Hesabınız Zaten Var mı <a href="/login" className='underline'> Giriş Yap</a></span>

                        <button
                            type="submit"
                            className="w-full mt-4 p-2 rounded-lg font-semibold text-white  bg-gradient-to-r from-slate-700 to-slate-950  transition duration-200 ease-in-out shadow-white shadow-sm hover:bg-slate-100"
                        >
                            Kayıt Ol
                        </button>
                    </form>
                </div>
            </div>



        </>
    )
}

export default UserRegister