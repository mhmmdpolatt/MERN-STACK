import React from 'react'
import { useLoginUserMutation } from '../../store/apis/userApi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginUser, { isLoading, error }] = useLoginUserMutation(); // RTK Query hook'u kullanılıyor
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData).unwrap(); // .unwrap() hata yönetimini sağlar
            console.log("Login başarılı",);
            setMessage(response.msg);
            console.log("HATA MESAJI", response.msg);


            // Başarılı login sonrası Redux store'a user ve token'ı dispatch ediyoruz
            dispatch(setCredentials({ user: response.user, token: response.token }));
            alert('Login başarılı! Hoşgeldiniz.');

            // Başarılı giriş sonrası anasayfaya yönlendirme
            navigate('/'); // '/' anasayfa URL'si, burada değiştirebilirsiniz


            // Başarılı giriş sonrası gerekli işlemleri yapabilirsiniz
        } catch (err) {
            console.error("Login başarısız:", err);
            setMessage(err.data.msg)
            // Hata mesajı gösterme
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (



        <>
            <div style={{
                backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.8), /* İlk renk ve opaklık */
        rgba(0, 0, 0, 0.8) /* İkinci renk ve opaklık */
    ),url("https://wallpapers.com/images/hd/blogging-backdrop-with-laptop-msaf9d67o4r5dl74.jpg")`, // Resim URL'sini buraya ekleyin
            }} className="flex flex-col md:flex md:flex-row h-screen bg-gray-100 mt-1">
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
                            <h2 className="text-3xl font-extrabold mb-2">MYB'LOGA  Hoş Geldiniz!</h2>
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
                        className="flex flex-col justify-center items-start  md: bg-gradient-to-r from-slate-700 to-slate-950  w-96 p-6 rounded-lg shadow-lg gap-4 md:absolute right-16 top-1/2"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-white text-center mx-auto my-6 border-b text-2xl font-semibold">GİRİŞ YAP</h1>




                        <div className="flex justify-between items-center w-full">
                            <label className="w-24 text-[#e0e0e0] font-semibold">Email:</label>
                            <input
                                className="w-3/5 p-2 rounded-lg border border-[#774a3a] bg-[#3e2c29] text-white placeholder-[#d3c4c4] focus:outline-none focus:ring-2 focus:ring-[#b08875]"
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
                                className="w-3/5 p-2 rounded-lg border border-[#774a3a] bg-[#3e2c29] text-white placeholder-[#d3c4c4] focus:outline-none focus:ring-2 focus:ring-[#b08875]"
                                type="password"
                                name="password"
                                placeholder="Şifrenizi girin"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <span className='text-white'>Hesabınız Yok Mu <a href="/register" className='underline'> Kayıt Oluştur</a></span>
                        <button
                            type="submit"
                            className="w-full mt-4 p-2 rounded-lg font-semibold text-white bg-[#774a3a] hover:bg-[#5e3f34] transition duration-200 ease-in-out"
                        >
                            Giriş Yap
                        </button>
                        {message ? (
                            <p className='text-red-500 font-semibold  p-[1.5px] rounded-sm'>{message}</p>
                        ) : (
                            ""
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLogin