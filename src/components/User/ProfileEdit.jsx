import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCategoryQuery } from '../../store/apis/blogApi';
import { useUpdateUserMutation } from '../../store/apis/userApi';

const ProfileEdit = () => {
    const { data, isLoading, error } = useGetCategoryQuery();
    const [updateUserProfile] = useUpdateUserMutation(); // updateUserProfile hook'u

    const { id } = useParams();
    const navigate = useNavigate();

    const [bio, setBio] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('categoryIds', JSON.stringify(selectedCategories)); // Dizi olarak gönderiyoruz
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
    
        try {
            const response = await updateUserProfile({ id, formData }).unwrap();
            console.log('Profil güncellendi:', response);
            navigate(`/profile/${id}`);
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };
    
    
    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error fetching categories</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold">Profilini Güncelle</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-lg font-medium">Biyografi</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="4"
                        className="w-full p-2 mt-2 border rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="categories" className="block text-lg font-medium">İlgilendiği Kategoriler</label>
                    {data && data.map(category => (
                        <div key={category._id} className="mb-2">
                            <input
                                type="checkbox"
                                id={category._id}
                                value={category._id}
                                checked={selectedCategories.includes(category._id)}
                                onChange={(e) => {
                                    const selected = e.target.checked
                                        ? [...selectedCategories, category._id]
                                        : selectedCategories.filter(id => id !== category._id);
                                    setSelectedCategories(selected);
                                }}
                            />
                            <label htmlFor={category._id} className="ml-2">{category.name}</label>
                        </div>
                    ))}
                </div>

                <div className="mb-4">
                    <label htmlFor="profilePicture" className="block text-lg font-medium">Profil Fotoğrafı</label>
                    <input
                        type="file"
                        id="profilePicture"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                        className="w-full p-2 mt-2 border rounded-lg"
                    />
                </div>

                <button type="submit" className="px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
                    Güncelle
                </button>
            </form>
        </div>
    );
};

export default ProfileEdit;
