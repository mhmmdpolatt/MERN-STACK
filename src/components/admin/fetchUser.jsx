import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserRoleMutation } from '../../store/apis/adminApi';
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const FetchUser = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const currentUser = useSelector((state) => state.auth.user)

  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className='bg-red-600 text-white p-2 '>Error: YETKİİZ İŞLEM LÜTFEN GİRİŞ EKRANINA DÖNÜN</div>;
 

  // Kullanıcıları filtreleme
  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //KULLANICI SİLME
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      refetch();
      alert("KULLANICI SİLİNDİ")
    } catch (error) {
      console.log("SİLME HATASI", error);
      alert("KULLANICI SİLİNEMEDİ");
    }

  }

  const handleMakeAdmin = async (userId) => {
    try {
      await updateUserRole(userId).unwrap();
      alert("KULLANICI ROLÜ GÜNCELLENDİ");
      refetch();
    } catch (error) {

    }
  }


  return (
    <div className="p-6">
      {currentUser.role === "admin" || currentUser.role === "yönetici" ? <div><h1 className="text-2xl font-semibold text-gray-800 mb-4">Kullanıcılar</h1>

        {/* Arama Inputu */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Kullanıcı adı veya e-posta ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Responsive Tablo */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow sm:max-w-[90%] w-full mx-auto overflow-x-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Profil Resmi</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Kullanıcı Adı</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">E-posta</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Katılma Tarihi</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">Rol</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {user.profilePicture ? (<img
                        src={`https://myblog-md-e9c7810a4c96.herokuapp.com/${user.profilePicture}`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover shadow-2xl"
                      />) : (
                        <div className='rounded-full shadow-2xl shadow-black text-2xl text-gray-500 bg-white w-12 h-12 flex justify-center items-center'>
                          <GiPlagueDoctorProfile />
                        </div>
                      )}

                    </td>
                    <td className="px-4 py-2 border-b">{user.username}</td>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b">{user.role}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-2 mx-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none mb-2"
                      >
                        Sil
                      </button>
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className={`px-4 py-2 text-white rounded-lg focus:outline-none ${user.role === 'admin' || user.role === "yönetici" ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                          }`}
                      >
                        {user.role == 'admin' || user.role == 'yönetici' ? 'Yöneticilikten Çıkar' : 'Yönetici Yap'}
                      </button>
                      <button
                        
                        className="px-4 mx-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
                      >
                        <NavLink to={`/user/${user._id}`}>Profile Git</NavLink>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                    Aramanıza uygun kullanıcı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div></div> : <h1>YETKİSİZ İŞLEM </h1>}

    </div>
  );
};

export default FetchUser;
