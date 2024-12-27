import React, { useState } from 'react';
import { useCreateBlogMutation, useGetCategoryQuery } from '../../store/apis/blogApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // React Quill'in stilini import et

import { useNavigate } from 'react-router-dom';
import CustomCodeBlock from './CustomCodeBlock';



const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  //
  const navigate = useNavigate();
  //
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['blockquote'],
      ['code-block'],
      ['table']
    ]
  };
  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline',
    'strike', 'list', 'bullet', 'link', 'image', 'video',
    'color', 'background', 'code-block'
  ];

 

  //
  const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
  const [createBlog, { isLoading, error }] = useCreateBlogMutation();

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Resim önizleme
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('categories', JSON.stringify(selectedCategories));
    if (image) formData.append('image', image);

    try {
      const response = await createBlog(formData).unwrap();
      alert('Blog başarıyla oluşturuldu!');
      navigate("/user/")
      handleReset(); // Formu sıfırla
      console.log(response);
    } catch (err) {
      alert('Blog oluşturulamadı: ' + err.message);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setSelectedCategories([]);
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Yeni Blog Oluştur</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Başlık */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Başlık:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* İçerik */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">İçerik:</label>
            <ReactQuill
              className="h-[250px] overflow-auto"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
            />
          </div>
          <CustomCodeBlock value={content} />  {/* CustomCodeBlock componentini kullan */}

          {/* Kategoriler */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Kategori Seçin:</label>
            {categoriesLoading ? (
              <p>Kategoriler yükleniyor...</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {categories?.map((category) => (
                  <label key={category._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={category._id}
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                      className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Resim Yükleme */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Resim Yükle:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Resim Önizleme" className="w-full h-64 object-cover rounded-lg shadow-md" />
              </div>
            )}
          </div>

          {/* Butonlar */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Temizle
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              {isLoading ? 'Oluşturuluyor...' : 'Blog Oluştur'}
            </button>
          </div>
        </form>

        {error && <p className="mt-4 text-red-500">Hata: Blog oluşturulamadı.</p>}
      </div>
    </div>
  );
};

export default CreateBlog;
