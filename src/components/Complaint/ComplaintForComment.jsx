import React, { useState } from 'react';
import { useComplaintForCommentMutation } from '../../store/apis/userApi';

function ComplaintForm({ onSubmit, setSikayetYorum, sikayetYorum, commentID }) {
    const [description, setDescription] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [error, setError] = useState('');
    const [complaintForComment] = useComplaintForCommentMutation();



    const complaintTypes = [
        { value: 'Spam', label: 'Spam' },
        { value: 'Yanıltıcı İçerik', label: 'Yanıltıcı İçerik' },
        { value: 'Taciz', label: 'Taciz' },
        { value: 'Uygunsuz Davranış', label: 'Uygunsuz Davranış' },
        { value: 'Diğer', label: 'Diğer' }
    ];

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        // Token'ın doğru olup olmadığını kontrol edin.
        event.preventDefault();
        if (!selectedType || !description) {
            setError('Tüm alanlar zorunludur!');
        } else {

            try {
                setError('');
                const formData = {
                    title: selectedType,
                    description: description
                };
                const response = await complaintForComment({ id:commentID, formData });

                console.log("ŞİKAYET İÇİN RESPONSE", response);
                alert('Yorum Şikayet başarıyla oluşturuldu.');
                setSikayetYorum(false);
            } catch (err) {
                console.error(err);
                setError('Şikayet oluşturulurken bir hata oluştu.');
            }
        }
    };

    return (
        <div className="w-[380px] mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Şikayet Formu</h2>
            <h4 className="text-sm font-semibold text-gray-800 mb-4 text-center">Yorumu Şikayet Ediyorsunuz</h4>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="complaintType" className="block text-gray-700 font-medium mb-2">Şikayet Türü</label>
                    <select
                        id="complaintType"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={selectedType}
                        onChange={handleChange}
                    >
                        <option value="">Seçiniz</option>
                        {complaintTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Açıklama</label>
                    <textarea
                        id="description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Şikayet hakkında açıklama"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Şikayeti Oluştur
                </button>
                <button onClick={() => setSikayetYorum(!sikayetYorum) }>
                    Kapat
                </button>
            </form>
        </div>
    );
}

export default ComplaintForm;
