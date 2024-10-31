// src/components/PrivacyPolicy.jsx
import React from 'react';
import './../css/privacypolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container container">
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Balkan Sport Scholars! We respect your privacy and are committed to protecting the personal information you provide while using our website. This privacy policy explains how we collect, use, share, and protect your data.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We may collect various types of information from our users, including but not limited to:
        </p>
        <ul>
          <li>Personal information such as name, email, and phone number when you register or contact us.</li>
          <li>Technical information like IP addresses, browser types, and devices used to access our site.</li>
          <li>Information provided through contact forms, blog comments, or participation in interactive activities.</li>
        </ul>
      </section>

      <section>
        <h2>3. Use of Information</h2>
        <p>
          The information we collect is used for various purposes, including:
        </p>
        <ul>
          <li>Managing and improving our website.</li>
          <li>Providing personalized services and products.</li>
          <li>Communicating with users about important matters, including policy changes.</li>
          <li>Analyzing trends and user behavior for marketing purposes.</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of Information</h2>
        <p>
          We will not share your personal information with third parties except in the following cases:
        </p>
        <ul>
          <li>When necessary to comply with legal or regulatory requirements.</li>
          <li>With our trusted partners who assist us in business operations, including payment processing and IT services.</li>
          <li>In cases of transfer of ownership of our company.</li>
        </ul>
      </section>

      <section>
        <h2>5. Cookies and Similar Technologies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience on our website. Cookies are small files stored on your device to keep track of your preferences and actions while using our site.
        </p>
        <p>
          You have the option to manage or delete cookies through your browser settings, but please note that some parts of the site may not function properly without them.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We take necessary measures to protect your personal information from unauthorized access, use, or disclosure. These measures include advanced security technologies and strict administrative procedures.
        </p>
      </section>

      <section>
        <h2>7. User Rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion of your personal information that we have on record. To exercise these rights, please contact us using the contact information provided below.
        </p>
      </section>

      <section>
        <h2>8. Changes to the Privacy Policy</h2>
        <p>
          We reserve the right to update this privacy policy at any time. Any changes will be posted on this page and will take effect immediately upon posting. We encourage you to review this policy regularly to stay informed about how we are protecting your information.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this privacy policy, please contact us at:
        </p>
        <ul>
          <li><b>Email:</b> <a style={{color:"var(--color-primary)"}} href="mailto:contact@balkansportscholars.com">contact@balkansportscholars.com</a></li>
          <li><b>Address:</b> North Carolina, United States of America</li>
          <li><b>Phone:</b> +1 (252) 373-8698</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
