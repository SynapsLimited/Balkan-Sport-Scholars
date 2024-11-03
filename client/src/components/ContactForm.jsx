// src/components/ContactForm.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './../css/contact.css'; // Assuming you have a corresponding CSS file for styling
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    country: '',
    email: '',
    phoneNumber: '',
    clubName: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      ...formData,
    };

    sendFormData(emailData);
  };

  const sendFormData = (data) => {
    const templateParams = {
      name: data.name,
      surname: data.surname,
      country: data.country,
      email: data.email,
      phoneNumber: data.phoneNumber,
      clubName: data.clubName,
      message: data.message
    };

    console.log('Sending email with template params:', templateParams);

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(t('contactForm.alerts.formSubmitted'));
      }, (err) => {
        console.error('FAILED...', err);
        alert(t('contactForm.alerts.formFailed'));
      });
  };

  return (
    <section className="container contact-form-section">
      <p className='center'>{t('contactForm.description')}</p>
      <form className="container contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder={t('contactForm.placeholders.name')}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder={t('contactForm.placeholders.surname')}
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="country"
            placeholder={t('contactForm.placeholders.country')}
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('contactForm.placeholders.email')}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phoneNumber"
            placeholder={t('contactForm.placeholders.phoneNumber')}
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="clubName"
            placeholder={t('contactForm.placeholders.clubName')}
            value={formData.clubName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder={t('contactForm.placeholders.message')}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary btn-submit-form">
          {t('contactForm.submitButton')}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
