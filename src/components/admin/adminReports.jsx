import React from 'react';
import { useComplaintExamineMutation, useComplaintRejectedMutation, useComplaintResolvedMutation, useDeleteCompliantMutation, useFetchComplaintQuery } from '../../store/apis/adminApi';
import { useState } from 'react';
const AdminReports = () => {
    const { data: complaints, isLoading, error, refetch } = useFetchComplaintQuery();
    const [complaintResolved, { isLoading: load, error: err }] = useComplaintResolvedMutation();
    const [complaintRejected] = useComplaintRejectedMutation();
    const [complaintExamine] = useComplaintExamineMutation();
    const [deleteCompliant] = useDeleteCompliantMutation();
    // console.log("ŞİKAYETLER İÇN İLK ELEMAN", complaints[0]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(''); // Durum filtresi
    const statusFilteredComplaints = complaints?.filter((complaint) => {
        if (!statusFilter) return true; // Filtresiz durumda tümünü göster
        if (statusFilter == "Beklemede") return complaint.status === "Beklemede"
        if (statusFilter == "İnceleniyor") return complaint.status === "İnceleniyor"
        if (statusFilter == "Çözüldü") return complaint.status === "Çözüldü,Şikayet Edilen kaldırılmalı"
        if (statusFilter == "Reddedildi") return complaint.status === "Şikayet Geçersiz"



    });
    //ŞİKAYETLERİ FİLTRELEME 
    const searchFilteredComplaints = complaints?.filter((complaint) =>
        complaint.reportedBlogs?._id.includes(searchTerm) ||
        complaint.reportedComments?._id.includes(searchTerm) ||
        complaint.reportedUsers?.username.includes(searchTerm)||
        complaint.user?.username.includes(searchTerm)
    );

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>Hata oluştu: {error.message}</div>;
    }

    const handleResolved = async (id) => {
        try {
            const response = await complaintResolved(id).unwrap();
            alert(response.msg);
            refetch();
        } catch (error) {
            alert(response.msg);
        }
    }

    const handleRejected = async (id) => {
        try {
            const response = await complaintRejected(id).unwrap();
            alert(response.msg)
            refetch()
        } catch (error) {
            alert(response.msg);
        }
    }

    const handleExamine = async (id) => {
        try {
            const response = await complaintExamine(id).unwrap();
            alert(response.msg)
            refetch();
        } catch (error) {
            alert(error);
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await deleteCompliant(id).unwrap();
            alert(response.msg)
            refetch()

        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="p-4">
            {/* ARAMA İNPUTU */}
            <div className="flex gap-4 mt-3 mb-3">
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    type="text"
                    placeholder="ID veya Kullanıcı Adına Göre Filtreleme"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Tüm Durumlar</option>
                    <option value="Beklemede">Beklemede</option>
                    <option value="İnceleniyor">İnceleniyor</option>
                    <option value="Çözüldü">Çözüldü</option>
                    <option value="Reddedildi">Reddedildi</option>
                </select>
            </div>
            <h1 className="text-2xl font-bold mb-4">Şikayetler</h1>
            <p>
                {searchTerm
                    ? `${searchFilteredComplaints?.length || 0} Sonuç (Arama)`
                    : statusFilter
                        ? `${statusFilteredComplaints?.length || 0} Sonuç (Durum Filtresi)`
                        : `${complaints?.length || 0} Sonuç (Tümü)`}
            </p>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Şikayet ID</th>
                        <th className="border px-4 py-2">Başlık</th>
                        <th className='border px-4 py-2'>Açıklama</th>
                        <th className="border px-4 py-2">Şikayet Edilen</th>
                        <th className='border px-4 py-2'>Şikayet Edilen Id</th>
                        <th className="border px-4 py-2">Şikayet Eden</th>
                        <th className="border px-4 py-2">Tarih</th>
                        <th className="border px-4 py-2">Durum</th>
                        <th className="border px-4 py-2">Aksiyonlar</th>
                    </tr>
                </thead>
                <tbody>
                    {(searchTerm
                        ? searchFilteredComplaints
                        : statusFilter
                            ? statusFilteredComplaints
                            : complaints
                    )?.map((complaint) => (
                        <tr key={complaint._id} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{complaint._id}</td>
                            <td className="border px-4 py-2">{complaint.title || 'Belirtilmemiş'}</td>
                            <td className='border px-4 py-2'>{complaint.description}</td>
                            <td className="border px-4 py-2">
                                {complaint.reportedBlogs ? (
                                    `Blog: ${complaint.reportedBlogs.title}`
                                ) : complaint.reportedComments ? (
                                    `Yorum: ${complaint.reportedComments.content}  Bulunduğu Gönderi: ${complaint.reportedComments.blog}`
                                ) : complaint.reportedUsers ? (
                                    `Kullanıcı: ${complaint.reportedUsers.username}`
                                ) : (
                                    'Bilinmiyor'
                                )}
                            </td>
                            <td className='border px-4 py-2'>
                                {complaint.reportedBlogs ? (
                                    `Blog: ${complaint.reportedBlogs._id}`
                                ) : complaint.reportedComments ? (
                                    `Yorum: ${complaint.reportedComments._id}`
                                ) : complaint.reportedUsers ? (
                                    `Kullanıcı: ${complaint.reportedUsers._id}`
                                ) : (
                                    'Bilinmiyor'
                                )}
                            </td>
                            <td className="border px-4 py-2">{complaint.user?.username || 'Anonim'}</td>
                            <td className="border px-4 py-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{complaint.status || 'Beklemede'}</td>
                            <td className="border px-4 py-2 flex flex-col justify-center items-center
                             gap-y-1">
                                <button onClick={() => handleExamine(complaint._id)} className="bg-blue-500 text-white px-2 py-1 rounded  text-nowrap w-full">{

                                    complaint.reportedBlogs ? (<a href={`/blog/${complaint.reportedBlogs._id}`}>Gönderiyi İncele</a>) :
                                        complaint.reportedComments ? (<a href={`/blog/${complaint.reportedComments.blog}`}>Yorumu İncele</a>) :
                                            complaint.reportedUsers ? (<a href={`/user/${complaint.reportedUsers._id}`}>Kullanıcıyı İncele</a>) : (null)

                                }</button>
                                <button className={`bg-green-500 text-white px-2 py-1 rounded  w-full ${load ? "bg-black" : ""}`} onClick={() => handleResolved(complaint._id)} disabled={load}>Onayla</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded w-full" onClick={() => handleRejected(complaint._id)}>Reddet</button>
                                <button className='bg-red-700 text-white px-2 py-1 rounded w-full' onClick={() => handleDelete(complaint._id)}>Kaldır</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default AdminReports;
