import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFollowUserMutation, useGetUserByIdQuery } from '../../store/apis/userApi';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useArchiveBlogMutation, useDeleteBlogMutation,useAllBlogQuery } from '../../store/apis/blogApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ComplaintFormUser from '../Complaint/ComplaintForUser';
import { GiPlagueDoctorProfile } from "react-icons/gi";



const Profile = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetUserByIdQuery(id);
  const [deleteBlog] = useDeleteBlogMutation();
  const [archiveBlog] = useArchiveBlogMutation();
  const [followUser, { isLoading: isLoadingFollower }] = useFollowUserMutation(); //MUTASYYON ENDPOİNTLERDE REFETCH KULLANILMAZ
  const [sikayetForm, setSikayetForm] = useState(false)
  const { data:allBlog, isLoading:load, isError } = useAllBlogQuery();
  const currentUser = useSelector((state) => state.auth.user)
  // console.log("CURRENTUSER", currentUser)
  console.log("BEĞENDİĞİ", data);
  console.log("TÜM BLOGLAR",allBlog);
  

  const [isVisit, setisVisit] = useState(false)

  // console.log("TAKİPEDİLENLER  ",currentUser.following);


  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durumu
  const [modalType, setModalType] = useState(''); // 'followers' veya 'following'

  const handleModalOpen = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Önce modalı kapat
    setTimeout(() => {
      window.location.reload(); // Modal kapandıktan sonra sayfayı yenile
    }, 300); // 300ms bekleme süresi (isteğe bağlı olarak ayarlanabilir)
  };



  // Bağımlılıkları burada doğru şekilde belirtin
  useEffect(() => {

    if (currentUser) {
      if (currentUser._id == id) {
        setisVisit(false);
        console.log("isVisit", isVisit);

      } else {
        setisVisit(true)
        console.log("isVisit", isVisit);
      }
    } else {
      setisVisit(true)
      console.log("Kullanıcı Girişi Olmamış");

    }
  }, [isVisit])




  // if (currentUser._id==id) {
  //     console.log("KENDİ SAYFANIZDASINI");

  // }else{
  //   console.log("BAŞKA SAYFADASINIZ",data);

  // }



  // State for selected tab
  const [selectedTab, setSelectedTab] = useState('active'); // Default: 'active'

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div className="text-center">Error loading profile!</div>;
  }

  const handleDelete = async (blogid) => {
    try {
      await deleteBlog(blogid).unwrap();
      alert("BLOG BAŞARIYLA SİLİNDİ");
      window.location.reload();
    } catch (error) {
      console.log("Blog Silinirken Hata", error);
      alert("BLOG SİLİNEMEDİ HATA");
    }
  };

  const handleArchive = async (blogid) => {
    try {
      await archiveBlog(blogid).unwrap();
      alert("Blog Arşive Taşındı");
      window.location.reload();
    } catch (error) {
      console.log("Arşive Hatası", error);
      alert("Arşive Alınamadı");
    }
  };

  // Get blogs based on the selected tab
  const getFilteredBlogs = () => {
    if (!data.blogs) return [];
    if (selectedTab === 'active') {
      return data.blogs.filter((blog) => !blog.isArchive);
    } else if (selectedTab === 'archived') {
      return data.blogs.filter((blog) => blog.isArchive);
    } else if (selectedTab === 'liked') {
      return data.likes || []; // Assuming `likedBlogs` exists in the user data
    }
    return [];
  };

  const handleFollow = async (id) => {
    try {
      const response = await followUser(id).unwrap(); // Takip isteği gönder
      refetch();
      // alert(response.message); // Başarı mesajını göster



      // Opsiyonel: Kullanıcının "isFollowing" durumunu güncellemek için bir state kullanabilirsiniz.
    } catch (error) {
      console.error('Takip işlemi sırasında hata:', error);
      alert(error.data?.message || 'Takip işlemi başarısız.');
    }

  }



  return (
    <>

      {/* Profil Header */}
      <div className="flex flex-col items-center text-center p-6">
        {/* Profil Fotoğrafı */}
        <div className="w-[150px] h-[150px] bg-slate-500 rounded-full bg-none mb-4 flex justify-center items-center">
          {data.profilePicture ? (
            <img
              src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${data.profilePicture}`}
              alt="Profile"
              className="w-full h-full object-cover rounded-full "
            />
          ) : (
            <FaUser className="text-4xl text-slate-700" />
          )}
        </div>

        {/* Kullanıcı Adı */}
        <h1 className="text-lg md:text-3xl font-bold text-[#332f2c]">{data.username}</h1>

        {/* Gönderi, Takipçiler ve Takip Edilen Bilgileri */}
        <div className="flex space-x-8 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-sm md:text-lg font-semibold text-slate-700">Gönderiler</span>
            <span className="text-xl font-bold text-slate-700">{data.blogs ? data.blogs.length : 0}</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => handleModalOpen('followers')}>
            <span className="text-sm md:text-lg font-semibold text-slate-700">Takipçiler</span>
            <span className="text-xl font-bold text-slate-700">{data.followers ? data.followers.length : 0}</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => handleModalOpen('following')}>
            <span className="text-sm md:text-lg font-semibold text-slate-700">Takip Edilen</span>
            <span className="text-xl font-bold text-slate-700">{data.following ? data.following.length : 0}</span>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-6 rounded-lg shadow-lg w-[90%] md:w-[30%] max-h-[80%] overflow-y-auto text-gray-300">
              <h2 className="text-2xl text-gray-300 font-bold mb-4">
                {modalType === 'followers' ? 'Takipçiler' : 'Takip Edilenler'}
              </h2>
              <ul>
                {(modalType === 'followers' ? data.followers : data.following).map((user) => (
                  <li key={user._id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      {user.profilePicture ? <img
                        src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${user.profilePicture || 'default.png'}`}
                        alt={user.username}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      /> : <GiPlagueDoctorProfile className='w-10 h-10 rounded-full mr-3 object-cover' />}

                      <span>{user.username}</span>
                    </div>
                    <Link
                      to={`/user/${user._id}`}
                      className="text-blue-500 hover:underline text-sm"
                      onClick={handleModalClose}

                    >
                      Profile Git
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleModalClose}
                className="bg-gradient-to-r from-slate-600 to-slate-700 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Kapat
              </button>
            </div>
          </div>
        )}

        {/* Profil Güncelle Butonu */}


        <div className="mt-6">
          {isVisit ? (

            // Eğer currentUser varsa, takip et işlemi yapılabilir
            currentUser ? (
              <>
                <button
                  onClick={() => handleFollow(id)}
                  disabled={isLoadingFollower}
                  className="px-6 py-2 text-white bg-gradient-to-r from-slate-600 to-slate-700 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-800 rounded-lg font-semibold"
                >
                  {currentUser && data.followers.some(follower => follower._id === currentUser._id)
                    ? "Takip Ediyorsun"
                    : "Takip Et"}

                </button> <br />
                <button onClick={() => setSikayetForm(!sikayetForm)}>
                  Şikayet Et
                </button>
                {
                  sikayetForm ? (<ComplaintFormUser sikayetForm={sikayetForm} setSikayetForm={setSikayetForm} userID={data._id} />) : (null)
                }

              </>

            ) : (
              // Kullanıcı giriş yapmamışsa, giriş yapması gerektiğini belirten bir mesaj veya buton
              <Link
                to="/login" // Giriş sayfasına yönlendirme
                className="px-6 py-2 text-white bg-gray-600 hover:bg-purple-700 rounded-lg font-semibold"
              >
                Takip Et
              </Link>
            )
          ) : (
            <Link
              to={`/profile/edit/${data._id}`}
              className="px-6 py-2 text-white mt-8 p-6 bg-gradient-to-r from-slate-600 to-slate-800 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Profilimi Güncelle
            </Link>
          )}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-slate-600 to-slate-800 w-full md:w-1/2 align-middle rounded-lg text-left shadow-md">
          <h2 className="text-xl font-normal md:font-semibold text-gray-100 ">Hakkında</h2>
          <p className="mt-2 text-gray-100">{data.bio || 'Kullanıcı hakkında herhangi bir bilgi bulunmamaktadır.'}</p>
        </div>



        {/* Tabs */}
        <div className="flex  w-full text-nowrap bg-gray-200 md:bg-none justify-center items-center mt-8 gap-3 p-0 md:p-0">
          <button
            className={`px-6 py-2 font-medium md:font-semibold  rounded-t-lg ${selectedTab === 'active' ? 'bg-gray-600 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setSelectedTab('active')}
          >
            Aktif Bloglar
          </button>
          <button
            className={`${isVisit ? "hidden" : ""} px-6 py-2 font-medium md:font-semibold  rounded-t-lg ${selectedTab === 'archived' ? 'bg-gray-600 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setSelectedTab('archived')}
          >
            Arşivlerim
          </button>
          <button
            className={`px-6 py-2 font-medium md:font-semibold rounded-t-lg ${selectedTab === 'liked' ? 'bg-gray-600 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setSelectedTab('liked')}
          >
            Beğendiklerim
          </button>
        </div>

        {/* Blog List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {selectedTab === 'active'
              ? 'Aktif Bloglar'
              : selectedTab === 'archived'
                ? 'Arşivlerim'
                : 'Beğendiklerim'}
          </h2>
          {getFilteredBlogs().length > 0 ? (
            <div className="flex justify-center items-center flex-wrap gap-8">
              {getFilteredBlogs().map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 w-[85vw] md:w-[25vw]"
                >
                  <img
                    src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-normal text-gray-800 text-wrap h-[5vh] m-4">
                      <Link to={`/blog/${blog._id}`} className="hover:text-purple-600">
                        {blog.title}
                      </Link>
                    </h3>
                    {/* <p className="hidden md:block text-gray-700 text-sm text-left mt-5"
                      dangerouslySetInnerHTML={{
                        __html: blog.content.length > 100
                          ? blog.content.slice(0, 50) + '...'
                          : blog.content
                      }} /> */}
                  </div>
                  {selectedTab !== 'liked' && (
                    <div className="flex justify-end p-2">
                      <button
                        className="bg-slate-800 text-white p-2 mr-3 rounded-xl"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Kaldır
                      </button>
                      {selectedTab === 'active' && (
                        <button
                          className="bg-slate-800 text-white p-2 mr-3 rounded-xl"
                          onClick={() => handleArchive(blog._id)}
                        >
                          Arşivle
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">Hiç blog bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </>

  );
};

export default Profile;
