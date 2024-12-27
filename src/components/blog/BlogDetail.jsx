import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import blogApi, { useGetBlogByIdQuery, useLikeAddMutation, useAddCommentMutation } from '../../store/apis/blogApi';
import { MdFavoriteBorder, MdFavorite, MdMoreVert } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { GiPlagueDoctorProfile } from "react-icons/gi";

import { FaRegComment } from "react-icons/fa";

import { useSelector } from 'react-redux';
import { useDeleteBlogMutation, useDeleteCommentMutation } from '../../store/apis/adminApi';
import ComplaintForm from '../Complaint/ComplaintForm';
import ComplaintForComment from "../Complaint/ComplaintForComment";
import CustomCodeBlock from './CustomCodeBlock';


const BlogDetail = () => {

  const currentUser = useSelector((state) => state.auth.user)

  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetBlogByIdQuery(id); // Blog verisini alıyoruz
  const [likeAdd, { isLoading: isLoadingLike }] = useLikeAddMutation(); // Beğeni mutation'ını kullanıyoruz
  const [deleteBlog] = useDeleteBlogMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [addComment, { isLoading: loading, error: err }] = useAddCommentMutation();
  const [alreadyLiked, setAlreadyLiked] = useState(true); // Beğeni durumunu tutacak state
  const [likeList, setLikeList] = useState(false);
  const [sikayetFormuGetir, setSikayetFormuGetir] = useState(false);
  const [sikayetYorum, setSikayetYorum] = useState(false)




  const [showModal, setShowModal] = useState(false);
  const [showModalForComment, setShowModalForComment] = useState(false)

  console.log("CURRENTUSER", currentUser);
  console.log("DATA", data)




  const handleIconClick = () => {
    setShowModal(!showModal); // Modalı aç/kapat
  };

  const handleIconClickForComment = () => {
    setShowModalForComment(!showModalForComment)
    console.log("showModalForComment", showModalForComment);

  }



  // Backend'den gelen veriyi kullanarak 'alreadyLiked' bilgisini set ediyoruz
  useEffect(() => {
    if (data) {
      const userId = localStorage.getItem('userId'); // Kullanıcı ID'sini localStorage'dan alıyoruz
      setAlreadyLiked(data.likes.includes(userId)); // Eğer kullanıcı beğenmişse, 'alreadyLiked' true olacak
    }
  }, [data]);
  const begenen = data?.likes?.filter(b => b._id === currentUser?._id)
  console.log("BEĞENEN", begenen);








  const handleLike = async (id) => {
    try {
      await likeAdd(id).unwrap(); // Like işlemine ID gönder
      setAlreadyLiked(!alreadyLiked); // Beğeni durumunu tersine çeviriyoruz
      refetch();
    } catch (err) {
      console.error("Beğeni işlemi başarısız:", err);
    }
  };

  const viewLike = () => {
    setLikeList(true);
    console.log(likeList, "likeList");
    console.log("beğenlisteiçinblog", data);


  }




  const [commentContent, setCommentContent] = useState(""); // Yorum içeriği için state

  const handleChange = (e) => {
    setCommentContent(e.target.value); // Textarea'dan gelen değeri state'e set et
  };
  useEffect(() => {
    console.log("En son Yorum içeriği:", commentContent);
    // console.log("yorumlar", data.comment);
  }, [commentContent]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Yorum boş olamaz kontrolü
    if (!commentContent.trim()) {
      alert("Yorum içeriği boş olamaz.");
      return;
    }

    try {
      // Yorum ekleme mutasyonu
      await addComment({ id, commentContent }).unwrap();
      alert("Yorum başarıyla eklendi!");
      setCommentContent("");
      refetch();
      // Yorum ekledikten sonra input'u temizliyoruz
    } catch (err) {
      console.error("Yorum ekleme hatası:", err);
      alert("Yorum eklenemedi. Lütfen tekrar deneyin.");
    }
  };

  //ADMİN BLOG KALDIRMA
  const handleDelete = async (blogID) => {

    try {
      await deleteBlog(blogID).unwrap();
      alert("BLOG BAŞARIYLA SİLİNDİ")
      refetch();
    } catch (error) {
      alert("BLOG KALDIRAMADI");
      console.log("BLOG SİLME HATAsI", error);

    }

  }
  //ADMİN YORUM KALDIRMA

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      alert("YORUM SİLİNDİ");
      refetch();
    } catch (error) {
      console.log("BLOG SİLME HATAsI", error);
    }
  }


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blog details!</div>;
  }

  return (
    <>
      <div>
        {data ? (<><div className="min-h-screen bg-gray-100  py-4">
          <div className="relative w-full max-w-4xl mx-auto bg-slate-700 md:bg-white shadow-lg md:rounded-lg p-2 md:p-8">
            <h2 className="sticky md:block text-xl md:bg-none md:text-3xl p-2 rounded-2xl font-bold text-white md:text-gray-800 mb-6">
              {data.title}
            </h2>

            {/* Blog Resmi */}
            {data.image && (
              <img
                src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${data.image}`}
                alt={data.title}
                className="w-auto h-64 object-cover mb-6" />
            )}

            {/* Kullanıcı İsmi ve Tarih */}
            <p className="text-sm text-white md:text-gray-600 mb-4">
              <span className="font-semibold">Yazar:</span>{' '}
              <a href={`/user/${data.user._id}`}>{data.user?.username || 'Bilinmiyor'}</a>
            </p>
            <p className="text-sm text-white md:text-gray-600 mb-6">
              <span className="font-semibold">Tarih:</span>{' '}
              {new Date(data.createdAt).toLocaleDateString('tr-TR') || 'Bilinmiyor'}
            </p>

            {/* İçerik */}
            <div className="bg-white shadow-2xl md:bg-none md:shadow-none p-4 md:p-0 text-gray-700 text-base md:text-m text-wrap rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <CustomCodeBlock value={data.content} />

            {/* Kategoriler */}
            <div className="mt-6">
              <div className='flex items-center gap-2'>
              <span className="text-gray-500 text-sm font-semibold">Kategoriler:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {Array.isArray(data.categories) && data.categories.length > 0 ? (
                  data.categories.map((category, index) => (
                    <li
                      key={index}
                      className="bg-gray-400 text-xs text-white py-1 px-2 rounded-full"
                    >
                      {category.name}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-xs">Kategori bulunamadı</li>
                )}
              </ul>
              </div>
              
              <div className='absolute  bottom-12 ikon flex items-center gap-x-4 text-lg md:text-3xl mt-4 text-white font-light md:text-slate-800'>
                <FaShareAlt/>
                <AiFillInstagram/>
                <IoLogoWhatsapp/>
                <FaSquareXTwitter/>
              </div>
            </div>

            {/* Like ve Comment Sayıları */}
            <div className="flex gap-1 justify-end mt-4">
              {/* Beğeni Butonu */}
              <button
                onClick={() => handleLike(data._id)} // Blog ID'sini handleLike'a gönder
                disabled={isLoadingLike}
                className={`flex items-center gap-2 text-white md:text-gray-800 p-2  ${begenen.length > 0 ? " border-red-400" : "hover:bg-gray-100 border-gray-300"}`}
              >
                {begenen.length > 0 ? (
                  <MdFavorite className="text-3xl text-gradient-to-r from-slate-600 to-slate-800" />
                ) : (
                  <MdFavoriteBorder className="text-3xl hover:text-red-600" />
                )}


              </button>
              <button onClick={() => viewLike()}>
                <span className="text-sm text-white md:text-slate-800 font-medium hover:underline">{data.likes.length}</span>
              </button>

              {/* Yorum Butonu */}
              <button
                className="flex items-center gap-2 text-white md:text-gray-800 p-2  hover:bg-gray-100 border-gray-300"
              >
                <FaRegComment className="text-2xl hover:text-blue-600" />
                <span className="text-sm font-medium">{data.comment.length}</span>
              </button>

              {/* ŞİKAYET */}
              <div>
                <div className='hover:scale-150' onClick={handleIconClick}>
                  <MdMoreVert className='text-white md:text-black cursor-pointer hover:scale-105' />
                </div>

                {showModal ? (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-64 p-4 rounded-lg shadow-lg">
                      <p onClick={handleIconClick} className="relative left-0 top-0 text-red-600 font-extrabold cursor-pointer">X</p>
                      <button onClick={() => setSikayetFormuGetir(!sikayetFormuGetir)}>
                        <p className="text-gray-700 text-center">Şikayet Et</p>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* ŞİKAYET FORMUNUN GETİRİLMESİ */}
              {sikayetFormuGetir ? (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
                  <ComplaintForm setSikayetFormuGetir={setSikayetFormuGetir} sikayetFormuGetir={sikayetFormuGetir} blogID={data._id} />
                </div>
              ) : null}




              {/* ADMİN İÇİN BLOG KALDIRMA */}
              {currentUser && currentUser.role === "admin" ? (<button
                className="flex items-center gap-2 bg-red-600 text-white md:text-white p-2  hover:bg-red-900 border-gray-300"
                onClick={() => handleDelete(data._id)}
              >
                Bloğu kaldır
              </button>) : (null)}

            </div>

          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md w-full md:w-1/2 m-auto pt-3 mt-8">
            <label
              htmlFor="commentContent"
              className="block text-lg font-semibold text-gray-700 mb-2 "
            >
              Fikrini Belirt
            </label>
            <textarea
              id="commentContent"
              name="commentContent"
              value={commentContent}
              onChange={handleChange}
              placeholder="Yorumunuzu buraya yazın..."
              rows="5"
              className="resize-none p-3 w-full border pt-3 border-white rounded-lg focus:outline-none mb-4" />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
            >
              {isLoading ? "Yorum Gönderiliyor..." : "Yorum Gönder"}
            </button>

            {err && <p className="text-red-500 mt-2 text-center">{err.message}</p>}
          </form>
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">YORUMLAR</h1>

            {/* YORUMLAR */}

            <div className="md:space-y-4 md:mb-6 w-[100%] bg-gray-100">
              {data && data.comment && data.comment.length > 0 ? (
                data.comment.map((comment) => (
                  <div key={comment._id} className="bg-gray-100 p-2 md:p-4 md:rounded-lg shadow-sm border-b border-black md:border-none">
                    <div className="flex items-center gap-2 mb-2">
                    <div className='flex justify-start items-center p-1'>
                     {comment.user.profilePicture ?<img
                                             src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${comment.user.profilePicture || 'default.png'}`}
                                             alt={comment.user.profilePicture}
                                             className="w-10 h-10 rounded-full mr-3 object-cover"
                                           /> : <GiPlagueDoctorProfile className='w-10 h-10 rounded-full mr-3 object-cover'/> }
                       
                        </div>
                      <span className="text-gray-700 font-semibold">{comment.user?.username}</span>
                      <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 text-lg">{comment.content}</p>
                    {currentUser && currentUser.role === "admin" ? <button onClick={() => { handleDeleteComment(comment._id) }} className='ml-[80%] bg-red-600 text-white p-1 rounded-md' >Yorumu Kaldır</button> : null}
                    <div onClick={handleIconClickForComment}>
                      <MdMoreVert className='text-black md:text-black cursor-pointer' />
                    </div>
                    {showModalForComment ? (
                      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white w-64 p-4 rounded-lg shadow-lg">
                          <p onClick={handleIconClickForComment} className="relative left-0 top-0 text-red-600 font-extrabold cursor-pointer">X</p>
                          <button onClick={() => setSikayetYorum(!sikayetYorum)}>
                            <p className="text-gray-700 text-center">Şikayet Et</p>
                          </button>
                        </div>
                      </div>
                    ) : null}
                    {sikayetYorum ? (<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
                      <ComplaintForComment setSikayetYorum={setSikayetYorum} sikayetYorum={sikayetYorum} commentID={comment._id} setShowModalForComment={setShowModalForComment} showModal={showModalForComment} />
                    </div>) : (null)}
                  </div>

                ))

              ) : (
                <p className="text-gray-500">Henüz yorum yapılmamış.</p>
              )}
            </div>


            {/* //BEĞENİ LİSTELEME */}

            {likeList ? (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                {/* Modal İçeriği */}
                <div className="bg-gradient-to-r from-slate-600 to-slate-700  w-[90%] md:w-[30%] max-h-[80%] overflow-y-auto rounded-lg shadow-lg p-6">
                  {/* Başlık */}
                  <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-white">Beğenenler</h2>
                    <button
                      className="text-white hover:text-red-500 font-bold text-lg"
                      onClick={() => {
                        console.log("Çarpıya basıldı!");
                        setLikeList(false); // Modal kapatma
                        console.log("likeList değeri:", likeList);
                      }}
                    >
                      X
                    </button>
                  </div>
                  {/* Kullanıcılar */}
                  <div className="space-y-4">
                    {data.likes.map((like) => (
                      <div
                        key={like._id}
                        className="flex justify-around items-center   gap-x-4 shadow-sm hover:bg-gradient-to-r from-slate-600 to-slate-800 transition border-b-[0.2px] border-white"
                      >
                        <div className='flex justify-start items-center p-1'>
                     {like.profilePicture ?<img
                                             src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${like.profilePicture || 'default.png'}`}
                                             alt={like.username}
                                             className="w-10 h-10 rounded-full mr-3 object-cover"
                                           /> : <GiPlagueDoctorProfile className='w-10 h-10 rounded-full mr-3 object-cover'/> }
                          <h1 className="text-base md:text-lg font-medium text-white">{like.username}</h1>
                        </div>

                        <a className='p-2 rounded-lg text-white text-nowrap text-sm shadow-lg' href={`/user/${like._id}`}>Profili Gör</a>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            ) : (null)}





            {/* Yorum Eklemek İçin Form */}

          </div></>) : (<h1>BU BLOG SİLİNMİŞ VEYA ERİŞELMİYOR</h1>)}
      </div>



    </>
  );
};

export default BlogDetail;
