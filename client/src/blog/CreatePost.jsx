// src/pages/CreatePost.jsx

import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CreatePost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [addTranslation, setAddTranslation] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const POST_CATEGORIES = [
    'Uncategorized',
    'Football',
    'Basketball',
    'Volleyball',
    'Rugby',
    'Tennis',
    'E-Sports',
    'Other',
  ];

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);

    if (addTranslation) {
      postData.set('title_en', titleEn);
      postData.set('description_en', descriptionEn);
    }

    if (thumbnail) {
      postData.set('thumbnail', thumbnail);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        navigate('/blog');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section data-aos="fade-up" className="create-post">
      <div className="container">
        <h2>{t('createPost')}</h2>
        {error && <p className="form-error-message">{t('formError')}: {error}</p>}
        <form className="form create-post-form" onSubmit={createPost}>
          <input
            type="text"
            placeholder={t('title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{t(cat)}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <div className="custom-file-input-container">
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="png, jpg, jpeg"
            />
          </div>

          <div className='custom-checkbox-container'>
            <label>
              <input
                type="checkbox"
                checked={addTranslation}
                onChange={() => setAddTranslation(!addTranslation)}
              />
              {t('addTranslation')}
            </label>
          </div>

          {addTranslation && (
            <>
              <input
                type="text"
                placeholder={t('titleInEnglish')}
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
              <ReactQuill
                modules={modules}
                formats={formats}
                value={descriptionEn}
                onChange={setDescriptionEn}
                placeholder={t('descriptionInEnglish')}
              />
            </>
          )}

          <button type="submit" className="btn btn-primary btn-submit">
            {t('create')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
